import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
}

export const dragndropSlice = createSlice({
    name: "dragndropColumn",
    initialState,
    reducers: {

    }
})

export const { actions: dragndropActions } = dragndropSlice
export const { reducer: dragndropReducer } = dragndropSlice