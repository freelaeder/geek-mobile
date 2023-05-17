// src/pages/searchResult/index.tsx
import React, {useEffect, useRef, useState} from "react";
import Header from "@shared/header";
import Back from "@shared/back";
import styles from "@styles/news.module.less";
import css from "@styles/search-reault.module.less";
import {Link, useParams} from "react-router-dom";
import {GeekIcon} from "@shared/geekIcon";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {clearResults, saveResults, searchSelectors} from "@slice/searchResultSlice";
import {searchEndpoints, useLazyRequestResultQuery} from "@service/searchEndpoints";
import NewItem from "@pages/home/widgets/news/newItem";
import Infinite from "@shared/infinite";

export default function SearchResult() {
    // 获取路径中的params
    const {key} = useParams()
    // 获取全部的搜索结果
    const searchResultList = useTypedSelector(searchSelectors.selectAll)
    const dispatch = useTypedDispatch()
    // 获取搜索请求
    const [search] = useLazyRequestResultQuery()
    // 用于存储本地存储的搜索结果的数量
    const newAccount = useTypedSelector(searchSelectors.selectTotal)
    // 用于记录服务端响应的搜索结果数量
    const totalRef = useRef(0);
    // 用于控制是否还有更多数据可以加载
    const [hasMore, setHasMore] = useState(true);
    // 用于记录页面
    const [page, setPage] = useState(1);

    useEffect(()=> {
        // 每次进入清空之前的搜索结果
        dispatch(clearResults())
    },[dispatch])

    // 加载更多
    const loadMore = () => {
        return search({
            page,
            per_page: 10,
            q: key!
        }).unwrap().then(res => {
            // 保存本地
            dispatch(saveResults(res.data.results))
            // 更新页码
            setPage(x => x + 1)
            // 记录服务端响应的搜索结果总共的数量
            totalRef.current = res.data.total_count
            console.log(totalRef.current,'totalref')
            console.log(newAccount,'newAccount')
            // 是否还有更多 总数 > 现在本地
            setHasMore(totalRef.current > newAccount )
        })
    }

    return (

        <div className={css.result}>
            <Header title={"搜索结果"} left={<Back/>}/>
            <ul className={styles.news}>
                {
                    searchResultList.map(item => <NewItem news={item} key={item.art_id}/>)
                }
            </ul>
            <Infinite hasMore={hasMore} loadMore={loadMore}/>
        </div>
    );
}