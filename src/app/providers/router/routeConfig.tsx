import { Board } from "@/pages/Board";
import { Boards } from "@/pages/Boards";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import { Register } from "@/pages/Register";
import { ReactNode } from "react";

export enum RouteNames {
    LOGIN_PAGE = '/login',
    REGISTER_PAGE = '/register',
    BOARDS_PAGE = '/boards',
    BOARD_PAGE = '/boards/:id',
    SETTINGS_PAGE = '/settings',
    PROFILE_PAGE = '/profile',
    NOT_FOUND_PAGE = '*',
}

export interface Route {
    path: string;
    element: ReactNode;
    private?: boolean;
    layout: boolean | "sidebar" | "header";
    children?: Route[]
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
        layout: true,
        private: true
    },
    {
        path: RouteNames.BOARD_PAGE,
        element: <Board />,
        layout: 'header',
        private: true
    },
    {
        path: RouteNames.NOT_FOUND_PAGE,
        element: <NotFound />,
        layout: false
    },
]