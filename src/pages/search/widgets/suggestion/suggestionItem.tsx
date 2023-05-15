import React from 'react';
import {GeekIcon} from "@shared/geekIcon";


interface Props {
    item:{
        origin: string; name: string
    }
}
function SuggestionItem({item:{name}}:Props) {
    return (
        <li>
            <GeekIcon type={"iconbtn_search"} /> {name}
        </li>
    );
}

export default SuggestionItem;