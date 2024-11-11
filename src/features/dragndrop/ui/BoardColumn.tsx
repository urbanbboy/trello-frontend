import { Column } from "@/entities/Column/model/types";
import { Button } from "@/shared/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";
import { Draggable, DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { Ellipsis, Grip, Pencil, Plus, Trash2 } from "lucide-react";
import { ClassAttributes, FC, HTMLAttributes } from "react"
import { JSX } from "react/jsx-runtime";

interface Props {
    column: Column;
    index: number;
}

export const BoardColumn: FC<Props> = ({ column, index }) => {

    const loadColumnTitle = (draggableProps: DraggableProvidedDragHandleProps | (JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) | null) => {
        return (
            <div {...draggableProps} className="flex gap-2">
                <Grip /> {column.title}
            </div>
        )
    }

    return (
        <Draggable draggableId={column._id} index={index} key={column._id}>
            {(provided) => (
                <div
                    key={index}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="w-72 overflow-y-auto border rounded-md p-3"
                >
                    <div className="flex justify-between">
                        {loadColumnTitle(provided.dragHandleProps)}
                        <div>
                            <Popover>
                                <PopoverTrigger>
                                    <button>
                                        <Ellipsis className="text-slate-700 dark:text-neutral-100" />
                                    </button>
                                    <PopoverContent
                                        align="start"
                                        side="bottom"
                                        className="flex flex-col gap-2"
                                    >
                                        <Button
                                            className="flex justify-center gap-1"
                                        >
                                            <Pencil /> Изменить
                                        </Button>
                                        <Button
                                            className="flex justify-center gap-1 bg-red-600 hover:bg-red-800"
                                        >
                                            <Trash2 /> Удалить
                                        </Button>
                                    </PopoverContent>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        карточки
                    </div>
                    <button
                        className="flex w-full m-auto bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
                    >
                        <div className="m-auto">
                            <Plus />
                        </div>
                    </button>
                </div>
            )}
        </Draggable>
    )
}
