// src/pages/home/widgets/updateUserChannel/index.tsx
import styles from "@styles/edit.module.less";
import {GeekIcon} from "@shared/geekIcon";
import React from "react";
import {SlideRef} from "@pages/slide";
import SelectChannel from "@pages/home/widgets/selectChannel";
import Unselected from "@pages/home/widgets/unselected";

interface Props {
    slideRef: React.RefObject<SlideRef | null>;
}

export default function UpdateUserChannel({slideRef}: Props) {

    return (
        <div className={styles.container}>
            <div className={styles.close}>
                <GeekIcon
                    type={"iconbtn_channel_close"}
                    onClick={() => slideRef.current?.onClose()}
                />
            </div>
            <SelectChannel/>
            <div className={styles.space}></div>
            <Unselected/>
        </div>
    );
}