import { useDeleteTaskMutation } from "@/entities/Task/model/api";
import { Task } from "@/entities/Task/model/types"
import { Button } from "@/shared/ui/Button";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { TaskActionsResponseError } from "../model/types";
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useState } from "react";

interface Props {
    data: Task;
    onClose: () => void;
}

export const Actions = ({ data, onClose }: Props) => {
    const [deleteTask, { isLoading: isDeleteLoading }] = useDeleteTaskMutation()
    const [value, setValue] = useState<string>('')

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
                    className="w-full"
                >

                    {isDeleteLoading ? <ButtonLoader text="Удаление" /> : <span className="flex items-center gap-x-1"> <Trash /> Удалить</span>}
                </Button>
                <Select
                    value={value ? `${value}` : undefined}
                    onValueChange={(value) => {
                        setValue(value);
                    }}
                >
                    <SelectTrigger className="">
                        <SelectValue placeholder="Назначить" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"1"}>
                            user1
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
