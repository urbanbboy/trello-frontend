import { useTheme } from "@/app/providers/theme"
import { BoardList, getCurrentUserId } from "@/entities/Board"
import { useCreateBoardMutation, useGetBoardsQuery } from "@/entities/Board/model/api"
import { BoardCreateError } from "@/entities/Board/model/types"
import { CreateBoardSchema } from "@/features/createBoard/model/schema/Schema"
// import { CreateBoardForm } from "@/features/createBoard"
import { Button } from "@/shared/ui/Button"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/Dialog"
import { Input } from "@/shared/ui/Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import * as Yup from 'yup'

export const Boards = () => {
    const [open, setOpen] = useState(false)
    const { theme } = useTheme()
    const userId = useSelector(getCurrentUserId)

    const [create, { isLoading }] = useCreateBoardMutation()
    const { data: boards, isLoading: isBoardsLoading } = useGetBoardsQuery({ userId })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Yup.InferType<typeof CreateBoardSchema>>({
        resolver: yupResolver(CreateBoardSchema)
    })

    const createBoard = async (data: Yup.InferType<typeof CreateBoardSchema>) => {
        console.log(data)
        await create({
            ...data,
            owner: userId
        }).unwrap()
            .then(() => {
                setOpen(false)
                toast.success("Новая доска создана")
                reset()
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as BoardCreateError
                toast.error(data.message)
            })
    }

    return (
        <div className="text-black dark:text-white">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="flex items-center w-50"
                    >
                        <Plus />
                        Создать
                    </Button>
                </DialogTrigger>
                <DialogContent theme={theme} className="bg-white dark:bg-slate-700">
                    <DialogHeader>
                        <DialogTitle className="text-black dark:text-white">
                            Создать доску
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(createBoard)}>
                        <Input
                            {...register("name")}
                            type="text"
                            placeholder="Название доски"
                        />
                        <div className="text-red-600">{errors.name?.message}</div>
                        <DialogFooter>
                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="w-50"
                            >
                                {isLoading ? <ButtonLoader text={'Создание'} /> : <>Создать</>}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <BoardList isLoading={isBoardsLoading} boards={boards} />
        </div>
    )
}
