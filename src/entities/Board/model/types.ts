import { Column } from "@/entities/Column/model/types";
import { User } from "@/entities/User/model/types";
export interface Owner {
    id: string;
    username: string;
}
export interface Board {
    _id: string;
    name: string;
    owner: Owner;
    columns: Column[];
    members: User[]
}

export interface BoardCreateError {
    message: string;
}