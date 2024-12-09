import { Mutex } from "async-mutex";
import { USER } from "../constants/User";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { userActions } from "@/entities/User";
import { UserRefreshResponse } from "@/entities/User/model/types";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: __RENDER_BASE_URL__,
    credentials: 'include',
    prepareHeaders(headers) {
        const token = localStorage.getItem(USER.ACCESS_TOKEN);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const rtkBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    { url: "/refresh", method: "POST" },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    const { accessToken, user } = refreshResult.data as UserRefreshResponse
                    localStorage.setItem(USER.ACCESS_TOKEN, accessToken)
                    api.dispatch(userActions.setUser(user));
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(userActions.logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
