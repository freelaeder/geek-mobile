import React, {useEffect, useRef} from 'react';
import styles from '@styles/channel.module.less'
import classNames from "classnames";
import useChannelScroll from "@hooks/useChannelScroll";
import useGuestChannels from "@hooks/useGuestChannels";
import {useNavigate, useParams} from "react-router-dom";

function GuestChannel() {

    const {scrollContainRef, scrollHandler} = useChannelScroll()
    // 获取访客频道列表
    const guestChannels = useGuestChannels()
    const navigate = useNavigate()
    const {cid} = useParams()
    // 获取访客频道列表对应的 DOM 对象
    const guestChannelDOM = useRef<Record<string, HTMLDivElement>>({});

    // 检测高亮频道id变化
    useEffect(() => {
        // 获取高亮频道对应的 DOM 对象
        if (typeof cid !== "undefined") {
            const currentDOM = guestChannelDOM.current[Number(cid)];
            // 如果 DOM 对象不存在, 阻止程序继续运行
            if (typeof currentDOM === "undefined") return;
            // 设置高亮频道滚动位置
            scrollHandler(currentDOM);
        }
    }, [cid, guestChannelDOM, scrollHandler]);
    if(typeof guestChannels === 'undefined') return  null
    return (
        <div className={styles.list} ref={scrollContainRef}>
            {guestChannels.map((channel) => (
                <div
                    ref={(element) => (guestChannelDOM.current[channel.id] = element!)}
                    onClick={(event) => {
                        scrollHandler(event.currentTarget);
                        navigate(`/${channel.id}`)

                    } }
                    key={channel.id}
                    className={classNames(styles.item ,{[styles.active]:Number(channel.id) === Number(cid)  } )}
                >
                    {channel.name}
                </div>
            ))}
        </div>

    );
}

export default GuestChannel;