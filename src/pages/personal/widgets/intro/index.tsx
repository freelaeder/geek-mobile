// src/pages/personal/widgets/intro/index.tsx
import styles from "@styles/personal.module.less";
import {GeekIcon} from "@shared/geekIcon";
import Slide, {SlideRef} from "@pages/slide";
import {useRef} from "react";
import UpdateIntro from "@pages/personal/widgets/updateIntro";

interface Props {
    // 用户简介
    intro: string;
}

export default function Intro({intro}: Props) {
    const slideRef = useRef<SlideRef | null>(null)

    return (
        <li>
            <span>简介</span>
            <div onClick={() => slideRef.current?.onRender()} className={styles.value}>
                <span>{intro || "未填写"}</span>
                <GeekIcon type="iconbtn_right" className={styles.icon}/>
            </div>

            <Slide direction={'toLeft'} ref={slideRef}>
                <UpdateIntro intro={intro} slideRef={slideRef} />
            </Slide>
        </li>
    );
}