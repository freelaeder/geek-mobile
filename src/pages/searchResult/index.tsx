// src/pages/searchResult/index.tsx
import React from "react";
import Header from "@shared/header";
import Back from "@shared/back";
import styles from "@styles/news.module.less";
import css from "@styles/search-reault.module.less";
import { Link } from "react-router-dom";
import {GeekIcon} from "@shared/geekIcon";

export default function SearchResult() {
    return (
        <div className={css.result}>
            <Header title={"搜索结果"} left={<Back />} />
            <ul className={styles.news}>
                <li>
                    <div className={styles.main}>
                        <Link className={styles.title} to={"/"}>
                            小程序基础核心组件库处理Banner、图片上传、列表刷新
                        </Link>
                    </div>
                    <div className={styles.secondary}>
                        <Link to={"/"} className={styles.meta}>
                            <span className={styles.item}>黑马程序员(改不了)</span>
                            <span className={styles.item}>5评论</span>
                            <span className={styles.item}>4 年内</span>
                        </Link>
                        <GeekIcon type={"iconbtn_channel_close"} className={styles.close} />
                    </div>
                </li>
                <li className={styles.hasOnePicture}>
                    <div className={styles.main}>
                        <Link className={styles.title} to={"/"}>
                            小程序基础核心组件库处理Banner、图片上传、列表刷新
                        </Link>
                        <Link className={styles.imgContainer} to={"/"}>
                            <img
                                src={"http://toutiao.itheima.net/resources/images/73.jpg"}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className={styles.secondary}>
                        <Link to={"/"} className={styles.meta}>
                            <span className={styles.item}>黑马程序员(改不了)</span>
                            <span className={styles.item}>5评论</span>
                            <span className={styles.item}>4 年内</span>
                        </Link>
                        <GeekIcon type={"iconbtn_channel_close"} className={styles.close} />
                    </div>
                </li>
                <li className={styles.hasMorePicture}>
                    <div className={styles.main}>
                        <Link className={styles.title} to={"/"}>
                            小程序基础核心组件库处理Banner、图片上传、列表刷新
                        </Link>
                        <Link className={styles.imgContainer} to={"/"}>
                            <img
                                src={"http://toutiao.itheima.net/resources/images/79.jpg"}
                                alt=""
                            />
                            <img
                                src={"http://toutiao.itheima.net/resources/images/38.jpg"}
                                alt=""
                            />
                            <img
                                src={"http://toutiao.itheima.net/resources/images/10.jpg"}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className={styles.secondary}>
                        <Link to={"/"} className={styles.meta}>
                            <span className={styles.item}>黑马程序员(改不了)</span>
                            <span className={styles.item}>5评论</span>
                            <span className={styles.item}>4 年内</span>
                        </Link>
                        <GeekIcon type={"iconbtn_channel_close"} className={styles.close} />
                    </div>
                </li>
            </ul>
        </div>
    );
}