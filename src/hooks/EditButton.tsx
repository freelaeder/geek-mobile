import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import styles from "@styles/edit.module.less";


interface Props {
    render: boolean,
    edit: boolean;
    onChange: (val:boolean) => void;
}

function EditButton({render, edit, onChange}: Props) {
    const [isEdit, setIsEdit] = useState(edit || false)
    // 监测外部变化edit
    useEffect(()=> {
        setIsEdit(edit)
    },[edit])
    // 内部变化 检测状态变化, 将状态传递到外部, 实现双向数据绑定
    useEffect(()=> {
        onChange(isEdit)
    },[isEdit,onChange])
    return (
        render ? <button className={classNames({
            [styles.active]: isEdit
        })} onClick={() => setIsEdit(!isEdit)}>
            {edit ? '完成' : '编辑'} </button> : null
    );
}

export default EditButton;