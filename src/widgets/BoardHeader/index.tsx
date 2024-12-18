import { RouteNames } from "@/app/providers/router/routeConfig"
import { Board } from "@/entities/Board"
import { useDeleteBoardMutation, useUpdateBoardMutation } from "@/entities/Board/model/api"
import { UpdateBoardError } from "@/entities/Board/model/types"
import { FormPicker } from "@/features/createBoard/ui/FormPicker"
import { Button } from "@/shared/ui/Button"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/Dialog"
import { Input } from "@/shared/ui/Input"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import { Skeleton } from "@/shared/ui/Skeleton"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { ArrowLeft, Images, Pencil, Settings, Trash } from "lucide-react"
import { FC, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

interface Props {
    board: Board;
    isLoading: boolean;
}

export const BoardHeader: FC<Props> = ({ board, isLoading }) => {
    const [updateBoard, { isLoading: isUpdateLoading }] = useUpdateBoardMutation()
    const [deleteBoard, { isLoading: isDeleteLoading }] = useDeleteBoardMutation()
    const navigate = useNavigate()

    const [boardTitle, setBoardTitle] = useState(board?.name)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardTitle(e.target.value)
    }

    const handleUpdateBoard = async () => {
        await updateBoard({
            boardId: board._id,
            name: boardTitle
        })
            .unwrap()
            .then(() => {
                toast.success("Доска обновлена")
                setIsPopoverOpen(false)
            })
            .catch(() => {
                toast.error("Не удалось обновить")
            })
    }

    const handleDeleteBoard = async () => {
        await deleteBoard(board?._id)
            .unwrap()
            .then(() => {
                toast.success("Доска удалена")
                navigate(RouteNames.BOARDS_PAGE)
            })
            .catch(() => {
                toast.error("Не удалось удалить доску")
            })
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const image = formData.get("image") as string;
        await updateBoard({
            name: boardTitle,
            image,
            boardId: board._id
        }).unwrap()
            .then(() => {
                setIsDialogOpen(false)
                toast.success("Доска обновлена")
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as UpdateBoardError
                toast.error(data.message)
            })
    }

    return (
        <div className="py-2 px-4 bg-neutral-100 dark:bg-slate-900">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Link to={RouteNames.BOARDS_PAGE}>
                        <ArrowLeft className="text-slate-700 dark:text-neutral-100" />
                    </Link>
                </div>
                <div className="ml-20 text-slate-900 dark:text-white font-semibold text-lg">
                    {isLoading ? <Skeleton className="w-24 h-5" /> : <>{board?.name}</>}
                </div>
                <div className="flex gap-1">
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant={'transparent'} size={'inline'}>
                                <Settings className="text-slate-700 dark:text-neutral-100" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="center"
                            side="bottom"
                            className="flex flex-col gap-2"
                        >
                            <Input
                                value={boardTitle}
                                onChange={handleChangeTitle}
                                placeholder="Название доски"
                            />
                            <Button onClick={handleUpdateBoard} className="bg-slate-500 hover:bg-slate-600">
                                {isUpdateLoading ? <ButtonLoader text={'Изменение'} /> : <span className="flex gap-x-1 items-center"><Pencil/> Изменить</span>}
                            </Button>
                            <Button onClick={handleDeleteBoard} className="bg-red-600">
                                {isDeleteLoading ? <ButtonLoader text={'Удаление'} /> : <span className="flex gap-x-1 items-center"><Trash/> Удалить</span>}
                            </Button>
                        </PopoverContent>
                    </Popover>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger>
                            <Button variant={'transparent'} size={'inline'}>
                                <Images className="text-slate-700 dark:text-neutral-100" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-black dark:text-white">
                                    Фоновое изображение
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={onSubmit}>
                                <FormPicker id={'image'} />
                                <DialogFooter>
                                    <Button
                                        disabled={isLoading}
                                        type="submit"
                                        className="w-50"
                                        variant={'primary'}
                                    >
                                        {isUpdateLoading ? <ButtonLoader text={'Изменение'} /> : <>Изменить</>}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

        </div>
    )
}
