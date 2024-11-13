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
            })
        }),
        updateColumnPosition: builder.mutation({
            query: (columnId) => ({
                method: "PUT",
                url: `/columns/${columnId}/position`
            })
        })
    })
})

export const {
    useGetBoardColumnsByIdQuery,
    useCreateColumnMutation,
    useDeleteColumnMutation,
    useUpdateColumnMutation,
} = boardApi