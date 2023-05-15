import React, {useState} from 'react';
import styles from "@styles/edit.module.less";
import {GeekIcon} from "@shared/geekIcon";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {guestChannelSelectors, removeGuestChannel} from "@slice/guestChannel";
import EditButton from "@hooks/EditButton";
import useGuestChannels from "@hooks/useGuestChannels";
import {SlideRef} from "@pages/slide";
import {useNavigate, useParams} from "react-router-dom";
import classNames from "classnames";

interface Props {
    slideRef: React.RefObject<SlideRef | null>;
}

function GuestSelect({slideRef}: Props) {
    // 控制 EditButton 的编辑状态 (双向数据绑定)
    const [editing, setEditing] = useState(false);
    // 获取访客频道列表数量
    const guestChannelTotal = useTypedSelector(guestChannelSelectors.selectTotal);
    // 获取访客频道列表
    const guestChannels = useGuestChannels()
    // 获取 dispatch 方法
    const dispatch = useTypedDispatch();
    // 获取路由参数
    const { cid } = useParams();
    // 获取用于实现页面跳转的方法
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.title}>
                <h3>我的频道</h3>
                <h4>点击进入频道</h4>
                <EditButton render={guestChannelTotal > 4} edit={editing} onChange={setEditing}/>
            </div>
            <div className={styles.list}>
                {
                    guestChannels.map(item => (
                        <span
                            className={classNames({
                                [styles.active]: Number(item.id) === Number(cid),
                            })}
                            onClick={() => {
                            navigate(`/${item.id}`)
                            slideRef.current?.onClose();


                        }} key={item.id}>
          {item.name} {editing && Number(item.id) !== 0 && <GeekIcon onClick={(event) => {
                            event.stopPropagation();
                            dispatch(removeGuestChannel(Number(item.id)))
                        }} type={"iconbtn_tag_close"}/>}
        </span>
                    ))
                }


            </div>
        </>
    );
}

export default GuestSelect;