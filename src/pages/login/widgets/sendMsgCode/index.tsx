import React, {useEffect, useState} from 'react';
import useCountdown from "@hooks/delayTime";
import {useLazySendCodeQuery} from "@service/authEndpoints";
import {UseFormGetFieldState, UseFormGetValues} from "react-hook-form";
import {LoginFormState} from "@pages/login";
import toast from "react-hot-toast";

interface Props {
    // 获取字段验证状态
    getFieldState: UseFormGetFieldState<LoginFormState>,
    // 获取字段值
    getValues: UseFormGetValues<LoginFormState>
}

function SendCodeMsg({getValues, getFieldState}: Props) {
    // 是否开启倒计时
    const [start, setStart] = useState(false)
    const [time, reset] = useCountdown(10, start)
    // 发送请求
    const [sendCode] = useLazySendCodeQuery()
    // 点击倒计时按钮
    const sendCodeMsgButton = () => {
        // 如果已经发送请求 阻止运行
        if (start) return;
        // 获取手机号字段的验证错误信息, 通过判断该值是否为 undefined 检测用户是否输入了正确的手机号
        const {invalid} = getFieldState('mobile')
        if (invalid) return
        // 重置倒计时 若上一次为0，重新开始
        reset()
        // 开启倒计时
        setStart(true)
        // 获取手机号
        // 发送请求
        sendCode(getValues('mobile')).unwrap().then((res) => {
            toast.success('验证码发送成功')
        }).catch((e) => {
            toast.error(e.data.message)
        })
    }
    useEffect(() => {
        if (time === 0) {
            setStart(false)
        }
    }, [time])
    return (
        <button onClick={sendCodeMsgButton} type="button"> {start ? `剩余${time}秒` : '发送验证码'} </button>
    );
}

export default SendCodeMsg;