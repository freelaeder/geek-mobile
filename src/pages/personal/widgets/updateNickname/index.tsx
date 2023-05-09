// src/pages/personal/widgets/updateNickname/index.tsx
import styles from "@styles/personal.module.less";
import Header from "@shared/header";
import {GeekIcon} from "@shared/geekIcon";
import React, {useEffect, useState} from "react";
import {SlideRef} from "@pages/slide";
import {useUpdateProfileMutation} from "@service/userEndpoints";
import toast from "react-hot-toast";

interface Props {
    name: string;
    slideRef: React.RefObject<SlideRef>;
}

export default function UpdateNickname({name, slideRef}: Props) {
    // 获取用户输入的名字
    const [nickName, setNickName] = useState(name)
    // 更新名字
    const [updateName, { isSuccess}] = useUpdateProfileMutation()
    const updateData = () => {
        updateName({name: nickName})
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success('修改名字成功')
            slideRef.current?.onClose()
        }
    }, [isSuccess, slideRef])
    return (
        <div className={styles.content}>
            <Header
                title={"编辑昵称"}
                left={<GeekIcon onClick={() => slideRef.current?.onClose()} type={"iconfanhui"}
                                className={styles.icon}/>}
                right={<button onClick={updateData} className={styles.submit}>提交</button>}
            />
            <form>
                <input
                    className={styles.input}
                    type="text"
                    value={nickName}
                    onChange={event => setNickName(event.currentTarget.value)}
                    autoFocus
                />
            </form>
        </div>
    );
}