// src/pages/article/widgets/publishComment/index.tsx
import styles from "@styles/article.module.less";
import { FillinOutline } from "antd-mobile-icons";
import {useRef, useState} from "react";
import Header from "@shared/header";
import {GeekIcon} from "@shared/geekIcon";
import Textarea from "react-textarea-autosize";
import Slide, {SlideRef} from "@pages/slide";
import {usePublishCommentsMutation} from "@service/commentEndpoints";
import toast from "react-hot-toast";

interface Props {
    // 文章 id
    id: string;
    // 重置评论列表
    resetComments(): void;
}

export default function PublishComment({ id, resetComments }: Props) {
    const slideRef = useRef<SlideRef | null>(null);
    // 用于发送发表评论的请求
    const [publishComment] = usePublishCommentsMutation();
    // 用于记录用户在文本域中输入的评论内容
    const [content, setContent] = useState("");
    return (
        <>
            <div className={styles.sofa} onClick={() => slideRef.current?.onRender()}>
                <FillinOutline className={styles.icon} />
                <span>去评论</span>
            </div>
            <Slide ref={slideRef} direction={"toTop"}>
                <div className={styles.publish}>
                    <Header
                        title="发表评论"
                        left={
                            <GeekIcon
                                type="iconfanhui"
                                style={{ width: "4.5333vw", height: "4.5333vw" }}
                                onClick={() => slideRef.current?.onClose()}
                            />
                        }
                        right={<button onClick={()=> {
                            publishComment({ target: id, content })
                                .unwrap()
                                .then(() => {
                                    // 关闭弹框
                                    slideRef.current?.onClose();
                                    // 用户提示
                                    toast.success("评论发表成功");
                                    // 清空用户在文本框中输入的内容
                                    setContent("");
                                    // 清空本地评论列表
                                    resetComments();
                                });


                        } } className={styles.pubBtn}>发表</button>}
                    />
                    <Textarea
                        minRows={4}
                        autoFocus
                        placeholder={"说点什么"}
                        className={styles.textarea}
                        value={content} onChange={(event) => setContent(event.target.value)}
                    />
                </div>
            </Slide>
        </>
    );
}