import { User } from "@/entities/User/model/types";

export interface Task {
    _id: string;
    title: string;
    desciption: string;
    columnId: string;
    boardId: string;
    order: number;
    assignees: User[];
    createAt: string;
    updatedAt: string;
}