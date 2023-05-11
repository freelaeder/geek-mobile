// src/shared/confirm/index.tsx
import styles from "@styles/confirm.module.less";
import ReactDOM from "react-dom";
import classNames from "classnames";
import {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from "react";

interface Props {
    title?: string,
    content: string;
    onConfirm: () => void
}

export interface confirmRef {
    close: () => void;
    open: () => void;
}

const Confirm = forwardRef<confirmRef, Props>(({title, content, onConfirm}, ref) => {

    // 是否渲染该组件
    const [isRender, setIsRender] = useState(false)
    // 演示是否激活
    const [isActive, setIsActive] = useState(false)
    // 渲染组件
    const open = useMemo(() => () => {
        setIsRender(true)
    }, [])
    useEffect(() => {
        if (isRender) {
            setIsActive(true)
        }
    }, [isRender])
    // 关闭组件
    const close = useMemo(() => () => {
        setIsActive(false)
        setTimeout(() => {
            setIsRender(false)
        }, 400)
    }, [])
    // 传递本组件方法给父组件
    useImperativeHandle(ref, () => ({open, close}), [open, close])

    return isRender ? ReactDOM.createPortal(
        <div className={classNames(styles.layer, {[styles.active]: isActive,})}>
            <div className={styles.container}>
                <div className={styles.title}>{title ? title : '温馨提示'}</div>
                <div className={styles.content}>{content}</div>
                <div className={styles.buttons}>
                    <button onClick={close} className={styles.cancel}>取消</button>
                    <button onClick={onConfirm} className={styles.sure}>确定</button>
                </div>
            </div>
        </div>,
        document.body
    ) : null;
})

export default Confirm;