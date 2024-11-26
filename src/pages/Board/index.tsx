import { useParams } from "react-router-dom"
import { BoardHeader } from "@/widgets/BoardHeader"
import { useGetBoardByIdQuery } from "@/entities/Board/model/api"
import { useGetBoardColumnsByIdQuery } from "@/entities/Column/model/api"
import { BoardColumns } from "@/features/dragndrop"

export const Board = () => {
    const { id: boardId } = useParams<{ id: string }>()
    
    const { data: columns, isLoading } = useGetBoardColumnsByIdQuery({ boardId })
    const { data: board } = useGetBoardByIdQuery({ boardId })

    return (
        <div>
            {board && <BoardHeader isLoading={isLoading} board={board} />}
            {columns && board && <BoardColumns boardId={board?._id} columns={columns} />}
        </div>
    )
}
