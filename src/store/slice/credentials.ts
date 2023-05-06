import {createSelector, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";


export interface Credentials {
    token: string;
    refresh_token: string,
}

// 默认值
const initialState: Credentials = {
    token: '',
    refresh_token: ''
}


export const credentialsReducer = createSlice<Credentials, {
    // 保存登录凭据
    saveCredentials: (state: Draft<Credentials>, action: PayloadAction<Credentials>) => void;
    // 重置
    resetCredentials: (state: Draft<Credentials>) => void
}, 'credentials'>({
    name: 'credentials',
    initialState: initialState,
    reducers: {
        // 保存登录凭证
        saveCredentials: (state, action) => {
            state.token = action.payload.token
            state.refresh_token = action.payload.refresh_token
        },
        // 重置
        resetCredentials: (state) => {
            state.token = ''
            state.refresh_token = ''
        }
    }

})

export const {saveCredentials, resetCredentials} = credentialsReducer.actions

export const selectToken = createSelector<[(state: AppState) => Credentials], string>(
    (state) => state.credentials,
    (state) => state.token
)