import React from 'react';
import {useTypedSelector} from "@store/index";
import {selectToken} from "@slice/credentials";
import {Navigate, Outlet, useLocation} from "react-router-dom";


interface Props {
    children?: React.ReactElement
}

function AuthRoute({children}: Props) {

    // 获取token
    const token = useTypedSelector(selectToken)
    const location = useLocation()
    if (!token) {
        return (
            <Navigate to={'/login'} state={{form: location.pathname + location.search + location.hash}} replace={true}/>
        )
    }
    if (typeof children !== 'undefined') return children
    return <Outlet/>
}

export default AuthRoute;