import { baseApi } from "@/shared/api/baseApi";
import { Column } from "./types";


export const boardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBoardColumnsById: builder.query<Column[], string>({
            query: (boardId) => ({
                method: "GET",
                url: `/boards/${boardId}/columns`,
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
        deleteColumn: builder.mutation({
            query: (columnId) => ({
                method: "DELETE",
                url: `/columns/${columnId}`,
            }),
            invalidatesTags: ["board"]
        }),
        updateColumn: builder.mutation({
            query: ({ data, columnId }) => ({
                method: "PUT",
                url: `/columns/${columnId}`,
                body: data
            }),
            invalidatesTags: ["board"]
        }),
        updateColumnOrder: builder.mutation({
            query: (data) => ({
                method: "PUT",
                url: '/columns/updateorder',
                body: data
            }),
            invalidatesTags: ["column"]
        })
    })
})

export const {
    useGetBoardColumnsByIdQuery,
    useCreateColumnMutation,
    useDeleteColumnMutation,
    useUpdateColumnMutation,
    useUpdateColumnOrderMutation
} = boardApi