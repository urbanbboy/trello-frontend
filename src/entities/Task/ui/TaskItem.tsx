import { FC } from "react"

interface Props {
    title: string;
    createdAt: string;
}

export const TaskItem: FC<Props> = ({ title, createdAt }) => {
    return (
        <div className="bg-slate-100 p-2 rounded-md">
            {title}
            {createdAt}
        </div>
    )
}
