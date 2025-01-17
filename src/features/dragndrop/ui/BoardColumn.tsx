import { useDeleteColumnMutation, useUpdateColumnMutation } from "@/entities/Column/model/api";
import { Column } from "@/entities/Column/model/types";
import { TaskItem } from "@/entities/Task";
import { Task } from "@/entities/Task/model/types";
import { CreateTaskForm } from "@/features/createTask";
import { Button } from "@/shared/ui/Button";
import { ButtonLoader } from "@/shared/ui/ButtonLoader";
import { Input } from "@/shared/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { Draggable, DraggableProvidedDragHandleProps, Droppable } from "@hello-pangea/dnd";
import { Ellipsis, Grip, Pencil, Plus, Trash2, X } from "lucide-react";
import { ChangeEvent, ClassAttributes, FC, HTMLAttributes, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { toast } from "sonner";


interface Props {
    column: Column;
    tasks: Task[];
    index: number;
}

export const BoardColumn: FC<Props> = ({ column, index, tasks }) => {
    const { id: boardId } = useParams<{ id: string }>()
    const [deleteColumn, { isLoading }] = useDeleteColumnMutation()
    const [updateColumn] = useUpdateColumnMutation()
    const [editColumn, setEditColumn] = useState(false)
    const [visibleTaskForm, setVisibleTaskForm] = useState(false)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [columnName, setColumnName] = useState(column.title)
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChangeColumn = (e: ChangeEvent<HTMLInputElement>) => {
        setColumnName(e.target.value)
    }

    const onChangeEdit = () => {
        setEditColumn(!editColumn)
        setIsPopoverOpen(false)
        // inputRef.current?.focus()
    }


    const onCancelEdit = () => {
        setEditColumn(false)
        setColumnName(column.title)
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {


        if (e.key === "Enter") {

            await updateColumn({
                columnId: column._id,
                data: { title: columnName }
            })
                .unwrap()
                .then(() => {
                    toast.success("Колонка обновлена")
                    setEditColumn(false)
                    inputRef.current?.blur()
                })
                .catch(() => {
                    toast.error("Не удалось обновить колонку")
                })

        }
    }


    const handleColumnDelete = async () => {
        await deleteColumn(column._id)
            .unwrap()
            .then(() => {
                toast.success("Колонка удалена")
            })
            .catch(() => {
                toast.error("Не удалось удалить")
            })
    }

    const onClickOpenTaskForm = () => {
        setVisibleTaskForm(!visibleTaskForm)
    }

    const onCloseTaskForm = () => {
        setVisibleTaskForm(false)
    }

    const loadColumnTitle = (draggableProps: DraggableProvidedDragHandleProps | (JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) | null) => {
        return (
            <div {...draggableProps} className="flex items-center gap-2">
                <Tooltip>
                    <TooltipTrigger>
                        <Grip className="text-slate-950 dark:text-slate-300" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Зажмите мышью и перетащите в другое место</span>
                    </TooltipContent>
                </Tooltip>
                <Input
                    ref={inputRef}
                    className="p-0 border-none font-semibold text-slate-950 dark:text-white bg-white dark:bg-slate-700"
                    type="text"
                    onChange={handleChangeColumn}
                    onKeyDown={handleKeyDown}
                    value={columnName}
                    readOnly={!editColumn}
                />
                {editColumn && <Button onClick={onCancelEdit} type="button" variant={'ghost'}>
                    <X className="text-slate-600 dark:text-white/70" />
                </Button>}
            </div>
        )
    }

    return (
        <Draggable draggableId={column._id} index={index} key={column._id}>
            {(provided) => (
                <li
                    key={index}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="h-screen-minus-130 w-72 overflow-y-auto"
                >
                    <div className="p-3 rounded-md bg-white dark:bg-slate-700">
                        <div className="flex justify-between">
                            {loadColumnTitle(provided.dragHandleProps)}
                            <div>
                                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <button>
                                            <Ellipsis className="text-slate-700 dark:text-slate-300" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="start"
                                        side="bottom"
                                        className="flex flex-col gap-2"
                                    >
                                        <Button
                                            onClick={onChangeEdit}
                                            className="flex justify-center gap-1"
                                            variant={'secondary'}
                                        >
                                            <Pencil /> Изменить
                                        </Button>
                                        <Button
                                            onClick={handleColumnDelete}
                                            className="flex justify-center gap-1"
                                            variant={'destructive'}
                                        >
                                            {isLoading ? <ButtonLoader text="Удаление" /> : <><Trash2 /> Удалить</>}
                                        </Button>
                                    </PopoverContent>

                                </Popover>
                            </div>
                        </div>
                        <Droppable droppableId={column._id} type="task">
                            {(provided) => (
                                <ol
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="flex flex-col gap-2 my-2"
                                >
                                    {tasks.map((task, index) => (
                                        <TaskItem
                                            index={index}
                                            task={task}
                                            key={task._id}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        {visibleTaskForm &&
                            <CreateTaskForm
                                tasks={tasks || []}
                                columnId={column._id}
                                boardId={boardId || ''}
                                onCloseTaskForm={onCloseTaskForm}
                            />
                        }
                        {!visibleTaskForm &&
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={onClickOpenTaskForm}
                                        variant={'primary'}
                                        className="w-full"
                                    >
                                        <Plus />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Нажмите чтобы создать задачу</span>
                                </TooltipContent>
                            </Tooltip>
                        }
                    </div>
                </li>
            )}
        </Draggable>
    )
}
