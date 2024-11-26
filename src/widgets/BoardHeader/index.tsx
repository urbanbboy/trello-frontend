import { RouteNames } from "@/app/providers/router/routeConfig"
import { Board } from "@/entities/Board"
import { useDeleteBoardMutation, useUpdateBoardMutation } from "@/entities/Board/model/api"
import { Button } from "@/shared/ui/Button"
import { Input } from "@/shared/ui/Input"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover"
import { Skeleton } from "@/shared/ui/Skeleton"
import { ArrowLeft, Images, Settings } from "lucide-react"
import { FC, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

interface Props {
    board?: Board;
    isLoading: boolean;
}

export const BoardHeader: FC<Props> = ({ board, isLoading }) => {
    const [updateBoard] = useUpdateBoardMutation()
    const [deleteBoard] = useDeleteBoardMutation()
    const navigate = useNavigate()

    const [boardTitle, setBoardTitle] = useState(board?.name)


    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardTitle(e.target.value)
    }

    const handleUpdateBoard = async () => {
        await updateBoard({
            boardId: board?._id,
            data: {
                name: boardTitle
            }
        })
            .unwrap()
            .then(() => {
                toast.success("Доска обновлена")
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
                <div className="flex gap-3">
                    <Button className="w-22">
                        Пригласить
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button>
                                <Settings className="text-slate-700 dark:text-neutral-100" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent
                            autoFocus={false}
                            align="center"
                            side="bottom"
                            className="flex flex-col gap-2"
                        >
                            <Input
                                value={boardTitle}
                                onChange={handleChangeTitle}
                                placeholder="Название доски"
                            />
                            <Button onClick={handleUpdateBoard}>Изменить</Button>
                            <Button onClick={handleDeleteBoard} className="bg-red-600">Удалить</Button>
                        </PopoverContent>
                    </Popover>

                    <button>
                        <Images className="text-slate-700 dark:text-neutral-100" />
                    </button>
                </div>
            </div>

        </div>
    )
}
