import React from 'react';
import {GeekIcon} from "@shared/geekIcon";
import {Link, useNavigate} from "react-router-dom";
import styles from '@styles/news.module.less'
import classNames from "classnames";
import dayjs from "dayjs";


interface Props {
    news: News
}

function NewItem({news}: Props) {
    const navigate = useNavigate()
    return (
        <li className={classNames({
            [styles.hasOnePicture]: news.cover.type === 1,
            [styles.hasMorePicture]: news.cover.type > 1
        })}>
            <div onClick={() => {navigate(`/article/${news.art_id}`)} } className={styles.main}>
                <Link className={styles.title} to={"/"}>
                    {news.title}
                </Link>
                {
                    news.cover.type >= 1 && (
                        <Link className={styles.imgContainer} to={'/'}>
                            {
                                news.cover.images.map((item, index) => (
                                    <img key={index} src={item} alt="item"/>
                                ))
                            }
                        </Link>
                    )
                }
            </div>
            <div className={styles.secondary}>
                <Link to={"/"} className={styles.meta}>
                    <span className={styles.item}>{news.aut_name}</span>
                    <span className={styles.item}> {news.comm_count} 评论</span>
                    <span className={styles.item}>{dayjs().to(dayjs(news.pubdate))} </span>
                </Link>
                <GeekIcon type={"iconbtn_channel_close"} className={styles.close}/>
            </div>
        </li>
    );
}

export default NewItem;