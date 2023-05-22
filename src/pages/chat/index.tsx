// src/pages/chat/index.tsx
import styles from "@styles/chat.module.less";
import Header from "@shared/header";
import Back from "@shared/back";
import {GeekIcon} from "@shared/geekIcon";
import {useEffect, useRef, useState} from "react";
import {useTypedSelector} from "@store/index";
import {selectToken} from "@slice/credentials";
import {io, Socket} from "socket.io-client";

interface Message {
    type: 'robot' | 'user',
    message:string
}
export default function Chat() {

    // 创建消息数组
    const [mes,setMes] = useState<Message[]>([])
    const token  = useTypedSelector(selectToken)
    // 用户输入
    const [con,setCon] = useState('')
    const ref = useRef<Socket | undefined>(undefined)

    // 创建ws链接
    useEffect(() => {
        // 建立连接
        const socket = io("http://toutiao.itheima.net", {
            query: {
                token,
            },
            transports: ["websocket"],
        });
        ref.current = socket
        // 监听连接成功
        socket.on('connect',()=> {
            console.log('连接成功')
            setMes([
                { type: "robot", message: "您好，小智同学为您服务。" },
                { type: "robot", message: "请问有什么可以帮您" },
            ])

        })
        // 监听服务端响应信息
        socket.on("message", (response) => {
            // 将消息添加到本地消息列表
            setMes((messages) => [
                ...messages,
                { type: "robot", message: response.msg },
            ]);
        });
        // 监听断开连接
        socket.on("disconnect", () => {
            console.log("websocket 断开连接");
        });

        return () => {
            // 断开连接
            socket.disconnect();
        }

    },[token])

    const  sendMessage = () => {
        // 保存本地
        setMes([...mes,{type:'user',message:con}])
        // 向服务器发送消息
        ref.current?.emit('message',{
            msg:con,
            timestamp:Date.now() + ''
        })
        setCon('')
    }


    return (
        <div className={styles.chat}>
            <Header title={"小智同学"} left={<Back />} />
            <ul className={styles.content}>
                {
                    mes.map(item => {
                        if(item["type"] === 'robot'){
                            return (
                                <li>
                                    <div className={styles.avatar}>
                                        <GeekIcon type={"iconbtn_xiaozhitongxue"} />
                                    </div>
                                    <div className={styles.say}>{item.message}</div>
                                </li>
                            )
                        }else {
                            return (
                                <li className={styles.customer}>
                                    <div className={styles.avatar}>
                                        <img
                                            src={"http://toutiao.itheima.net/images/user_head.jpg"}
                                            alt={""}
                                        />
                                    </div>
                                    <div className={styles.say}>{item.message}</div>
                                </li>
                            )
                        }
                    })
                }


            </ul>
            <div className={styles.footer}>
                <div className={styles.edit}>
                    <GeekIcon type={"iconbianji"} />
                    <input value={con} onChange={event => setCon(event.currentTarget.value)} type="text" placeholder="请描述你的问题" />
                </div>
                <button onClick={sendMessage}>发送</button>
            </div>
        </div>
    );
}