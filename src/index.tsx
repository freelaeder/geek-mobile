import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "@store/index";
import AppRouter from "@router/index";
import '@styles/base.less'
import {Toaster} from "react-hot-toast";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const persistor = persistStore(store);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppRouter/>
            </PersistGate>
            <Toaster/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
