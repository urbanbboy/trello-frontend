import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"

import { FC, useEffect, useState } from "react"
import { BoardColumn } from "./BoardColumn";
import { AddColumn } from "@/features/createColumn";
import * as Yup from 'yup'
import { CreateColumnSchema } from "@/features/createColumn/model/schema";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CreateTaskError } from "../model/types";
import { useCreateColumnMutation, useUpdateColumnOrderMutation } from "@/entities/Column/model/api";
import { useGetBoardColumnsByIdQuery } from "@/entities/Column/model/api"
import { useGetSequence } from "@/shared/hooks/useGeSequence";
import { useGetColumnTasksQuery, useUpdateTaskOrderMutation } from "@/entities/Task/model/api";
import { Column } from "@/entities/Column/model/types";
import { Task } from "@/entities/Task/model/types";

interface Props {
    boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed)

    return result
}

export const BoardColumns: FC<Props> = ({ boardId }) => {
    const { data: columns = [] } = useGetBoardColumnsByIdQuery(boardId)
    const { data: tasks = [] } = useGetColumnTasksQuery(boardId)
    const [createColumn, { isLoading, isSuccess: isCreateColumnSuccess }] = useCreateColumnMutation()
    const [updateColumnOrder] = useUpdateColumnOrderMutation()
    const [updateTaskOrder] = useUpdateTaskOrderMutation()
    const [formVisible, setFormVisible] = useState(false)
    const [boardColumns, setBoardColumns] = useState<Column[]>(columns)
    const [columnTasks, setColumnTasks] = useState<Task[]>(tasks)
    const columnOrder = useGetSequence(boardColumns)

    useEffect(() => {
        setBoardColumns(columns)
        setColumnTasks(tasks)
    }, [columns, tasks])

    const setCreateFormVisible = () => {
        setFormVisible(!formVisible)
    }

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, type } = result

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }


        if (type === "column") {
            const items = reorder(
                boardColumns,
                source.index,
                destination.index
            ).map((item, index) => ({ ...item, order: index }))

            setBoardColumns(items)
            // TODO: send post request
            await updateColumnOrder({
                boardId,
                columns: items,
            })
                .unwrap()
                .then(() => {
                    toast.success("Колонка изменена")
                })
                .catch(() => {
                    toast.error("Не удалось изменить")
                    setBoardColumns(columns)
                })
        }

        if (type === "task") {
            const startColumnId = source.droppableId;
            const endColumnId = destination.droppableId;
            if (startColumnId === endColumnId) {
                const reorderedTasks = reorder(
                    filterTasks(startColumnId),
                    source.index,
                    destination.index
                )
                    .map((task, index) => ({ ...task, order: index }));

                setColumnTasks(prevTasks => [
                    ...prevTasks.filter(task => task.columnId !== startColumnId),
                    ...reorderedTasks
                ]);
                console.log(reorderedTasks)
                await updateTaskOrder({
                    boardId,
                    tasks: reorderedTasks
                })
                    .unwrap()
                    .then(() => {
                        toast("Задача обновлена")
                    })
            } else {
                const startTasks = filterTasks(startColumnId);
                const endTasks = filterTasks(endColumnId);

                const [movedTask] = startTasks.splice(source.index, 1);
                const updatedMovedTask = { ...movedTask, columnId: endColumnId }
                endTasks.splice(destination.index, 0, updatedMovedTask);

                const newStartTasks = startTasks.map((task, index) => ({ ...task, order: index }));
                const newEndTasks = endTasks.map((task, index) => ({ ...task, order: index }));

                setColumnTasks(prevTasks => [
                    ...prevTasks.filter(task => task.columnId !== startColumnId && task.columnId !== endColumnId),
                    ...newStartTasks,
                    ...newEndTasks
                ]);
                await updateTaskOrder({
                    boardId,
                    tasks: [
                        ...newStartTasks,
                        ...newEndTasks
                    ]
                })
                    .unwrap()
                    .then(() => {
                        toast("Задача обновлена")
                    })
                    .catch(() => {
                        toast.error("Возникла ошибка. Повторите попытку")
                        setColumnTasks(tasks)
                    })
            }
        }

    }

    const addColumn = async (data: Yup.InferType<typeof CreateColumnSchema>) => {
        await createColumn({
            ...data,
            boardId,
            order: columnOrder
        }).unwrap()
            .then(() => {
                toast.success("Колонка добавлена")
                setFormVisible(false)
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as CreateTaskError;
                toast.error(data.message)
            })
    }

    const filterTasks = (columnId: string) => {
        const filteredTasks = columnTasks.filter((task) => task.columnId === columnId);

        return filteredTasks;
    };

    return (
        <div
            className="block relative overflow-x-auto h-screen-minus-120 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1732465286852-a0b95393a90d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNzMyNjgzNDMwfA&ixlib=rb-4.0.3&q=80&w=2160)` }}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column" >
                    {(provided) => (
                        <ol
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex absolute gap-2 m-3 overflow-y-auto"
                        >
                            {boardColumns.map((column, index) => (
                                <BoardColumn
                                    key={column._id}
                                    column={column}
                                    index={index}
                                    tasks={filterTasks(column._id)}
                                />
                            ))}
                            {provided.placeholder}
                            <div>
                                <AddColumn
                                    isLoading={isLoading}
                                    addColumn={addColumn}
                                    formVisible={formVisible}
                                    setFormVisible={setCreateFormVisible}
                                    isSuccess={isCreateColumnSuccess}
                                />
                            </div>
                        </ol>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
