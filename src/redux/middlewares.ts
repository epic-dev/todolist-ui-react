import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseMiddleware = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/'}),
    endpoints: () => ({}),
});