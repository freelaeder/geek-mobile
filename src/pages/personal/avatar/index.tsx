// src/pages/personal/avatar/index.tsx
import styles from "@styles/personal.module.less";
import {GeekIcon} from "@shared/geekIcon";
import Slide, {SlideRef} from "@pages/slide";
import {useRef} from "react";
import UpdateAvatar from "@pages/personal/widgets/updateAvatar";

interface Props {
    // 头像地址
    avatar: string;
}

export default function Avatar(props: Props) {
    const slideRef = useRef<SlideRef | null>(null)
    return (
        <li>
            <span>头像</span>
            <div onClick={() => slideRef.current?.onRender()} className={styles.value}>
                <div className={styles.avatar}>
                    <img src={props.avatar} alt="avatar"/>
                </div>
                <GeekIcon type="iconbtn_right" className={styles.icon}/>
            </div>
            <Slide direction={'toTop'} ref={slideRef} >
                <UpdateAvatar slideRef={slideRef} />
            </Slide>
         </li>
    );
}