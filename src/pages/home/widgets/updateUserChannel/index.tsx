// src/pages/home/widgets/updateUserChannel/index.tsx
import styles from "@styles/edit.module.less";
import {GeekIcon} from "@shared/geekIcon";
import React, {useState} from "react";
import {SlideRef} from "@pages/slide";
import {useDeleteChannelMutation, useRequestUserChannelsQuery} from "@service/channelEndpoints";
import classNames from "classnames";

interface Props {
    slideRef: React.RefObject<SlideRef | null>;
}

export default function UpdateUserChannel({slideRef}: Props) {
    const {selectedChannels} = useRequestUserChannelsQuery(undefined, {
        selectFromResult: (res) => ({
            ...res,
            selectedChannels: res.data?.data.channels
        })
    })
    // 编辑状态
    const [edit, setEdit] = useState(false)
    // 删除请求
    const [deleteChannel] = useDeleteChannelMutation()
    if (typeof selectedChannels === 'undefined') return null
    return (
        <div className={styles.container}>
            <div className={styles.close}>
                <GeekIcon
                    type={"iconbtn_channel_close"}
                    onClick={() => slideRef.current?.onClose()}
                />
            </div>
            <div className={styles.title}>
                <h3>我的频道</h3>
                <h4>点击进入频道</h4>
                {
                    selectedChannels.length > 0 && <button className={classNames({
                        [styles.active]: edit
                    })} onClick={() => setEdit(!edit)}>
                        {edit ? '完成' : '编辑'} </button>
                }
            </div>
            <div className={styles.list}>
                {
                    selectedChannels && selectedChannels.map(item => <span key={item.id} className={classNames({
                        [styles.active]: false
                    })}>{item.name} {
                        edit && Number(item.id) !== 0 &&
                        <GeekIcon onClick={() => deleteChannel(item.id)} type={"iconbtn_tag_close"}/>
                    } </span>)
                }


            </div>
            <div className={styles.space}></div>
            <div className={styles.title}>
                <h3>可选频道</h3>
            </div>
            <div className={styles.list}>
                <span>+ 人工智能</span>
                <span>+ 数据分析</span>
                <span>+ 后端</span>
                <span>+ 前端</span>
                <span>+ 测试</span>
                <span>+ 数据库</span>
            </div>
        </div>
    );
}