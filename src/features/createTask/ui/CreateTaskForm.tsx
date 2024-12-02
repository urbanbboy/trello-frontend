import { Input } from "@/shared/ui/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import { CreateTaskSchema } from "../model/schema"
import { X } from "lucide-react"
import { Button } from "@/shared/ui/Button"
import { FC } from "react"
import { ErrorMessage } from "@/shared/ui/ErrorMessage"
import { useCreateTaskMutation } from "@/entities/Task/model/api"
import { toast } from "sonner"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { CreateTaskError } from "../model/types"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"
import { useGetSequence } from "@/shared/hooks/useGeSequence"
import { Task } from "@/entities/Task/model/types"

interface Props {
    columnId: string;
    onCloseTaskForm: () => void
    tasks: Task[];
    boardId: string;
}

export const CreateTaskForm: FC<Props> = ({ onCloseTaskForm, columnId, tasks, boardId }) => {
    const [createTask, { isLoading }] = useCreateTaskMutation()
    const taskOrder = useGetSequence(tasks)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Yup.InferType<typeof CreateTaskSchema>>({
        resolver: yupResolver(CreateTaskSchema)
    })


    const onSubmit = async (data: Yup.InferType<typeof CreateTaskSchema>) => {
        await createTask({
            ...data,
            columnId: columnId,
            order: taskOrder,
            boardId
        })
            .unwrap()
            .then(() => {
                toast.success("Задача создана")
                onCloseTaskForm()
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as CreateTaskError
                toast.error(data.message)
            })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 my-2">
            <div className="flex items-center gap-1">
                <Input
                    autoFocus
                    {...register('title')}
                    placeholder="Введите название"
                />
                <Button onClick={onCloseTaskForm} type="button" className="flex-1 bg-transparent hover:bg-slate-500 border-slate-300 rounded-md">
                    <X className="text-slate-300" />
                </Button>
            </div>
            <ErrorMessage message={errors.title?.message} />
            <Button type="submit">
                {isLoading ? <ButtonLoader text="Добавление" /> : <>Добавить</>}
            </Button>
        </form>
    )
}