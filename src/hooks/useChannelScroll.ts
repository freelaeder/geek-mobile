import {useMemo, useRef} from "react";

export default function useChannelScroll(){
    // 用于储存的盒子
    const scrollContainRef = useRef<HTMLDivElement | null>(null)
    // 点击滚动盒子
    const scrollHandler = useMemo(() => (target: HTMLDivElement) => {
        // 获取视图宽度
        const w = window.innerWidth
        // 设置横向滚动距离
        scrollContainRef.current!.scrollTo({
            // 横向滚动距离 = 用户点击的一级分类盒子的中心点与滚动盒子起始位置的距离 - (视图宽度 - 右侧视图宽度) / 2
            left: target.offsetLeft + target.offsetWidth / 2 - (w - w * 0.2373) / 2,
            // 滚动行为: smooth 表示平滑滚动
            behavior: "smooth",
        });

    }, [scrollContainRef])
    return {scrollContainRef,scrollHandler}
}