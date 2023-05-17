import {configureStore} from "@reduxjs/toolkit";
import {apiService} from "@store/service";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {credentialsReducer} from "@slice/credentials";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import {guestChannelSlice} from "@slice/guestChannel";
import {newsSlice} from "@slice/newsSlice";
import {searchKeySlice} from "@slice/searchKey";
// 持久化 - token
const persistCredentialsReducer = persistReducer(
    {key: 'credentialsReducer', storage},
    credentialsReducer.reducer
)
// 持久化 - guestChannelSlice
const persistChannelReducer = persistReducer(
    {key: 'guestChannelsReducer', storage}, guestChannelSlice.reducer
)
// 持久化 搜索记录
const persistSearchKey = persistReducer(
    {key: 'searchKeyReducer', storage}, searchKeySlice.reducer
)
export const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        [credentialsReducer.name]: persistCredentialsReducer,
        [guestChannelSlice.name]: persistChannelReducer,
        [newsSlice.name]:newsSlice.reducer,
        [searchKeySlice.name]:persistSearchKey
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