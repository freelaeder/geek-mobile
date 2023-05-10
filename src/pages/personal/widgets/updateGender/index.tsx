// src/pages/personal/widgets/updateGender/index.tsx
import React from "react";
import styles from "@styles/personal.module.less";
import {SlideRef} from "@pages/slide";
import {useUpdateProfileMutation} from "@service/userEndpoints";
import toast from "react-hot-toast";

interface Props {
    slideRef: React.RefObject<SlideRef | null>;
}

export default function UpdateGender({slideRef}: Props) {
    const [updateGender] = useUpdateProfileMutation()
    return (
        <ul className={styles.list}>
            <li onClick={() => {
                updateGender({gender: 0}).unwrap().then(() => {
                    toast.success('修改性别成功')
                    slideRef.current?.onClose()
                }).catch(() => {
                    toast.error('修改性别失败')
                })
            }}>男
            </li>
            <li onClick={() => {
                updateGender({gender: 1}).unwrap().then(() => {
                    toast.success('修改性别成功')
                    slideRef.current?.onClose()
                }).catch(() => {
                    toast.error('修改性别失败')
                })
            }}>女
            </li>
            <li onClick={() => slideRef.current?.onClose()}>取消</li>
        </ul>
    );
}