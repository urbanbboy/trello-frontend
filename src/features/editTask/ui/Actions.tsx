import { useDeleteTaskMutation } from "@/entities/Task/model/api";
import { Task } from "@/entities/Task/model/types"
import { Button } from "@/shared/ui/Button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Copy, Trash } from "lucide-react";
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
            <div className="flex flex-row md:flex-col gap-1">
                <Button
                    onClick={onDelete}
                    disabled={isDeleteLoading}
                    variant={'destructive'}
                    className="max-w-28"
                >
                    
                    {isDeleteLoading ? <ButtonLoader text="Удаление" /> : <span className="flex items-center gap-x-1"> <Trash /> Удалить</span>}
                </Button>
                <Button
                    // disabled={isDeleteLoading}
                    variant={'gray'}
                    className="max-w-40"
                >
                    
                    {isDeleteLoading ? <ButtonLoader text="Копирование" /> : <span className="flex items-center gap-x-1"> <Copy /> Скопировать</span>}
                </Button>
            </div>
        </div>
    )
}
