import { UserLogoutResponse, UserRefreshResponse } from '@/entities/User/model/types';
import { LoginSchema, RegisterSchema } from '@/entities/User';
import { LoginResponseSuccess, RegisterResponse } from './types';
import { baseApi } from "@/shared/api/baseApi";
import * as Yup from 'yup'


export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponseSuccess, Yup.InferType<typeof LoginSchema>>({
            query: (data) => ({
                url: '/login',
                method: "POST",
                body: data
            })
        }),
        register: builder.mutation<RegisterResponse, Yup.InferType<typeof RegisterSchema>>({
            query: (data) => ({
                url: '/register',
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation<UserLogoutResponse, void>({
            query: () => ({
                url: '/logout',
                method: "POST",
            }),
            invalidatesTags: ["user"]
        }),
        refresh: builder.mutation<UserRefreshResponse, void>({
            query: () => ({
                url: "/refresh",
                method: "POST"
            })
        }),
        edit: builder.mutation({
            query: (data) => ({
                url: '/user',
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["user"]
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useLogoutMutation,
    useEditMutation,
} = userApi