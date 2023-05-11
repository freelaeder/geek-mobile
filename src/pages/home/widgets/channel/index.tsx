// src/pages/home/widgets/channel/index.tsx
import styles from "@styles/channel.module.less";
import {GeekIcon} from "@shared/geekIcon";
import UserChannel from "@pages/home/widgets/userChannel";
import {useTypedSelector} from "@store/index";
import {selectToken} from "@slice/credentials";
import GuestChannel from "@pages/home/widgets/guestChannel";
import Slide, {SlideRef} from "@pages/slide";
import {useRef} from "react";
import UpdateUserChannel from "@pages/home/widgets/updateUserChannel";



export default function Channel() {
    const token = useTypedSelector(selectToken)
    const slideRef = useRef<SlideRef | null>(null)
    return (
        <div className={styles.container}>
            {/* 如果用户登录则渲染用户频道列表否则渲染访客频道列表 */}
            {
                token ? <UserChannel/> : <GuestChannel/>
            }

            <div className={styles.aside}>
                <div className={styles.search}>
                    <GeekIcon type={"iconbtn_search"} className={styles.search_icon}/>
                </div>
                <div onClick={() => slideRef.current?.onRender()} className={styles.menu}>
                    <GeekIcon type={"iconbtn_channel"} className={styles.channel_icon}/>
                </div>
            </div>
            <Slide direction={'toRight'} ref={slideRef}>
                {token ? <UpdateUserChannel slideRef={slideRef} /> :null }
            </Slide>
        </div>
    );
}