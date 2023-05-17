// src/pages/search/index.tsx
import React, {useEffect, useMemo, useState} from "react";
import styles from "@styles/search.module.less";
import Back from "@shared/back";
import {GeekIcon} from "@shared/geekIcon";
import Suggestion from "@pages/search/widgets/suggestion";
import {useDebounce} from "use-debounce";
import {searchEndpoints, useLazyRequestSuggestionQuery} from "@service/searchEndpoints";
import {useTypedDispatch} from "@store/index";
import SearchKey from "@pages/search/widgets/searchKey";
import {useNavigate} from "react-router-dom";
import {addKey} from "@slice/searchKey";

export default function Search() {
    // 用户输入的值
    const [key, setKey] = useState('')
    const dispatch = useTypedDispatch()
    // 延迟之后的值
    const [delazyValue] = useDebounce(key, 1000)
    const [requestSuggestion, {data: suggestion}] = useLazyRequestSuggestionQuery()
    // 监听防抖值的变化
    useEffect(() => {
        if (delazyValue.trim().length > 0) {
            requestSuggestion(delazyValue)
        } else {
            // 否则清空已有联想值列表
            dispatch(searchEndpoints.util.resetApiState());
        }
    }, [delazyValue, dispatch, requestSuggestion])
    // 查找联想词列表是否存在
    const hasSuggestion = useMemo<boolean>(() => {
        if (typeof suggestion === 'undefined') return false;
        return suggestion.data.options.filter(item => item).length > 0
    }, [suggestion])
    // 创建用于匹配搜索关键字的正则对象
    const reg = useMemo(() => {
        return new RegExp(delazyValue, "gi");
    }, [delazyValue]);
    const navigate = useNavigate()
    return (
        <div className={styles.search_page}>
            <div className={styles.header}>
                <Back/>
                <div className={styles.input}>
                    <GeekIcon type={"iconbtn_search"}/>
                    <input value={key} onChange={(event) => setKey(event.currentTarget.value)} type="search"
                           placeholder={"请输入关键字搜索"}/>
                </div>
                <span onClick={() => {
                    if(delazyValue.trim().length > 0) {
                        dispatch(addKey({name: delazyValue}));
                        navigate(`/search/${delazyValue}`)
                    }

                }
                } className={styles.search_btn}>搜索</span>
            </div>
            {
                hasSuggestion && (
                    <Suggestion suggestions={suggestion!.data.options
                        .filter(item => item).map(item => ({
                            origin: item,
                            name: item.replace(reg, (str) => `<span class="search-span" >${str}</span>`)
                        }))
                    }/>
                )
            }
            {
                !hasSuggestion && < SearchKey/>
            }


        </div>
    );
}