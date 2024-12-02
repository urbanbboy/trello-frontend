import { FC } from "react"
import { Task } from "../model/types";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
    index: number;
    task: Task;
}

export const TaskItem: FC<Props> = ({ task, index }) => {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    role="button"
                    className="bg-slate-100 p-2 rounded-md truncate border-2 border-transparent hover:border-black"
                >
                    {task.title}
                </li>
            )}
        </Draggable>

    )
}
