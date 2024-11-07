import { FC } from "react"
import { Link } from "react-router-dom";

interface Props {
    name: string;
    boardId: string;
}

export const BoardItem: FC<Props> = ({ name, boardId }) => {

    return (
        <div
            style={{backgroundImage: 'url(/board_main_bg.jpg)'}}
            className="h-full w-full bg-cover hover:scale-105 bg-slate-700 bg-center text-white font-bold text-xl rounded-lg"
        >
            <Link className="w-full h-full flex items-center justify-center" to={boardId}>
                {name}
            </Link>
        </div>
    )
}
