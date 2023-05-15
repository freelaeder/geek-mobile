import React, {useEffect, useRef} from 'react';
import styles from "@styles/channel.module.less";
import classNames from "classnames";
import useChannelScroll from "@hooks/useChannelScroll";
import {useRequestUserChannelsQuery} from "@service/channelEndpoints";
import {useNavigate, useParams} from "react-router-dom";

function UserChannel() {
    const {scrollContainRef, scrollHandler} = useChannelScroll()
    // 获取数据-用户登录频道
    const {data} = useRequestUserChannelsQuery(undefined)
    // 路径参数
    const {cid} = useParams()
    const navigate = useNavigate()
    const elements = useRef<Record<string, HTMLDivElement>>({})
    useEffect(() => {
        if (scrollContainRef.current === null) return
        scrollHandler(elements.current[cid!])
    }, [cid, scrollContainRef, scrollHandler])
    if (typeof data === 'undefined') return null
    return (
        <div className={styles.list} ref={scrollContainRef}>
            {data.data.channels.map((channel) => (
                <div onClick={(event) => {
                    navigate(`/${channel.id}`)
                }} key={channel.id}
                     className={classNames(styles.item, {[styles.active]: Number(channel.id) === Number(cid)})}
                     ref={(el) => elements.current[channel.id] = el!}
                >
                    {channel.name}
                </div>
            ))}
        </div>
    );
}

export default UserChannel;