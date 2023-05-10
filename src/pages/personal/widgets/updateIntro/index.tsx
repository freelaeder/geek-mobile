// src/pages/personal/widgets/updateIntro/index.tsx
import React, {useState} from "react";
import styles from "@styles/personal.module.less";
import Header from "@shared/header";
import Textarea from "react-textarea-autosize";
import {GeekIcon} from "@shared/geekIcon";
import {SlideRef} from "@pages/slide";
import {useUpdateProfileMutation} from "@service/userEndpoints";
import toast from "react-hot-toast";

interface Props {
    intro: string;
    slideRef: React.RefObject<SlideRef | null>;
}

export default function UpdateIntro({intro, slideRef}: Props) {
    const [text, setText] = useState(() => intro === null ? '' : intro)
    const [updateIntro] = useUpdateProfileMutation()
    return (
        <div className={styles.content}>
            <Header
                title={"编辑简介"}
                left={
                    <GeekIcon
                        type={"iconfanhui"}
                        className={styles.icon}
                        onClick={slideRef.current?.onClose}
                    />
                }
                right={<button onClick={() => {
                    updateIntro({intro:text}).unwrap().then((res)=> {
                        toast.success('修改成功')
                        slideRef.current?.onClose()
                    }).catch((e)=> {
                        toast.error('修改失败')
                    })
                }
                } className={styles.submit}>提交</button>}
            />
            <form>
                <div className={styles.bg}>
                    <Textarea onChange={event => {
                        if (text.trim().length <= 100) {
                            setText(event.currentTarget.value.trim())
                        }
                    }} className={styles.textarea} value={text}></Textarea>
                    <div className={styles.count}>{text.length}/100</div>
                </div>
            </form>
        </div>
    );
}