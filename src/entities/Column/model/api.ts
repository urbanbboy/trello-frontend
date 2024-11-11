import { baseApi } from "@/shared/api/baseApi";
import { Column } from "./types";


export const boardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBoardColumnsById: builder.query<Column[], { boardId: string | undefined }>({
            query: ({ boardId }) => ({
                method: "GET",
                url: '/columns',
                params: { boardId }
            }),
            providesTags: ["board"]
        }),
        createColumn: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: '/columns',
                body: data
            }),
            invalidatesTags: ["board"]
        }),
    })
})

export const {
    useGetBoardColumnsByIdQuery,
    useCreateColumnMutation,
} = boardApi