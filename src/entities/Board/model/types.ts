import { User } from "@/entities/User/model/types";

export interface List {
    title: string;
    board: string;
    tasks: string[];
    position: number;
}
export interface Owner {
    id: string;
    username: string;
}
export interface Board {
    _id: string;
    name: string;
    owner: Owner;
    lists: List[]
    members: User[]
}

export interface BoardCreateError {
    message: string;
}