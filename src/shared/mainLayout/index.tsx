// src/shared/mainLayout/index.tsx
import { Outlet } from "react-router-dom";
import styles from '@styles/mainLayout.module.less'
import Tabbar from "@shared/tabbar";
export default function MainLayout() {
    return (
        <div className={styles.layout}>
            {/* 页面主体内容区域 */}
            <div className={styles.content}>
                {/* 该区域内容通过路由加载 */}
                <Outlet />
            </div>
            {/* 底部内容区域 */}
            <div className={styles.bottom}>
                <Tabbar />
            </div>
        </div>
    );
}