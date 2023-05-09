// src/pages/personal/widgets/updateNickname/index.tsx
import styles from "@styles/personal.module.less";
import Header from "@shared/header";
import {GeekIcon} from "@shared/geekIcon";
import React from "react";
import {SlideRef} from "@pages/slide";

interface Props {
    name: string;
    slideRef: React.RefObject<SlideRef>;
}

export default function UpdateNickname({name,slideRef}: Props) {
    return (
        <div className={styles.content}>
            <Header
                title={"编辑昵称"}
                left={<GeekIcon onClick={() => slideRef.current?.onClose()} type={"iconfanhui"} className={styles.icon}/>}
                right={<button className={styles.submit}>提交</button>}
            />
            <form>
                <input
                    className={styles.input}
                    type="text"
                    defaultValue={name}
                    autoFocus
                />
            </form>
        </div>
    );
}