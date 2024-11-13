import { userReducer } from "@/entities/User";
import { dragndropReducer } from "@/features/dragndrop";
import { baseApi } from "@/shared/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        user: userReducer,
        dragndrop: dragndropReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware,
        )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch