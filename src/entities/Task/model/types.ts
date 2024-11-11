import { User } from "@/entities/User/model/types";

export interface Task {
    title: string;
    desciption: string;
    column: string;
    position: number;
    completed: boolean;
    assignees: User[];
    dueDate: Date
}