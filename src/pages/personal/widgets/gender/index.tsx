// src/pages/personal/widgets/gender/index.tsx
import {GeekIcon} from "@shared/geekIcon";
import styles from '@styles/personal.module.less'
import Slide, {SlideRef} from "@pages/slide";
import {useRef} from "react";
import UpdateGender from "@pages/personal/widgets/updateGender";

interface Props {
    gender: 0 | 1;
}

export default function Gender({gender}: Props) {
    const slideRef = useRef<SlideRef | null>(null)
    return (
        <li>
            <span>性别</span>
            <div onClick={() => slideRef.current?.onRender()} className={styles.value}>
                <span>{gender === 0 ? "男" : "女"}</span>
                <GeekIcon type="iconbtn_right" className={styles.icon}/>
            </div>
            <Slide direction={'toTop'} ref={slideRef}>
                <UpdateGender slideRef={slideRef}/>
            </Slide>
        </li>
    );
}