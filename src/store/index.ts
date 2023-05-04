import {configureStore} from "@reduxjs/toolkit";
import {apiService} from "@store/service";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        [apiService.reducerPath]: apiService.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiService.middleware])
})

export type AppDispatch = typeof store.dispatch
export const useTypedDispatch = () => useDispatch<AppDispatch>()

export type AppState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector