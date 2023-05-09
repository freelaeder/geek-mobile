import {forwardRef, ReactNode, useEffect, useImperativeHandle, useMemo, useState} from "react";
import classNames from "classnames";
import styles from "@styles/slide.module.less";
import {createPortal} from "react-dom";

interface Props {
    // 弹层内部要渲染的内容
    children: ReactNode;
    // 弹层滑动方向
    direction: "toTop" | "toLeft" | "toRight";
}

export interface SlideRef {
    onRender: () => void;
    onClose: () => void
}

/**
 * 1. 若要执行弹出动画, 为外层元素添加 styles.active 类名
 * 2. 如要调整弹层方向, 为内层元素添加 styles.toTop 或 styles.toLeft 或 styles.toRight 类名
 * 3. 将弹层渲染到 body 中, 而不是在哪调用就在哪渲染
 */

const Slide = forwardRef<SlideRef, Props>(({children, direction}, ref) => {
    // 根据 isRender 决定是否渲染弹层
    const [isShow, setIsShow] = useState(false)
    // 是否渲染
    const [isRender, setIsRender] = useState(false)
    // 若要测试弹层动画, 手动修改 styles.active 对应的布尔值
    // 开启弹框
    const onRender = useMemo(() => () => {
        setIsRender(true)
    }, [])
    useEffect(() => {
        if (isRender) {
            setIsShow(true)
        }
    }, [isRender])
    // 关闭弹框
    const onClose = useMemo(() => () => {
        setIsShow(false)
        setTimeout(() => {
            setIsRender(false)
        }, 400)
    }, [setIsRender, setIsShow])

    // 提供本组件给父组件
    useImperativeHandle(ref, () => (
        {
            onRender, onClose
        }
    ), [onRender, onClose])
    return createPortal((
        <>
            {
                isRender && <div
                    onClick={onClose}
                    className={classNames(styles.layer, {
                        [styles.active]: isShow,
                    })}
                >
                    <div

                        className={classNames(styles.content, {
                            [styles.toTop]: direction === "toTop",
                            [styles.toLeft]: direction === "toLeft",
                            [styles.toRight]: direction === "toRight",
                        })}
                        onClick={(event) => {
                            event.stopPropagation()
                        }
                        }
                    >
                        {children}
                    </div>
                </div>
            }
        </>
    ),document.getElementById('portal_root')!)
})

export default Slide;