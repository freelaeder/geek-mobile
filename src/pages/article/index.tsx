// src/pages/article/index.tsx
import React, {useEffect, useRef, useState} from "react";
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

                                <div className={styles.item}>
                                    <div className={styles.commentator}>
                                        <div className={styles.avatar}>
                                            <img
                                                src="http://pic.imeitou.com/uploads/allimg/160616/3-160616224043.jpg"
                                                alt=""
                                            />
                                            <span>Wen Yahui</span>
                                        </div>
                                        <div className={styles.like}>
                                            <span>1090</span>
                                            <GeekIcon type={"iconbtn_like"}/>
                                        </div>
                                    </div>
                                    <div className={styles.discuss}>
                                        现在实现的应该是类似于大脑信号的输出，有没有可能以后实现脑接口信号的输入，从此人类从一代一代知识的传递变成知识的直接下载，学习好累呀。
                                    </div>
                                    <div className={styles.bottom}>
                                        <div className={styles.reply}>
                                            <button>2回复 &gt;</button>
                                            <span>2小时前</span>
                                        </div>
                                        <GeekIcon type={"iconbtn_essay_close"} className={styles.close}/>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.commentator}>
                                        <div className={styles.avatar}>
                                            <img
                                                src="http://pic.imeitou.com/uploads/allimg/160616/3-160616224043.jpg"
                                                alt=""
                                            />
                                            <span>Wen Yahui</span>
                                        </div>
                                        <div className={styles.like}>
                                            <span>1090</span>
                                            <GeekIcon type={"iconbtn_like_sel"}/>
                                        </div>
                                    </div>
                                    <div className={styles.discuss}>
                                        现在实现的应该是类似于大脑信号的输出，有没有可能以后实现脑接口信号的输入，从此人类从一代一代知识的传递变成知识的直接下载，学习好累呀。
                                    </div>
                                    <div className={styles.bottom}>
                                        <div className={styles.reply}>
                                            <button>2回复 &gt;</button>
                                            <span>2小时前</span>
                                        </div>
                                        <GeekIcon type={"iconbtn_essay_close"} className={styles.close}/>
                                    </div>
                                </div>
                            </div>


                        </>
                    )
                }
            </div>
            <div className={styles.bar}>
                <div className={styles.sofa}>
                    <FillinOutline className={styles.icon}/>
                    <span>去评论</span>
                </div>
                <div onClick={() => setShowComment(prevState => !prevState)} className={styles.icons}>
                    <div className={styles.item}>
                        <GeekIcon type={"iconbtn_comment"}/>
                        <span>评论</span>
                    </div>
                    <div className={styles.item}>
                        <GeekIcon type={"iconbtn_like2"}/>
                        <span>点赞</span>
                    </div>
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