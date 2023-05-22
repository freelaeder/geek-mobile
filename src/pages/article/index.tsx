// src/pages/article/index.tsx
import React, {useCallback, useEffect, useRef, useState} from "react";
import Back from "@shared/back";
import {GeekIcon} from "@shared/geekIcon";
import {FillinOutline} from "antd-mobile-icons";
import {Skeleton} from "antd-mobile";
import styles from "@styles/article.module.less";
import {useParams} from "react-router-dom";
import {useRequestArticleQuery} from "@service/articleEndpoints";
import dayjs from "dayjs";
import classNames from "classnames";
import {useInView} from "react-intersection-observer";
import 'highlight.js/styles/atom-one-dark.css'
import Followbtn from "@pages/article/followbtn";
import Collect from "@pages/article/collect";
import LikeArticle from "@pages/article/likeArticle";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {clearComment, commentSelectors, saveComment} from "@slice/commentSlice";
import {useLazyRequestCommentsQuery} from "@service/commentEndpoints";
import CommentItem from "@pages/article/commentItem";
import Infinite from "@shared/infinite";
import PublishComment from "@pages/article/publishComment";

export default function Article() {
    const id = useParams().id!
    const {data, isSuccess, isLoading} = useRequestArticleQuery(id)
    // 是否显示头部默认不显示
    // 是否当前显示
    // ref: 绑定要监听的进入可视区的元素
    // inView: 布尔值, 元素是否进入可视区
    const {ref, inView} = useInView();
    // 内容盒子
    const articleRef = useRef<HTMLDivElement | null>(null)
    // 是否显示 评论盒子 false 不显示
    // 用于记录是否显示评论区域
    const [showComment, setShowComment] = useState(false);
    // 用于获取评论元素对象
    const commentRef = useRef<HTMLDivElement | null>(null);

    // 获取评论列表数据
    const allComments = useTypedSelector(commentSelectors.selectAll)
    // 评论分页偏移量
    const [offset, setOffset] = useState<string | undefined>();
    // 是否有更多评论可以加载
    const [hasMore, setHasMore] = useState(true);
    // 发送请求获取评论
    const [requestComment,{data:commentResponse}]  = useLazyRequestCommentsQuery()
    const dispatch  = useTypedDispatch()
    // 用于加载评论
    const loadMore = () => {
        return requestComment({ type:'a',source:id,limit:10,offset }).unwrap().then( res => {
            // 保存评论列表
            dispatch(saveComment(res.data.results))
            // 如果不两者相等说明没有更多数据可以加载
            setHasMore(res.data.end_id !== res.data.last_id);
            // 设置分页偏移量
            setOffset(res.data.last_id);
        })
    }

    // 重置评论列表
    const resetComments = useCallback(() => {
        setOffset(undefined);
        setHasMore(true);
        dispatch(clearComment());
    }, [dispatch]);

    // 检测是否显示评论区域
    useEffect(() => {
        // 显式评论区域
        if (showComment) {
            articleRef.current?.scrollTo({
                top: commentRef.current?.offsetTop,
                behavior: "smooth",
            });
        } else {
            // 显示内容区域
            articleRef.current?.scrollTo({top: 0, behavior: "smooth"});
        }
    }, [showComment]);
    if (!isSuccess) return null
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Back/>
                    {
                        !inView && (
                            <div className={styles.center}>
                                <img
                                    src={data.data.aut_photo}
                                    alt=""
                                />
                                <span>{data.data.aut_name}</span>
                                <button>{data.data.like_count}关注</button>
                            </div>
                        )
                    }
                </div>
                <GeekIcon type={"icongengduo"} className={styles.more}/>
            </div>
            <div ref={articleRef} className={styles.article}>
                {
                    isLoading && (
                        <div className={styles.skeleton}>
                            <Skeleton.Paragraph lineCount={2} animated/>
                            <Skeleton.Paragraph lineCount={3} animated/>
                            <Skeleton.Paragraph lineCount={5} animated/>
                            <Skeleton.Paragraph lineCount={2} animated/>
                            <Skeleton.Paragraph lineCount={4} animated/>
                        </div>
                    )
                }
                {
                    isSuccess && (
                        <>
                            <h2 className={styles.title}>
                                {data.data.title}
                            </h2>
                            <div className={styles.meta}>
                                <span>
                                    {
                                        dayjs(data.data.pubdate).format('MM-DD')
                                    }
                                </span>
                                <span>{data.data.read_count} 阅读</span>
                                <span>{data.data.comm_count} 评论</span>
                            </div>
                            <div ref={ref} className={styles.author}>
                                <div className={styles.avatar}>
                                    <img
                                        src={data.data.aut_photo}
                                        alt=""
                                    />
                                    <span>{data.data.aut_name}</span>
                                </div>
                                <div className={classNames({[styles.follow]: !data.data.is_followed})}>
                                    <Followbtn userId={data.data.art_id} isFollow={data.data.is_followed}/>
                                </div>
                            </div>
                            <div  className={styles.content}>
                                <div dangerouslySetInnerHTML={{__html: data.data.content}}></div>
                                <div className={styles.footnote}>文章发布于：{data.data.pubdate}</div>
                            </div>

                            <div ref={commentRef} className={styles.comment}>
                                <h4 className={styles.title}>全部评论 ({data.data.comm_count})</h4>
                                {
                                    data.data.comm_count === 0 && (
                                        <div className={styles.noReply}>
                                            {/*<img src={require("@images/none.png")} alt="" />*/}
                                            <span>还没有人评论哦</span>
                                        </div>
                                    )
                                }
                                {
                                    allComments.map(item => <CommentItem key={item.com_id} comment={item } /> )
                                }
                                <Infinite hasMore={hasMore} loadMore={loadMore} />
                            </div>


                        </>
                    )
                }
            </div>
            <div className={styles.bar}>
                <PublishComment id={data.data.art_id} resetComments={resetComments} />
                <div  className={styles.icons}>
                    <div onClick={() => setShowComment(prevState => !prevState)} className={styles.item}>
                        <GeekIcon type={"iconbtn_comment"}/>
                        <span>评论</span>
                    </div>
                    <LikeArticle id={data.data.art_id} like={data.data.attitude} />
                    {
                        isSuccess && (
                            <Collect id={data.data.art_id } isCollect={data.data.is_collected}  />
                        )
                    }

                    <div className={styles.item}>
                        <GeekIcon type={"iconbtn_share"}/>
                        <span>分享</span>
                    </div>
                </div>
            </div>
        </>
    );
}