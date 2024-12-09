import { FC, useState } from "react"
import { Board, BoardCreateError } from "../model/types"
import { BoardItem } from "./BoardItem"
import { Skeleton } from "@/shared/ui/Skeleton";
import { Button } from "@/shared/ui/Button";
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/shared/ui/Dialog";
import { Input } from "@/shared/ui/Input";
import { Plus } from "lucide-react";
import { useTheme } from "@/app/providers/theme";
import { CreateBoardSchema } from "@/features/createBoard/model/schema/Schema";
import * as Yup from 'yup'
import { useForm } from "react-hook-form";
import { useCreateBoardMutation } from "../model/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Props {
    userId: string;
    boards?: Board[];
    isBoardsLoading: boolean;
}

const getSkeletons = () => {
    return Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="aspect-square" />
    ));
};

export const BoardList: FC<Props> = ({ boards, isBoardsLoading, userId }) => {
    const [create, { isLoading }] = useCreateBoardMutation()
    const [open, setOpen] = useState(false)
    const { theme } = useTheme()

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


    if (!isBoardsLoading && !boards?.length) {
        return (
            <div className="flex items-center justify-center h-[82dvh] text-black dark:text-slate-400">
                Созданные доски будут отображаться здесь
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:justify-center max-w-screen-lg">
                {boards?.map(board => (
                    <div
                        key={board._id}
                        className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                        <BoardItem
                            name={board.name}
                            boardId={board._id}
                        />
                    </div>
                ))}
                {isBoardsLoading && getSkeletons()}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 w-full aspect-square"
                        >
                            <Plus size={40} />
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
            </div>
        </>


    )
}
