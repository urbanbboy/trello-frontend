import { ElementRef, FC, useRef, useState } from "react"
import { SquareKanban } from "lucide-react"
import { DialogTitle } from "@/shared/ui/Dialog"
import { Input } from "@/shared/ui/Input"
import { Task } from "../../../entities/Task/model/types"
import { useUpdateTaskMutation } from "../../../entities/Task/model/api"
import { toast } from "sonner"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { TaskActionsResponseError } from "../model/types"

interface Props {
    data: Task;
}

export const Header: FC<Props> = ({ data }) => {
    const [updateTask] = useUpdateTaskMutation()

    const [title, setTitle] = useState(data.title)

    const inputRef = useRef<ElementRef<"input">>(null)

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit();
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;

        if (title === data.title) {
            return;
        }

        await updateTask({
            data: {
                title: title
            },
            id: data._id
        })
            .unwrap()
            .then((data) => {
                toast.success(`Изменен на ${data.title}`)
                setTitle(data.title)
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as TaskActionsResponseError;
                toast.error(data.message)
            })
    };

    return (
        <DialogTitle>
            <form onSubmit={onSubmit} className="text-black flex gap-0.5 items-center dark:text-white">
                <SquareKanban className="text-black dark:text-white" />
                <Input
                    name="title"
                    ref={inputRef}
                    onBlur={onBlur}
                    defaultValue={title}
                    className="w-[85%] border-transparent bg-transparent truncate dark:bg-transparent" />
            </form>
        </DialogTitle>
    )
}