// src/shared/infinite/index.tsx
import styles from "@styles/infinite.module.less";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface Props {
    // 是否还有更多数据可以加载
    hasMore: boolean;
    // 用于加载数据的方法
    // 返回的 Promise 是加载数据请求对应的 Promise 对象
    // 目的是能够在无限列表加载组件中掌握请求动态(请求是否已经结束)
    loadMore: () => Promise<any>;
}

export default function Infinite({ hasMore, loadMore }: Props) {
    // ref: 绑定要监听的进入可视区的元素
    // inView: 布尔值, 元素是否进入可视区
    const { ref, inView } = useInView();
    // 请求锁
    const [loading, setLoading] = useState(false);

    // 监听元素是否进入可视区
    useEffect(() => {
        // 如果进入了可视区、并且还有更多数据可以加载、并且当前没有正在加载
        if (inView && hasMore && !loading) {
            // 更新请求锁
            setLoading(true);
            // 等待请求完成并且浏览器处于空闲状态(父组件渲染完成)
            loadMore().finally(() => requestIdleCallback(() => setLoading(false)));
        }
    }, [inView, hasMore, loadMore, loading]);
    return (
        <div ref={ref} className={styles.container}>
            {loading && "加载中..."}
            {!hasMore && "没有更多数据可以加载"}
        </div>
    );
}