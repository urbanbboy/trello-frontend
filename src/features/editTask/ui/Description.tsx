import { useState, ElementRef, useRef } from "react";
import { AlignLeft } from "lucide-react";
import { Task } from "@/entities/Task/model/types"
import { useUpdateTaskMutation } from "@/entities/Task/model/api";
import { FormTextarea } from "./FormTextarea";
import { Button } from "@/shared/ui/Button";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TaskActionsResponseError } from "../model/types";
import { DialogDescription } from "@/shared/ui/Dialog";

interface Props {
    data: Task;
}

export const Description = ({ data }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [updateTask] = useUpdateTaskMutation()

    const formRef = useRef<ElementRef<'form'>>(null)
    const textAreaRef = useRef<ElementRef<'textarea'>>(null)
  
    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textAreaRef.current?.focus()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            disableEditing()
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const description = formData.get("description") as string;


        await updateTask({
            data: {
                description
            },
            id: data._id
        })
            .unwrap()
            .then((data: Task) => {
                toast.success(`Задача ${data.title} обновлен`)
                disableEditing()
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as TaskActionsResponseError;
                toast.error(data.message)
            })
    }

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft strokeWidth={2.75} className="text-black dark:text-white" />
            <div className="w-full">
                <p className="font-semibold text-black dark:text-slate-200 mb-2">
                    Описание
                </p>
                {isEditing ? (
                    <form
                        onSubmit={onSubmit}
                        ref={formRef}
                        className="space-2"
                    >
                        <FormTextarea
                            id={'description'}
                            className="w-full mt-2 py-3 px-3.5 bg-slate-100 dark:bg-slate-600"
                            placeholder="Добавьте описание"
                            defaultValue={data.description || undefined}
                            ref={textAreaRef}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                type="submit"
                                className="max-w-24"
                            >
                                Сохранить
                            </Button>
                            <Button
                                type="button"
                                onClick={disableEditing}
                                className="max-w-24 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700 text-black dark:text-slate-200 font-semibold"
                            >
                                Отменить
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        onClick={enableEditing}
                        onKeyDown={onKeyDown}
                        role="button"
                        className="min-h-[78px] text-sm font-medium py-3 px-3.5 rounded-md bg-slate-100 dark:bg-slate-600"
                    >
                        <DialogDescription className="text-slate-700 dark:text-slate-100">
                            {data.description || "Добавтье описание..."}
                        </DialogDescription>
                    </div>
                )}
            </div>
        </div>
    )
}
