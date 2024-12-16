import { Navigate, useLocation } from "react-router-dom";
import { RouteNames } from "./routeConfig";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useRefreshMutation } from "@/entities/User/model/api";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAuth, userActions } from "@/entities/User";
import { USER } from "@/shared/constants/User";
import { Loader } from "@/shared/ui/Loader";

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
    const [getUser, { isLoading }] = useRefreshMutation();
    const { currentUser } = useAuth();
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const [isTokenChecked, setIsTokenChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(USER.ACCESS_TOKEN);
        
        if (!currentUser && token) {
            getUser()
                .unwrap()
                .then((data) => {
                    if (data) {
                        const { user, accessToken } = data;
                        dispatch(userActions.setUser(user));
                        localStorage.setItem(USER.ACCESS_TOKEN, accessToken);
                    }
                })
                .catch(() => {
                    dispatch(userActions.logout())
                })
                .finally(() => {
                    setIsTokenChecked(true); 
                });
        } else {
            setIsTokenChecked(true)
        }
    }, []);

    if (isLoading || !isTokenChecked) {
        return <Loader />;
    }

    if (!currentUser) {
        return <Navigate to={RouteNames.LOGIN_PAGE} state={{ from: pathname }} />;
    }

    return <>{children}</>;
};
