import { useState } from "react";
import { useParams } from "react-router-dom"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/entities/Task/model/api";
import { Task } from "@/entities/Task/model/types"
import { Button } from "@/shared/ui/Button";
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select";
import { TaskActionsResponseError } from "../model/types";
import { useGetBoardMembersQuery } from "@/entities/Board/model/api";

interface Props {
    data: Task;
    onClose: () => void;
}

export const Actions = ({ data, onClose }: Props) => {
    const { id: boardId } = useParams<{ id: string }>()
    const [memberId, setMemberId] = useState<string>(data.assignee || "")
    const [deleteTask, { isLoading: isDeleteLoading }] = useDeleteTaskMutation()
    const { data: boardMembers } = useGetBoardMembersQuery({ boardId })
    const [updateTask] = useUpdateTaskMutation()

    const currentAssignee = boardMembers?.find((member) => member.id === memberId)

    const onDelete = async () => {
        await deleteTask(data._id)
            .unwrap()
            .then(() => {
                toast.success(`Задача удалена`)
                onClose()
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as TaskActionsResponseError;
                toast.error(data.message)
            })
    }

    const onChangeAssignee = async (value: string) => {
        setMemberId(value);
        await updateTask({
            data: {
                assignee: value
            },
            id: data._id
        })
            .unwrap()
            .then((data: Task) => {
                toast.success(`Задача ${data.title} обновлена`)
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as TaskActionsResponseError;
                toast.error(data.message)
            })
    }

    return (
        <div>
            <div className="font-semibold text-black dark:text-slate-200 mb-2">Действия</div>
            <div className="flex flex-row md:flex-col gap-1">
                <Button
                    onClick={onDelete}
                    disabled={isDeleteLoading}
                    variant={'destructive'}
                    className="w-full"
                >

                    {isDeleteLoading ? <ButtonLoader text="Удаление" /> : <span className="flex items-center gap-x-1"> <Trash /> Удалить</span>}
                </Button>
                <Select
                    // defaultValue={data}
                    value={memberId ? `${memberId}` : undefined}
                    onValueChange={onChangeAssignee}
                >
                    <SelectTrigger className="text-black dark:text-white">
                        <SelectValue placeholder="Назначить">
                            {currentAssignee?.username || "Назначить"}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {boardMembers?.length === 0 && <>Нет участников</>}
                        {boardMembers?.map((member) => (
                            <SelectItem key={member.email} value={member.id}>
                                {member.username}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
