interface Error {
    message: string;
}

export interface InviteUserResponseError {
    message: string;
    errors?: Error[];
}

export interface InviteUserResponseSuccess {
    message: string;
}