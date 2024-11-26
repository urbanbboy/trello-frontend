import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

const initialState: InitialState = {
    columns: []
}

export const dragndropSlice = createSlice({
    name: "dragndropColumn",
    initialState,
    reducers: {
    }
})

export const { actions: dragndropActions } = dragndropSlice
export const { reducer: dragndropReducer } = dragndropSlice