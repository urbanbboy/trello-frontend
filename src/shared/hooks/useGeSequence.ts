import { Column } from '@/entities/Column/model/types';
import { Task } from "@/entities/Task/model/types";

export function useGetSequence(array: (Task | Column)[]) {
    let order = 1;
    if(array.length > 0) {
        order = array[array.length - 1].order + 1
    }

    return order
}
