interface Error {
    message: string;
}

export interface User {
    id: string;
    email: string;
    username: string;
    image?: string;
}
export interface UserState {
    user: User | undefined;
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

export interface EditUserResponseError {
    message: string;
    errors?: Error[]
}

export interface RegisterResponseError {
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

export interface UserLogoutResponse {
    message: string
}

export type LoginResponse = LoginResponseSuccess | LoginResponseError