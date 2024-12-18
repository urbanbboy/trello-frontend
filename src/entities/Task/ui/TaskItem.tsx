import { FC, useState } from "react"
import { Task } from "../model/types";
import { Draggable } from "@hello-pangea/dnd";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/Dialog";
import { useTheme } from "@/app/providers/theme";
import { Actions, Description, Header } from "@/features/editTask";

interface Props {
    index: number;
    task: Task;
}

export const TaskItem: FC<Props> = ({ task, index }) => {
    const { theme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const dialogClose = () => {
        setIsOpen(false)
    }


    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger>
                        <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            role="button"
                            className="flex justify-between items-center bg-slate-100 p-2 rounded-md  border-2 border-transparent hover:border-black overflow-auto"
                        >
                            <span className="truncate">
                                {task.title}
                            </span>
                        </li>
                    </DialogTrigger>
                    <DialogContent theme={theme} className="bg-white dark:bg-slate-800">
                        {task &&
                            <>
                                <Header data={task} />
                                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                                    <div className="col-span-3">
                                        <div className="w-full space-y-6">
                                            <Description data={task} />
                                        </div>
                                    </div>
                                    <Actions onClose={dialogClose} data={task} />
                                </div>
                            </>
                        }
                    </DialogContent>
                </Dialog>
            )}
        </Draggable>

    )
}
