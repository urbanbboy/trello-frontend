import { DragDropContext, Droppable } from "@hello-pangea/dnd"

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

interface Props {
    columns: Column[];
    boardId: string;
}

export const BoardColumns: FC<Props> = ({ columns, boardId }) => {
    const [createColumn, {isLoading}] = useCreateColumnMutation()
    const [formVisible, setFormVisible] = useState(false)

    const setCreateFormVisible = () => {
        setFormVisible(!formVisible)
    }

    const onDragEnd = () => {

    }

    const addColumn = async (data: Yup.InferType<typeof CreateColumnSchema>) => {
        await createColumn({
            ...data,
            board: boardId,
            position: 1
        }).unwrap()
            .then(() => {
                toast.success("Колонка добавлена")
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as CreateTaskError;
                toast.error(data.message)
            })
        
        setFormVisible(false)
        
    }

    return (
        <div
            className="block relative overflow-x-auto"
        // style={{ backgroundImage: `url(/board_main_bg.jpg)` }}
        // style={{backgroundImage: 'url(/board_main_bg.jpg)'}}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column" >
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex overflow-y-auto gap-2 m-3"
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
