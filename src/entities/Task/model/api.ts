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
    })
})

export const {
    useCreateTaskMutation
} = taskApi