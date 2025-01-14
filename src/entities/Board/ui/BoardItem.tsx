import { FC, useState } from "react"
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";
import { useDeleteBoardMutation } from "../model/api";
import { Button } from "@/shared/ui/Button";
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { toast } from "sonner";
import { Board } from "../model/types";


interface Props {
    board: Board;
}

export const BoardItem: FC<Props> = ({ board }) => {
    const [deleteBoard, { isLoading }] = useDeleteBoardMutation()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsModalVisible(prev => !prev)
    }

    const handleDeleteBoard = async () => {
        await deleteBoard(board._id)
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
                        className="relative h-full w-full text-white font-bold text-xl rounded-lg overflow-hidden group"
                    >
                        <div
                            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 scale-100 group-hover:scale-125"
                        />
                        <Link
                            to={`/boards/${board._id}`}
                            className="relative z-10 flex items-center justify-center h-full w-full bg-slate-700/40"
                        >
                            {board.name}
                        </Link>
                    </div>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-40 bg-transparent dark:bg-transparent">
                    <Button className="bg-red-600 hover:bg-red-700" onClick={handleDeleteBoard}>
                        {isLoading ? <ButtonLoader text="Удалениe" /> : "Удалить"}
                    </Button>
                </PopoverContent>
            </Popover>


        </>

    )
}
