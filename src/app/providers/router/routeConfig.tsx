import { Boards } from "@/pages/Boards";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { ReactNode } from "react";

export enum RouteNames {
    LOGIN_PAGE = '/login',
    REGISTER_PAGE = '/register',
    BOARDS_PAGE = '/boards',
    BOARD_PAGE = '/boards/:id',
    SETTINGS_PAGE = '/settings',
    PROFILE_PAGE = '/profile',
}

export interface Route {
    path: string;
    element: ReactNode;
    layout: boolean | "sidebar" | "header";
}

export const routeConfig: Route[] = [
    {
        path: RouteNames.LOGIN_PAGE,
        element: <Login />,
        layout: false
    },
    {
        path: RouteNames.REGISTER_PAGE,
        element: <Register />,
        layout: false
    },
    {
        path: RouteNames.BOARDS_PAGE,
        element: <Boards />,
        layout: true
    },
]