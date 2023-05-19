import React from 'react';
import styles from "@styles/article.module.less";
import {GeekIcon} from "@shared/geekIcon";
import dayjs from "dayjs";

interface Props {
    comment:ArticleComment
}
function CommentItem({comment}:Props) {
    return (
        <div className={styles.item}>
            <div className={styles.commentator}>
                <div className={styles.avatar}>
                    <img
                        src={comment.aut_photo}
                        alt=""
                    />
                    <span>{comment.aut_name}</span>
                </div>
                <div className={styles.like}>
                    <span>{comment.like_count}</span>
                    <GeekIcon type={"iconbtn_like"}/>
                </div>
            </div>
            <div className={styles.discuss}>
                {comment.content}
            </div>
            <div className={styles.bottom}>
                <div className={styles.reply}>
                    <button>{comment.reply_count}回复 &gt;</button>
                    <span>{dayjs().to(dayjs(comment.pubdate))}</span>
                </div>
                <GeekIcon type={"iconbtn_essay_close"} className={styles.close}/>
            </div>
        </div>
    );
}

export default CommentItem;