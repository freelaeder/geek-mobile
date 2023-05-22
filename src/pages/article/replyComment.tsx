// src/pages/article/widgets/replyComment/index.tsx
import styles from "@styles/article.module.less";
import {FillinOutline} from "antd-mobile-icons";
import Slide, {SlideRef} from "@pages/slide";
import {useRef, useState} from "react";
import Textarea from "react-textarea-autosize";
import {GeekIcon} from "@shared/geekIcon";
import Header from "@shared/header";
import {useParams} from "react-router-dom";
import {usePublishCommentsMutation} from "@service/commentEndpoints";

interface Props {
    // 评论 id
    id: string;
    // 评论作者昵称
    name: string;
    // 重置评论回复列表
    resetReplyComments(): void;
}

export default function ReplyComment({id, name,resetReplyComments}: Props) {
    // 弹框引用对象
    const slideRef = useRef<SlideRef | null>(null);
    // 用于记录用户在文本域中输入的内容
    const [content, setContent] = useState("");
    // 获取用于回复评论的方法
    const [replyComment] = usePublishCommentsMutation();
    // 获取路由参数, 通过路由参数获取文章id
    const params = useParams();
    return (
        <>
            <div onClick={slideRef.current?.onRender} className={styles.sofa} style={{width: "71vw"}}>
                <FillinOutline className={styles.icon}/>
                <span>写回复</span>
                <Slide ref={slideRef} direction={"toTop"}>
                    <div className={styles.publish}>
                        <Header
                            title="回复评论"
                            left={
                                <GeekIcon
                                    type="iconfanhui"
                                    style={{width: "4.5333vw", height: "4.5333vw"}}
                                    onClick={() => slideRef.current?.onClose()}
                                />
                            }
                            right={
                                <button
                                    onClick={() => {
                                        // 回复评论
                                        replyComment({ target: id, content, art_id: params.id })
                                            .unwrap()
                                            .then(() => {
                                                // 清空用于在文本框中输入的内容
                                                setContent("");
                                                // 关闭发表评论回复的弹框
                                                slideRef.current?.onClose();
                                                // 重置评论回复列表
                                                resetReplyComments();
                                            });
                                    }}
                                    className={styles.pubBtn}
                                >
                                    发表
                                </button>
                            }
                        />
                        <Textarea
                            minRows={4}
                            autoFocus
                            placeholder={`@${name}`}
                            className={styles.textarea}
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        />
                    </div>
                </Slide>
            </div>
        </>
    );
}