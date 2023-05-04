import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const apiService = createApi({
    reducerPath: 'apiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,

    }),
    endpoints: () => ({})
})