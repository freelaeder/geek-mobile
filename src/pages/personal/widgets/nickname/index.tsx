// src/pages/personal/widgets/nickname/index.tsx
import styles from "@styles/personal.module.less";
import {GeekIcon} from "@shared/geekIcon";
import Slide, {SlideRef} from "@pages/slide";
import {useRef} from "react";
import UpdateNickname from "@pages/personal/widgets/updateNickname";

interface Props {
    // 用户昵称
    name: string;
}

export default function Nickname({name}: Props) {
    const slideRef = useRef<SlideRef | null>(null)
    return (
        <li>
            <span>昵称</span>
            <div onClick={() => slideRef.current?.onRender()} className={styles.value}>
                <span>{name}</span>
                <GeekIcon type="iconbtn_right" className={styles.icon}/>
            </div>
            <Slide direction={'toLeft'} ref={slideRef}>
                <UpdateNickname name={name} slideRef={slideRef} />
            </Slide>
        </li>
    );
}