// src/pages/personal/widgets/logout/index.tsx
import styles from "@styles/personal.module.less";
import {useNavigate} from "react-router-dom";
import {useTypedDispatch} from "@store/index";
import {resetCredentials} from "@slice/credentials";
import Confirm, {confirmRef} from "@shared/confirm";
import {useRef} from "react";

export default function Logout() {
    const navigate = useNavigate()
    const dispatch = useTypedDispatch()
    const logoutBtn = () => {
        dispatch(resetCredentials())
        navigate('/login')
    }
    const confirmRef = useRef<confirmRef | null>(null)
    return (
        <>
            <button onClick={() => confirmRef.current?.open()} className={styles.logout}>退出登录</button>
            <Confirm ref={confirmRef} content={'您确定退出吗?'} onConfirm={logoutBtn}/>
        </>
    )

}