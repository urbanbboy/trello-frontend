import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { ReactNode } from "react";

export enum RouteNames {
    LOGIN_PAGE = '/login',
    REGISTER_PAGE = '/register',
}

export interface Route {
    path: string;
    element: ReactNode;
}

export const routeConfig: Route[] = [
    {
        path: RouteNames.LOGIN_PAGE,
        element: <Login />
    },
    {
        path: RouteNames.REGISTER_PAGE,
        element: <Register />
    },
]