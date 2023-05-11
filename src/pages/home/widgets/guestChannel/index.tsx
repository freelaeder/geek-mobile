import React from 'react';
import styles from '@styles/channel.module.less'
import classNames from "classnames";
import useChannelScroll from "@hooks/useChannelScroll";
import useGuestChannels from "@hooks/useGuestChannels";

function GuestChannel() {

    const {scrollContainRef, scrollHandler} = useChannelScroll()
    // 获取访客频道列表
    const guestChannels = useGuestChannels()
    return (
        <div className={styles.list} ref={scrollContainRef}>
            {guestChannels.map((channel) => (
                <div
                    onClick={(event) => scrollHandler(event.currentTarget)}
                    key={channel.id}
                    className={classNames(styles.item)}
                >
                    {channel.name}
                </div>
            ))}
        </div>

    );
}

export default GuestChannel;