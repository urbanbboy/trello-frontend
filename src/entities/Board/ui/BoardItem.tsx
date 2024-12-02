import { FC, useState } from "react"
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";
import { useDeleteBoardMutation } from "../model/api";
import { Button } from "@/shared/ui/Button";
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { toast } from "sonner";


interface Props {
    name: string;
    boardId: string;
}

export const BoardItem: FC<Props> = ({ name, boardId }) => {
    const [deleteBoard, { isLoading }] = useDeleteBoardMutation()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsModalVisible(prev => !prev)
    }

    const handleDeleteBoard = async () => {
        await deleteBoard(boardId)
            .unwrap()
            .then(() => {
                toast.success("Доска удалена")
            })
            .catch(() => {
                toast.error("Не удалось удалить доску")
            })
    }

    return (
        <>
            <Popover open={isModalVisible} onOpenChange={setIsModalVisible}>
                <PopoverTrigger asChild>
                    <div
                        onContextMenu={handleRightClick}
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1732465286852-a0b95393a90d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNzMyNjgzNDMwfA&ixlib=rb-4.0.3&q=80&w=600)' }}
                        className="h-full w-full bg-cover hover:scale-105 bg-slate-700 bg-center text-white font-bold text-xl rounded-lg"
                    >
                        <Link className="w-full h-full flex items-center justify-center" to={`/boards/${boardId}`}>
                            {name}
                        </Link>
                    </div>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-40 bg-transparent dark:bg-transparent">
                    <Button className="bg-red-600 hover:bg-red-700" onClick={handleDeleteBoard}>
                        {isLoading ? <ButtonLoader text="Удалениe"/> : "Удалить"}
                    </Button>
                </PopoverContent>
            </Popover>


        </>

    )
}
