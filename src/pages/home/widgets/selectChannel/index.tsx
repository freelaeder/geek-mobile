import React, {useState} from 'react';
import styles from "@styles/edit.module.less";
import classNames from "classnames";
import {GeekIcon} from "@shared/geekIcon";
import {useDeleteChannelMutation, useRequestUserChannelsQuery} from "@service/channelEndpoints";

function SelectChannel() {
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
        <>
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
        </>

    );
}

export default SelectChannel;