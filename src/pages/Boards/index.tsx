import { getCurrentUserId, BoardList } from "@/entities/Board"
import { useGetBoardsQuery } from "@/entities/Board/model/api"
import { useSelector } from "react-redux"


export const Boards = () => {

    const userId = useSelector(getCurrentUserId)


    const { data: boards, isLoading: isBoardsLoading } = useGetBoardsQuery({ userId })

    



    return (
        <div className="text-black dark:text-white">
            {userId && <BoardList userId={userId} isBoardsLoading={isBoardsLoading} boards={boards} />}
        </div>
    )
}
