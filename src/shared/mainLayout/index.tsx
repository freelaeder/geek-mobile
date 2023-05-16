// src/shared/mainLayout/index.tsx
import {Outlet} from "react-router-dom";
import styles from '@styles/mainLayout.module.less'
import Tabbar from "@shared/tabbar";
import {useRef} from "react";



export interface ScrollProps {
    getScrollTop:() => number;
    setScrollTop:(target:number) => void;
}
export default function MainLayout() {
    // 记录滚动位置
    const scrollTop = useRef(0)
    // 滚动盒子的ref
    const scrollContainRef = useRef<HTMLDivElement | null>(null)

    //获取当前滚动距离
    const getScrollTop = () => scrollTop.current
    //设置滚动距离
    const setScrollTop = (target: number) => {
        if (scrollContainRef.current === null) return
        scrollContainRef.current.scrollTop = target
    }
    return (
        <div className={styles.layout}>
            {/* 页面主体内容区域 */}
            <div ref={scrollContainRef} onScroll={(event) => {
                scrollTop.current = event.currentTarget.scrollTop
            }} className={styles.content}>
                {/* 该区域内容通过路由加载 */}
                <Outlet context={{getScrollTop,setScrollTop}}/>
            </div>
            {/* 底部内容区域 */}
            <div className={styles.bottom}>
                <Tabbar/>
            </div>
        </div>
    );
}