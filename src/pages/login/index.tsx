import React from 'react';
import Header from "@shared/header";
import Back from "@shared/back";
import styles from '@styles/login.module.less'
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface LoginFormState {
    code: string;
    mobile: string
}

const schema = z.object({
    mobile: z.string({
        required_error: '请输入手机号',
        invalid_type_error: '类型必须是数字哦'
    }).min(1, '请输入手机号').regex(/^1[3-9]\d{9}$/, "手机号格式错误"),
    code: z.string({
        invalid_type_error: "验证码参数类型错误",
        required_error: "请检查字段名称是否正确",
    }).length(6, "验证码格式错误"),
})

function LoginPage() {

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormState>({
        // 在用户输入的过程中实时触发验证
        mode: 'onChange',
        // 设置表单验证器
        resolver: zodResolver(schema),
        // 默认值
        defaultValues: {mobile: '', code: ''}

    })

    const updateForm:SubmitHandler<LoginFormState> = (state) => {
        console.log(state)
    }

    return (
        <div className={styles.login_page}>
            <Header title={""} left={<Back/>}/>
            <h2>短信登录</h2>
            <form onSubmit={handleSubmit(updateForm)}>
                <div className={styles.form_item}>
                    <input {...register('mobile')} type="text" placeholder=" 请输入手机号"/>
                    {
                        errors.mobile && <p className={styles.error_message}>{errors.mobile.message}</p>
                    }
                </div>
                <div className={styles.form_item}>
                    <input {...register('code')} type="text" placeholder="请输入验证码"/>
                    {/* 如果验证码正在发送, className={styles.active} */}
                    <button type="button">发送验证码</button>
                    {
                        errors.code && <p className={styles.error_message}>{errors.code.message}</p>
                    }

                </div>
                <button className={styles.login_button}>登录</button>
            </form>
        </div>
    );
}


export default LoginPage;