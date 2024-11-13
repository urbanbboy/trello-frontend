import { baseApi } from "@/shared/api/baseApi";


export const taskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: '/columns',
                body: data
            }),
            invalidatesTags: ["task", "board"]
        }),
        getColumnTasks: builder.query({
            query: (columnId) => ({
                url: `/tasks?columnId=${columnId}`
            })
        })
    })
})

export const {
    useCreateTaskMutation,
    useGetColumnTasksQuery,
} = taskApi