import { useDeleteTaskMutation } from "@/entities/Task/model/api";
import { Task } from "@/entities/Task/model/types"
import { Button } from "@/shared/ui/Button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { TaskActionsResponseError } from "../model/types";
import { ButtonLoader } from "@/shared/ui/ButtonLoader";

interface Props {
    data: Task;
    onClose: () => void;
}

export const Actions = ({ data, onClose }: Props) => {
    const [deleteTask, { isLoading: isDeleteLoading }] = useDeleteTaskMutation()

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

    return (
        <div>
            <div className="font-semibold text-black dark:text-slate-200 mb-2">Действия</div>
            <div className="flex flex-col gap-y-1">
                <Button
                    onClick={onDelete}
                    disabled={isDeleteLoading}
                    className="flex gap-x-1 bg-gray-400 hover:bg-red-400 p-1"
                >
                    <Trash />
                    {isDeleteLoading ? <ButtonLoader text="Удаление" /> : <>Удалить</>}
                </Button>
            </div>
        </div>
    )
}
