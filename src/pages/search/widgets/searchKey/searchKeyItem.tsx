import React from 'react';
import {GeekIcon} from "@shared/geekIcon";
import {removeOneKey, SearchKeyType} from "@slice/searchKey";
import {useNavigate} from "react-router-dom";
import {useTypedDispatch} from "@store/index";


interface Props {
    item: SearchKeyType
}

function SearchKeyItem({item}: Props) {
    const navigate = useNavigate()
    const dispatch = useTypedDispatch()
    return (

        <li onClick={() => navigate(`/search/${item.name}`)}>
            {item.name} <GeekIcon onClick={(event) => {
            event.stopPropagation()
            dispatch(removeOneKey({id: item.id}))
        }} type={"iconbtn_essay_close"}/>
        </li>
    );
}

export default SearchKeyItem;