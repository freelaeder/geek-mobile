// src/pages/search/widgets/suggestion/index.tsx
import React from "react";
import styles from "@styles/search.module.less";
import SuggestionItem from "@pages/search/widgets/suggestion/suggestionItem";

interface Props {
    suggestions: { origin: string; name: string }[];
}
export default function Suggestion({suggestions}:Props) {
    return (
        <ul className={styles.suggest}>
            {
                suggestions && suggestions.map(item => <SuggestionItem item={item} key={item.origin} /> )
            }


        </ul>
    );
}