import {GeekIcon} from "@shared/geekIcon";
import styles from '@styles/article.module.less'
import {useCollectArticleMutation, useUnCollectArticleMutation} from "@service/articleEndpoints";

interface Props {
    // 文章id
    id: string;
    // 文章是否收藏
    isCollect: boolean;
}


export default function Collect({id,isCollect}:Props){
    // 收藏
    const [collectArticle] = useCollectArticleMutation();
    // 取消收藏
    const [unCollectArticle] = useUnCollectArticleMutation();
    // 收藏、取消收藏文章
    const onCollectClick = () => {
        // 收藏、取消收藏
        isCollect ? unCollectArticle(id) : collectArticle(id);
    };
    return (
        <div className={styles.item} onClick={ (event) => {
            event.stopPropagation();
            onCollectClick();

        } }>
            <GeekIcon type={isCollect ? "iconbtn_collect_sel" : "iconbtn_collect"} />
            <span>收藏</span>
        </div>
    );
}