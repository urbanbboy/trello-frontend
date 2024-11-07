import { Board } from "@/entities/Board";

interface Error {
    message: string;
}

export interface User {
    id: string;
    email: string;
    isActivated: boolean;
    username: string;
    boards: Board[]
}

export interface UserState {
    user: User;
    token?: string | undefined;
    isLoaded: boolean;
}

export interface LoginResponseSuccess {
    accessToken: string;
    // refreshToken: string;
    user: User;
}

export interface LoginResponseError {
    message: string;
    errors?: Error[]
}

export interface RegisterResponse {
    accessToken: string;
    // refreshToken: string;
    user: User;
}

export interface UserRefreshResponse {
    user: User;
    accessToken: string;
    // refreshToken: string;
}

export type LoginResponse = LoginResponseSuccess | LoginResponseError