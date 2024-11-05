import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "./types";

const initialState: UserState = {
    user: undefined,
    isLoaded: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isLoaded = true
        },
        setAuthData: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        userLogout: (state) => {
            state.user = undefined
            state.token = undefined
        }
    }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice