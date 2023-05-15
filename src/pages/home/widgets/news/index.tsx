import styles from "@styles/news.module.less";
import NewItem from "@pages/home/widgets/news/newItem";
import {useParams} from "react-router-dom";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {useLazyRequestNewsQuery} from "@service/newsEndpoints";
import {useEffect} from "react";
import {initialChannel, saveNews, selectChannelNews} from "@slice/newsSlice";
import Infinite from "@shared/infinite";

export default function News() {
    const cid = useParams().cid!
    const dispatch = useTypedDispatch()
    const [requestNews] = useLazyRequestNewsQuery()
    // 获取新闻列表
    // 获取新闻列表
    const channelNews = useTypedSelector(selectChannelNews(cid));
    // 发送请求
    useEffect(() => {
        // 初始化本地频道对应的新闻列表数据
        if (typeof channelNews === 'undefined') {
            // 频道本地数据初始化
            dispatch(initialChannel(cid))
        }
    }, [channelNews, cid, dispatch])

    // 新闻列表加载方法
    const loadMore = () => {
        return requestNews({
            channel_id: Number(cid),
            // 由于 channelNews 存在才会渲染无限列表加载组件
            // 所以此处 channelNews 一定不为 undefined
            timestamp: channelNews!.pre_timestamp,
        }).unwrap().then((res) => {
            // 获取服务端返回的新闻列表和下一页数据对应的时间戳
            const {pre_timestamp, results} = res.data
            // 保存当前加载的新闻列表
            dispatch(saveNews({
                cid,
                results,
                pre_timestamp
            }))
        })
            .catch((e) => {
                console.log(e)
            })
    }
    // loadMore()

    return (
        <>
            <ul className={styles.news}>
                {channelNews?.results.map((news) => (
                    <NewItem news={news} key={news.art_id} />
                ))}
            </ul>
            {channelNews && (
                <Infinite
                    hasMore={channelNews.pre_timestamp !== null}
                    loadMore={loadMore}
                />

            )}
        </>


    );
}