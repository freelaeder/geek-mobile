import React from 'react';
import {GeekIcon} from "@shared/geekIcon";
import {useNavigate} from "react-router-dom";
import {useTypedDispatch} from "@store/index";
import {addKey} from "@slice/searchKey";


interface Props {
    item:{
        origin: string; name: string
    }
}
function SuggestionItem({item:{name,origin}}:Props) {
    const navigate =useNavigate()
    const dispatch = useTypedDispatch()
    return (
        <li onClick={() => {
            dispatch(addKey({name:origin}));
            navigate(`/search/${origin}`)
        } } >
            <GeekIcon type={"iconbtn_search"} />
            <div dangerouslySetInnerHTML={{__html:name}}></div>
        </li>
    );
}

export default SuggestionItem;