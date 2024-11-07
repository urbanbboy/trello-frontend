import { baseApi } from "@/shared/api/baseApi";
import { Board } from "./types";


export const boardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBoards: builder.query<Board[], { userId: string }>({
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
        deleteBoard: builder.mutation<void, string>({
            query: (boardId) => ({
                method: "DELETE",
                url: `/boards/${boardId}`
            }),
            invalidatesTags: ["boards"]
        })
    })
})

export const {
    useCreateBoardMutation,
    useGetBoardsQuery,
} = boardApi