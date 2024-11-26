import { baseApi } from "@/shared/api/baseApi";


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
        getColumnTasks: builder.query({
            query: (columnId) => ({
                url: `/tasks?columnId=${columnId}`
            }),
            providesTags: ["board", "task"]
        })
    })
})

export const {
    useCreateTaskMutation,
    useGetColumnTasksQuery,
} = taskApi