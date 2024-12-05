interface Error {
    message: string;
}

export interface TaskActionsResponseError {
    message: string;
    errors?: Error[]
}

