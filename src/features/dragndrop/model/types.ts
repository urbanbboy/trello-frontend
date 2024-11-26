import { Column } from "@/entities/Column/model/types";

interface Error {
    message: string;
}

export interface CreateTaskError {
    message: string;
    errors: Error[];
}

export interface InitialState {
    columns?: Column[];
}