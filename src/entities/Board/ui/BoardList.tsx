import { FC } from "react"
import { Board } from "../model/types"
import { BoardItem } from "./BoardItem"
import { Skeleton } from "@/shared/ui/Skeleton";

interface Props {
    boards?: Board[];
    isLoading: boolean;
}

const getSkeletons = () => {
    return Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="aspect-square" />
    ));
};

export const BoardList: FC<Props> = ({ boards, isLoading }) => {

    if (!isLoading && !boards?.length) {
        return (
            <div className="flex justify-center items-center mt-60 text-black dark:text-slate-400">
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
                {isLoading && getSkeletons()}
            </div>
        </>


    )
}
