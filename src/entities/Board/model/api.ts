import { baseApi } from "@/shared/api/baseApi";
import { Board } from "./types";
import { User } from "@/entities/User/model/types";


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
        updateBoardName: builder.mutation({
            query: (data) => ({
                method: "PUT",
                url: `/boards/update/name`,
                body: data
            }),
            invalidatesTags: ["board", "boards"]
        }),
        updateBoardImage: builder.mutation({
            query: (data) => ({
                method: "PUT",
                url: `/boards/update/image`,
                body: data
            }),
            invalidatesTags: ["board", "boards"]
        }),
        getBoardById: builder.query<Board, { boardId: string | undefined }>({
            query: ({ boardId }) => ({
                method: "GET",
                url: '/board',
                params: { boardId }
            }),
            providesTags: ["board"]
        }),
        getBoardMembers: builder.query<User[], { boardId: string | undefined }>({
            query: ({ boardId }) => ({
                method: 'GET',
                url: '/members',
                params: { boardId }
            })
        })
    })
})

export const {
    useDeleteBoardMutation,
    useCreateBoardMutation,
    useGetBoardByIdQuery,
    useGetBoardsQuery,
    useUpdateBoardNameMutation,
    useUpdateBoardImageMutation,
    useGetBoardMembersQuery,
} = boardApi