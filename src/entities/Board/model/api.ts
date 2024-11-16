import { baseApi } from "@/shared/api/baseApi";
import { Board } from "./types";


export const boardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBoards: builder.query<Board[], { userId: string | undefined }>({
            query: ({ userId }) => ({
                method: "GET",
                url: '/boards',
                params: { userId }
            }),
            providesTags: ["boards"]
        }),
        createBoard: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: '/boards',
                body: data
            }),
            invalidatesTags: ["boards"]
        }),
        deleteBoard: builder.mutation<void, string | undefined>({
            query: (boardId) => ({
                method: "DELETE",
                url: `/boards/${boardId}`
            }),
            invalidatesTags: ["boards"]
        }),
        updateBoard: builder.mutation({
            query: ({ boardId, data }) => ({
                method: "PUT",
                url: `/boards/${boardId}`,
                body: data
            }),
            invalidatesTags: ["board"]
        }),
        getBoardById: builder.query<Board, { boardId: string | undefined }>({
            query: ({ boardId }) => ({
                method: "GET",
                url: '/board',
                params: { boardId }
            }),
            providesTags: ["board"]
        }),
    })
})

export const {
    useDeleteBoardMutation,
    useCreateBoardMutation,
    useGetBoardByIdQuery,
    useGetBoardsQuery,
    useUpdateBoardMutation,
} = boardApi