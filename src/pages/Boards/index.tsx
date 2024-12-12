import { BoardList } from "@/entities/Board"
import { useGetBoardsQuery } from "@/entities/Board/model/api"
import { useAuth } from "@/entities/User"


const Boards = () => {
    const { currentUser } = useAuth()
    const userId = currentUser?.id
    const { data: boards, isLoading: isBoardsLoading } = useGetBoardsQuery({ userId })

    return (
        <div className="text-black dark:text-white">
            {userId && <BoardList userId={userId} isBoardsLoading={isBoardsLoading} boards={boards} />}
        </div>
    )
}

export default Boards