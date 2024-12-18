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
    imageId: string;
    imageThumbUrl: string;
    imageFullUrl: string;
    imageLinkHTML: string;
    imageUserName: string;
}

export interface BoardCreateError {
    message: string;
}

export interface UpdateBoardError {
    message: string;
}