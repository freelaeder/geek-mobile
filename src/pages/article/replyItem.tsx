// src/pages/article/widgets/replyItem/index.tsx
import styles from "@styles/article.module.less";
import {GeekIcon} from "@shared/geekIcon";

interface Props {
    reply: ArticleComment;
}
export default function ReplyItem({reply}:Props) {
    return (
        <div className={styles.item}>
            <div className={styles.commentator}>
                <div className={styles.avatar}>
                    <img src={reply.aut_photo} alt="" />
                    <span>{reply.aut_name}</span>
                </div>
                <div className={styles.like}>
                    <span>{reply.like_count}</span>
                    <GeekIcon type={"iconbtn_like"} />
                </div>
            </div>
            <div className={styles.discuss}>{reply.content}</div>
        </div>
    );
}