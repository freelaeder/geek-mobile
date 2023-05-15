// src/pages/home/widgets/updateGuestChannel/index.tsx
import styles from "@styles/edit.module.less";
import {GeekIcon} from "@shared/geekIcon";
import React from "react";
import {SlideRef} from "@pages/slide";
import GuestSelect from "@pages/home/widgets/updateGuestChannel/guestSelect";
import UnGuestselected from "@pages/home/widgets/updateGuestChannel/unGuestselected";

interface Props {
    slideRef: React.RefObject<SlideRef | null>;
}

export default function UpdateGuestChannel({slideRef}: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.close}>
                <GeekIcon
                    type={"iconbtn_channel_close"}
                    onClick={() => slideRef.current?.onClose()}
                />
            </div>
          <GuestSelect slideRef={slideRef} />
            <div className={styles.space}></div>
           <UnGuestselected />
        </div>
    );
}