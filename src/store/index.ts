import {configureStore} from "@reduxjs/toolkit";
import {apiService} from "@store/service";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {credentialsReducer} from "@slice/credentials";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist";
// 持久化
const persistCredentialsReducer = persistReducer(
    {key: 'credentialsReducer', storage},
    credentialsReducer.reducer
)
export const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        [credentialsReducer.name]: persistCredentialsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // serializableCheck:false 第一种解决
        // 特定不检查
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }).concat([apiService.middleware])
})

export type AppDispatch = typeof store.dispatch
export const useTypedDispatch = () => useDispatch<AppDispatch>()

export type AppState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector