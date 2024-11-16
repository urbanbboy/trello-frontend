import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"

import { FC, useState } from "react"
import { BoardColumn } from "./BoardColumn";
// import { useCreateTaskMutation } from "@/entities/Task/model/api";
import { AddColumn } from "@/features/createColumn";
import { Column } from "@/entities/Column/model/types";
import * as Yup from 'yup'
import { CreateColumnSchema } from "@/features/createColumn/model/schema";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CreateTaskError } from "../model/types";
import { useCreateColumnMutation } from "@/entities/Column/model/api";
import { useGetSequence } from "@/shared/hooks/useGetPosition";

interface Props {
    columns: Column[];
    boardId: string;
}

export const BoardColumns: FC<Props> = ({ columns, boardId }) => {
    const [createColumn, { isLoading }] = useCreateColumnMutation()
    const [formVisible, setFormVisible] = useState(false)
    const columnPosition = useGetSequence(columns)

    const setCreateFormVisible = () => {
        setFormVisible(!formVisible)
    }

    const saveColumnSequence = (destinationIndex: number, columnId: string) => {
        const filteredColumns = columns.filter((column) => column._id !== columnId)
        const sortedColumns = filteredColumns.sort((a, b) => a.position - b.position)

        const position = destinationIndex === 0 ? 1 : sortedColumns[destinationIndex - 1].position + 1;
        console.log(position)
        // const patchColumn = {
        //     _id: columnId,
        //     position
        // };
    }

    const onDragEnd = async (result: DropResult) => {
        const { destination, draggableId, source, type } = result

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }


        if (type === "column") {
            await saveColumnSequence(destination.index, draggableId)
        }

    }

    const addColumn = async (data: Yup.InferType<typeof CreateColumnSchema>) => {
        await createColumn({
            ...data,
            board: boardId,
            position: columnPosition
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

    return (
        <div
            className="block relative overflow-x-auto h-screen-minus-120 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(/board_main_bg.jpg)` }}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column" >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex absolute gap-2 m-3 overflow-y-auto"
                        >
                            {columns.map((column, index) => (
                                <BoardColumn
                                    key={column._id}
                                    column={column}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                            <div>
                                <AddColumn
                                    isLoading={isLoading}
                                    addColumn={addColumn}
                                    formVisible={formVisible}
                                    setFormVisible={setCreateFormVisible}
                                />
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
