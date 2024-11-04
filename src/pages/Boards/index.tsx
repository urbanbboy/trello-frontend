import { BoardItem } from "@/entities/Board"
import { CreateBoardForm } from "@/features/createBoard"
import { Button } from "@/shared/ui/Button"
import { Dialog, DialogPortal, DialogTrigger } from "@/shared/ui/Dialog"
import { Plus } from "lucide-react"

export const Boards = () => {

    return (
        <div className="text-black dark:text-white">
            <Dialog>
                <DialogTrigger>
                    <Button
                        className="flex items-center w-50"
                    >
                        <Plus />
                        Create board
                    </Button>
                </DialogTrigger>
                <DialogPortal>
                    <CreateBoardForm />
                </DialogPortal>
            </Dialog>
            <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:justify-center max-w-screen-lg">
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
                <div className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                    <BoardItem />
                </div>
            </div>
        </div>
    )
}
