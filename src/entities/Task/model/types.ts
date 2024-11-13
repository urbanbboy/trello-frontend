import { User } from "@/entities/User/model/types";

export interface Task {
    _id: string;
    title: string;
    desciption: string;
    column: string;
    position: number;
    assignees: User[];
    createAt: string;
    updatedAt: string;
}