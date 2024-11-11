interface Error {
    message: string;
}

export interface CreateTaskError {
    message: string;
    errors: Error[];
}