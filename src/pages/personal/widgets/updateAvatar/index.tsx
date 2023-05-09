// src/pages/personal/widgets/updateAvatar/index.tsx
import styles from "@styles/personal.module.less";
import React, {ChangeEvent, useEffect, useRef} from "react";
import {SlideRef} from "@pages/slide";
import {useUploadAvatarMutation} from "@service/userEndpoints";
import toast from "react-hot-toast";

interface Props {
    // slide 组件实例对象, 因为当前组件将来要关闭弹窗
    // 所以当前组件要接收弹层对象实例
    slideRef: React.RefObject<SlideRef | null>;
}

export default function UpdateAvatar({slideRef}: Props) {
    // 获取用户input
    const fileRef = useRef<HTMLInputElement | null>(null)
    // 发送请求
    const [updateAvater, {isLoading, isError, isSuccess}] = useUploadAvatarMutation()
    // 拍照或选择照片
    const trigger = (mark: 'take' | 'select') => {
        // 拍照
        if (mark === "take") {
            // user: 前置摄像头 environment: 后置摄像头
            fileRef.current?.setAttribute("capture", "user");
            // 选择照片
        } else if (mark === "select") {
            fileRef.current?.removeAttribute("capture");
        }
        // 触发点击事件
        fileRef.current?.click()
    }

    // 用户选择照片之后
    const uploadAvatarHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // 获取用户选择的文件列表
        const file = event.currentTarget.files
        // 判断用户是否选择了文件
        if (file === null) return
        if (typeof file === 'undefined') return;
        // 创建表单对象
        const formData = new FormData()
        // 向表单对象中添加字段
        formData.append('photo', file[0])
        // 发送请求
        updateAvater(formData)
    }
    useEffect(() => {
        if (isError) {
            toast.error('上传失败')
        }
    }, [isError])
    useEffect(() => {
        if (isSuccess) {
            toast.success('上传成功')
            slideRef.current?.onClose()
        }
    }, [isSuccess, slideRef])

    return (
        <ul className={styles.list}>
            <li onClick={() => trigger('take')}>拍照</li>
            <li onClick={() => trigger('select')}>选择照片</li>
            <li onClick={() => slideRef.current?.onClose()}>取消</li>
            <input
                ref={fileRef}
                type="file"
                onChange={uploadAvatarHandler}
                accept="image/png, image/gif, image/jpeg"
                style={{display: "none"}}
            />
        </ul>
    );
}