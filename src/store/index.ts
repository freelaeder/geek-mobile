import {configureStore} from "@reduxjs/toolkit";
import {apiService} from "@store/service";


export const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        [apiService.reducerPath]: apiService.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiService.middleware])
})