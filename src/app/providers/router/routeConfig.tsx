import { ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";
import { Activate } from "@/pages/Activate/index.chunk";
import { Board } from "@/pages/Board/index.chunk";
import { Boards } from "@/pages/Boards/index.chunk";
import { Login } from "@/pages/Login/index.chunk";
import { NotFound } from "@/pages/NotFound/index.chunk";
import { Profile } from "@/pages/Profile/index.chunk";
import { Register } from "@/pages/Register/index.chunk";
import { Settings } from "@/pages/Settings/index.chunk";

export enum RouteNames {
    MAIN_PAGE = '/',
    LOGIN_PAGE = '/login',
    REGISTER_PAGE = '/register',
    ACTIVATE_PAGE = '/activate',
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
    requiredActivation: boolean;
    children?: Route[]
}

export const routeConfig: Route[] = [
    {
        path: RouteNames.MAIN_PAGE,
        element: <Navigate to={RouteNames.BOARDS_PAGE} />,
        private: true,
        layout: false,
        requiredActivation: true
    },
    {
        path: RouteNames.LOGIN_PAGE,
        element: <Login />,
        layout: "header",
        requiredActivation: false
    },
    {
        path: RouteNames.REGISTER_PAGE,
        element: <Register />,
        layout: "header",
        requiredActivation: false
    },
    {
        path: RouteNames.BOARDS_PAGE,
        element: <Boards />,
        layout: true,
        private: true,
        requiredActivation: true
    },
    {
        path: RouteNames.BOARD_PAGE,
        element: <Board />,
        layout: 'header',
        private: true,
        requiredActivation: true
    },
    {
        path: RouteNames.NOT_FOUND_PAGE,
        element: <NotFound />,
        layout: false,
        requiredActivation: false
    },
    {
        path: RouteNames.PROFILE_PAGE,
        element: <Profile />,
        layout: true,
        private: true,
        requiredActivation: true
    },
    {
        path: RouteNames.SETTINGS_PAGE,
        element: <Settings />,
        layout: true,
        private: true,
        requiredActivation: true
    },
    {
        path: RouteNames.ACTIVATE_PAGE,
        element: <Activate />,
        layout: "header",
        private: false,
        requiredActivation: false
    },
]