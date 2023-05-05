import React from "react";
import styles from '@styles/header.module.less'

interface Props {
    left: React.ReactElement;
    right?: React.ReactElement;
    title?: string;
    className?: string
}

export default function Header({className, left, title, right}: Props) {

    return (
        <div className={`${styles.container} ${className}`}>
            {left}
            <div className={styles.title}>{title}</div>
            {right}
        </div>
    )
}