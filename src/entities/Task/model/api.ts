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
        updateTask: builder.mutation({
            query: ({data, id}) => ({
                method: "PUT",
                url: `/tasks/${id}`,
                body: data
            }),
            invalidatesTags: ["task"]
        }),
        deleteTask: builder.mutation<Task, string | undefined>({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["task"]
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
            invalidatesTags: ["task"]
        }),
    })
})

export const {
    useCreateTaskMutation,
    useGetColumnTasksQuery,
    useUpdateTaskOrderMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskApi