import { createApi } from "@reduxjs/toolkit/query/react";
import { rtkBaseQuery } from "./baseQuery";


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: rtkBaseQuery,
    endpoints: () => ({}),
    tagTypes: ["user", "boards", "board", "task", "column"]
})