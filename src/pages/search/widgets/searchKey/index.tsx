import React from 'react';
import styles from "@styles/search.module.less";
import SearchKeyItem from "@pages/search/widgets/searchKey/searchKeyItem";
import {GeekIcon} from "@shared/geekIcon";
import {useTypedDispatch, useTypedSelector} from "@store/index";
import {clearKey, searchKeySelectors} from "@slice/searchKey";

function SearchKey() {
    const searchKeyList = useTypedSelector(searchKeySelectors.selectAll)
    const dispatch = useTypedDispatch()
    return (
        <ul className={styles.history}>
            <li>
                历史记录
                <GeekIcon onClick={() => dispatch(clearKey()) } type={"iconbtn_del"}/>
            </li>
            {
                searchKeyList && searchKeyList.map(item => <SearchKeyItem key={item.id} item={item} /> )
            }


        </ul>
    );
}

export default SearchKey;