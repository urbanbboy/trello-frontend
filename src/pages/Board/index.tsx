import { useParams } from "react-router-dom"
import { BoardHeader } from "@/widgets/BoardHeader"
import { useGetBoardByIdQuery } from "@/entities/Board/model/api"
import { BoardColumns } from "@/features/dragndrop"

const Board = () => {
    const { id: boardId } = useParams<{ id: string }>()

    const { data: board, isLoading } = useGetBoardByIdQuery({ boardId })

    return (
        <div>
            {board &&
                <>
                    <BoardHeader isLoading={isLoading} board={board} />
                    <BoardColumns board={board} isBoardLoading={isLoading} />
                </>
            }
        </div >
    )
}

export default Board