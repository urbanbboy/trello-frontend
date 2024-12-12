import { FC } from "react"
import { Board } from "../model/types"
import { BoardItem } from "./BoardItem"
import { Skeleton } from "@/shared/ui/Skeleton";
import { Button } from "@/shared/ui/Button";
import { Plus } from "lucide-react";
import { FormDialog } from "@/features/createBoard";


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

    return (
        <>
            <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:justify-center max-w-screen-lg">
                {boards?.map(board => (
                    <div
                        key={board._id}
                        className="w-full aspect-square flex items-center justify-center bg-cover bg-center rounded-lg">
                        <BoardItem board={board}/>
                    </div>
                ))}
                {isBoardsLoading && getSkeletons()}
                <FormDialog userId={userId}>
                    <Button
                        variant={'gray'}
                        className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 w-full h-full aspect-square"
                    >
                        <Plus size={25} />
                        Добавить
                    </Button>
                </FormDialog>
            </div>
        </>


    )
}
