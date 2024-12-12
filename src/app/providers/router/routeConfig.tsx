import { Board } from "@/pages/Board/index.chunk";
import { Boards } from "@/pages/Boards/index.chunk";
import { Login } from "@/pages/Login/index.chunk";
import { NotFound } from "@/pages/NotFound/index.chunk";
import { Profile } from "@/pages/Profile/index.chunk";
import { Register } from "@/pages/Register/index.chunk";
import { Settings } from "@/pages/Settings/index.chunk";
import { ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";

export enum RouteNames {
    MAIN_PAGE = '/',
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
    element?: ReactNode;
    private?: boolean;
    layout: boolean | "sidebar" | "header";
    children?: Route[]
}

export const routeConfig: Route[] = [
    {
        path: RouteNames.MAIN_PAGE,
        element: <Navigate to={RouteNames.BOARDS_PAGE} />,
        private: true,
        layout: false,
    },
    {
        path: RouteNames.LOGIN_PAGE,
        element: <Login />,
        layout: "header"
    },
    {
        path: RouteNames.REGISTER_PAGE,
        element: <Register />,
        layout: "header"
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
    {
        path: RouteNames.PROFILE_PAGE,
        element: <Profile />,
        layout: true,
        private: true
    },
    {
        path: RouteNames.SETTINGS_PAGE,
        element: <Settings />,
        layout: true,
        private: true
    },
]