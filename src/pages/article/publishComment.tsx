// src/pages/article/widgets/publishComment/index.tsx
import styles from "@styles/article.module.less";
import { FillinOutline } from "antd-mobile-icons";
import { useRef } from "react";
import Header from "@shared/header";
import {GeekIcon} from "@shared/geekIcon";
import Textarea from "react-textarea-autosize";
import Slide, {SlideRef} from "@pages/slide";

interface Props {
    // 文章 id
    id: string;
    // 重置评论列表
    resetComments(): void;
}

export default function PublishComment({ id, resetComments }: Props) {
    const slideRef = useRef<SlideRef | null>(null);
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
                        right={<button className={styles.pubBtn}>发表</button>}
                    />
                    <Textarea
                        minRows={4}
                        autoFocus
                        placeholder={"说点什么"}
                        className={styles.textarea}
                    />
                </div>
            </Slide>
        </>
    );
}