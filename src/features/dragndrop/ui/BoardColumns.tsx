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
import { Skeleton } from "@/shared/ui/Skeleton";
import { Board } from "@/entities/Board";

interface Props {
    board: Board;
    isBoardLoading?: boolean;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed)

    return result
}

const getSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="w-72 h-36">
            <div className="flex justify-between items-center py-3 px-5 ">
                <Skeleton className=" h-6 w-20 bg-gray-400" />
                <Skeleton className=" h-3 w-7 bg-gray-400" />
            </div>
            <div className="flex flex-col gap-y-0.5 px-3">
                <Skeleton className="h-7 w-full bg-gray-400" />
                <Skeleton className="h-7 w-full bg-gray-400" />
                <Skeleton className="h-7 w-full bg-gray-400" />
            </div>
        </Skeleton>
    ));
};

export const BoardColumns: FC<Props> = ({ board }) => {
    const { data: columns = [], isLoading: isColumnsLoading } = useGetBoardColumnsByIdQuery(board._id)
    const { data: tasks = [], isLoading: isTasksLoading } = useGetColumnTasksQuery(board._id)
    const [createColumn, { isLoading: isCreateColumnLoading, isSuccess: isCreateColumnSuccess }] = useCreateColumnMutation()
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
            await updateColumnOrder({
                boardId: board._id,
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
                await updateTaskOrder({
                    boardId: board._id,
                    tasks: reorderedTasks
                })
                    .unwrap()
                    .then(() => {
                        toast("Задача обновлена")
                    })
                    .catch(() => {
                        toast.error("Возникла ошибка. Повторите попытку")
                        setColumnTasks(tasks)
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
                    boardId: board._id,
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
            boardId: board._id,
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
            className="block relative overflow-x-auto h-screen-minus-113 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${board.imageFullUrl})` }}
        >
            {isColumnsLoading && isTasksLoading && (
                <div className="flex flex-row m-3 gap-2">
                    {getSkeletons()}
                </div>
            )}

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
                                    isLoading={isCreateColumnLoading}
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
