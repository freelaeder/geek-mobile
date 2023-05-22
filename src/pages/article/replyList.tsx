// src/pages/article/widgets/replyList/index.tsx
import Header from "@shared/header";
import {GeekIcon} from "@shared/geekIcon";
import dayjs from "dayjs";
import styles from "@styles/article.module.less";
import classNames from "classnames";
import React, {useCallback, useEffect, useState} from "react";
import { SlideRef } from "@pages/slide";
import ReplyItem from "@pages/article/replyItem";
import ReplyComment from "@pages/article/replyComment";
import Collect from "@pages/article/collect";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {clearReplyComments, replaySelectors, saveReplyComments} from "@slice/reply";
import {useLazyRequestCommentsQuery} from "@service/commentEndpoints";
import Infinite from "@shared/infinite";

interface Props {
    comment: ArticleComment;
    slideRef: React.RefObject<SlideRef | null>;
    resetComments(): void;
}

export default function ReplyList({ comment, slideRef,resetComments }: Props) {
    // 获取用于请求评论回复列表的方法
    const [requestComments, { data }] = useLazyRequestCommentsQuery();
    // 获取 dispatch 方法
    const dispatch = useTypedDispatch();
    // 获取本地评论回复列表
    const replyComments = useTypedSelector(replaySelectors.selectAll);
    // 用于获取评论回复列表
    const loadReplyComments = useCallback(() => {
        // 发送请求获取评论回复列表
        requestComments({ type: "c", source: comment.com_id })
            .unwrap()
            .then((response) => {
                // 保存评论回复列表
                dispatch(saveReplyComments(response.data.results));
            });
    }, [comment.com_id, dispatch, requestComments]);

    useEffect(() => {
        // 发送请求获取评论回复列表
        loadReplyComments();
    }, [loadReplyComments]);
    // 重新获取评论回复列表
    const resetReplyComments = () => {
        setOffset(undefined);
        setHasMore(true);
        dispatch(clearReplyComments());
    };
    // 偏移量
    const [offset, setOffset] = useState<string | undefined>();
    // 每页数据条数
    const [limit] = useState(10);
    // 是否还有更多数据
    const [hasMore, setHasMore] = useState(true);
    // 用于获取评论回复列表
    const loadMore = () => {
        // 发送请求获取评论回复列表
        return requestComments({ type: "c", source: comment.com_id, offset, limit })
            .unwrap()
            .then((response) => {
                // 保存评论回复列表
                dispatch(saveReplyComments(response.data.results));
                // 如果两者不相等说明还有更多数据可以加载
                setHasMore(response.data.end_id !== response.data.last_id);
                // 设置页码偏移量
                setOffset(response.data.last_id);
            });
    };

    return (
        <>
            <Header
                title={`${data?.data.total_count}条回复`}
                left={
                    <GeekIcon
                        type={"iconfanhui"}
                        style={{ width: "4.5333vw", height: "4.5333vw" }}
                        onClick={() => {
                            // 关闭弹层
                            slideRef.current?.onClose();
                            // 清空本地评论回复列表
                            dispatch(clearReplyComments());
                            // 重新获取评论列表
                            resetComments()

                        }}
                    />
                }
            />
            <div className={classNames(styles.article, styles.replyList)}>
                <div className={styles.comment}>
                    <div className={styles.item}>
                        <div className={styles.commentator}>
                            <div className={styles.avatar}>
                                <img src={comment.aut_photo} alt="" />
                                <span>{comment.aut_name}</span>
                            </div>
                            <button className={styles.attention}>关注</button>
                        </div>
                        <div className={styles.discuss}>{comment.content}</div>
                        <div className={styles.bottom}>
                            <div className={styles.reply}>
                                <span>{dayjs().to(dayjs(comment.pubdate))}</span>
                            </div>
                            <div className={styles.like}>
                                <span>{comment.like_count}</span>
                                <GeekIcon type={"iconbtn_like"} />
                            </div>
                        </div>
                    </div>
                    <h4 className={styles.title}>全部评论 ({data?.data.total_count})</h4>
                    {replyComments.map((reply) => (
                        <ReplyItem key={reply.com_id} reply={reply} />
                    ))}
                    <Infinite hasMore={hasMore} loadMore={loadMore} />
                </div>
            </div>
            <div className={styles.bar}>
                <ReplyComment resetReplyComments={resetReplyComments} id={comment.com_id} name={comment.aut_name} />
                <div className={styles.icons}>
                    <Collect isCollect={false} id={""} />
                    <div className={styles.item}>
                        <GeekIcon type={"iconbtn_share"} />
                        <span>分享</span>
                    </div>
                </div>
            </div>
        </>
    );
}