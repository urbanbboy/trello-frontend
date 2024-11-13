import { Column } from '@/entities/Column/model/types';
import { Task } from "@/entities/Task/model/types";

export function useGetSequence(array: (Task | Column)[]) {
    let position = 1;
    if(array.length > 0) {
        position = array[array.length - 1].position + 1
    }

    return position
}