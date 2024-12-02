import { baseApi } from "@/shared/api/baseApi";
import { Task } from "./types";


export const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: '/tasks',
                body: data
            }),
            invalidatesTags: ["board"]
        }),
        getColumnTasks: builder.query<Task[], string>({
            query: (boardId) => ({
                method: "GET",
                url: `/boards/${boardId}/tasks`
            }),
            providesTags: ["board", "task"]
        }),
        updateTaskOrder: builder.mutation({
            query: (data) => ({
                method: "PUT",
                url: '/tasks/updateorder',
                body: data
            }),
            invalidatesTags: ["column", "task"]
        }),
    })
})

export const {
    useCreateTaskMutation,
    useGetColumnTasksQuery,
    useUpdateTaskOrderMutation
} = taskApi