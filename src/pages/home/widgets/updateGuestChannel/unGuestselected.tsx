import React from 'react';
import styles from "@styles/edit.module.less";
import GuestItem from "@pages/home/widgets/updateGuestChannel/guestItem";
import {useRequestAllChannelsQuery} from "@service/channelEndpoints";
import useGuestChannels from "@hooks/useGuestChannels";


function UnGuestselected() {
    // 获取所有频道列表
    const { data: all, isSuccess } = useRequestAllChannelsQuery(undefined);
    // 获取访客频道列表
    const guestChannels = useGuestChannels();

    // 如果所有频道列表没有获取成功, 渲染空
    if (!isSuccess) return null;
    // 获取访客可选频道列表
    const unSelectedChannels = all.data.channels.filter(
        (ac) => typeof guestChannels.find((gc) => gc.id === ac.id) === "undefined"
    );

    return (
        <>
            <div className={styles.title}>
                <h3>可选频道</h3>
            </div>
            <div className={styles.list}>
                {
                    unSelectedChannels.map(item =>   <GuestItem channel={item}  key={item.id} />)
                }

            </div>
        </>
    );
}

export default UnGuestselected;