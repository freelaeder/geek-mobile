import React, {useEffect} from 'react';
import styles from "@styles/article.module.less";
import {GeekIcon} from "@shared/geekIcon";
import {useLikeArticleMutation, useUnLikeArticleMutation} from "@service/articleEndpoints";
import toast from "react-hot-toast";

interface Props {
    id: string;
    like: number
}


function LikeArticle({id, like}: Props) {
    const [likeArticle, {isSuccess}] = useLikeArticleMutation()
    const [unLikeArticle, {isSuccess: unisSuccess}] = useUnLikeArticleMutation()

    const likeBtn = () => {
        if (typeof id === 'undefined' || typeof like === 'undefined') return
        if (like === -1) {
            likeArticle(id)
        } else if (like === 1) {
            unLikeArticle(id)
        }
    }
    useEffect(() => {
        if (isSuccess) toast.success('点赞成功')
    }, [
        isSuccess
    ])
    useEffect(() => {
        if (unisSuccess) toast.success('取消点赞')
    }, [unisSuccess])

    return (
        <div onClick={likeBtn} className={styles.item}>
            <GeekIcon type={like === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'}/>
            <span>点赞</span>
        </div>
    );
}

export default LikeArticle;