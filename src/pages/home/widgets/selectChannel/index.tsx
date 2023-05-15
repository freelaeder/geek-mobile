import React, {useState} from 'react';
import styles from "@styles/edit.module.less";
import classNames from "classnames";
import {GeekIcon} from "@shared/geekIcon";
import {useDeleteChannelMutation, useRequestUserChannelsQuery} from "@service/channelEndpoints";
import {useNavigate, useParams} from "react-router-dom";
import {SlideRef} from "@pages/slide";
import EditButton from "@hooks/EditButton";

interface Props {
    slideRef: React.RefObject<SlideRef | null>;
}

function SelectChannel({slideRef}: Props) {
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
    // 获取路由参数
    const {cid} = useParams();
    // 获取用于实现页面跳转的方法
    const navigate = useNavigate();
    if (typeof selectedChannels === 'undefined') return null
    return (
        <>
            <div className={styles.title}>
                <h3>我的频道</h3>
                <h4>点击进入频道</h4>
                <EditButton render={selectedChannels.length > 4} edit={edit} onChange={setEdit} />
            </div>
            <div className={styles.list}>
                {
                    selectedChannels && selectedChannels.map(item => <span onClick={() => {
                        navigate(`/${item.id}`);
                        slideRef.current?.onClose()


                    }}
                                                                           key={item.id} className={classNames({
                        [styles.active]: Number(item.id) === Number(cid)
                    })}>{item.name} {
                        edit && Number(item.id) !== 0 &&
                        <GeekIcon onClick={(event) => {
                            event.stopPropagation();
                            deleteChannel(item.id)
                            // 如果要删除的频道是选中的, 设置推荐为选中
                            if (Number(item.id) === Number(cid)) {
                                navigate(`/0`);
                            }
                        }
                        } type={"iconbtn_tag_close"}/>
                    } </span>)
                }
            </div>
        </>

    );
}

export default SelectChannel;