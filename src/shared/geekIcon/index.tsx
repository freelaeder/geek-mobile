import React from "react";

interface Props {
    type: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<SVGSVGElement>) => void
}


export const GeekIcon = ({type, className, onClick, style}: Props) => {

    return (
        <svg onClick={onClick} className={className} style={style}>
            <use xlinkHref={`#${type}`}></use>
        </svg>
    )
}