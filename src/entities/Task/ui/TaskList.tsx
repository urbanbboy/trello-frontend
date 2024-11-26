import { FC } from "react"
import { Task } from "../model/types"
import { TaskItem } from "./TaskItem";
import { Droppable } from "@hello-pangea/dnd";

interface Props {
    tasks: Task[];
}

export const TaskList: FC<Props> = ({ tasks }) => {
    return (
        <div className="flex flex-col gap-2 my-2">
            {/* <Droppable>

            </Droppable> */}
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    title={task.title}
                    createdAt={task.createAt}
                />
            ))}
        </div>
    )
}
