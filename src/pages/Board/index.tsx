import { BoardHeader } from "@/widgets/BoardHeader"
import { useParams } from "react-router-dom"

export const Board = () => {
    const { id: boardId } = useParams<{id: string}>()

    console.log(boardId)
    return (
        <div
            className=""
        >
            <BoardHeader />
            <BoardLists />
        </div>
    )
}
