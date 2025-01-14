export interface Task {
    _id: string;
    title: string;
    description: string;
    columnId: string;
    boardId: string;
    order: number;
    assignee: string;
    createdAt: string;
    updatedAt: string;
}