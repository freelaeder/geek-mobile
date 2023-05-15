// src/shared/tabbar/index.tsx
import {Link, useLocation, useParams} from "react-router-dom";
import {GeekIcon} from "@shared/geekIcon";
import styles from '@styles/tabbar.module.less'
import classNames from "classnames";

export default function Tabbar() {

    const location = useLocation()
    const {cid} = useParams()
    const isHome = typeof cid !== 'undefined'
    const isQuestion = location.pathname === '/question'
    const isVideo = location.pathname === '/video'
    const isMine = location.pathname === '/mine'
    return (
        <div className={styles.tabbar}>
            <Link to="/" className={classNames({[styles.active]: isHome})}>
                <GeekIcon type={isHome ? "iconbtn_home_sel" : "iconbtn_home"}
                          className={styles.icon}/>
                <span>首页</span>
            </Link>
            <Link to="/question" className={classNames({[styles.active]: isQuestion})}>
                <GeekIcon type={isQuestion ? 'iconbtn_qa_sel' : 'iconbtn_qa'} className={styles.icon}/>
                <span>问答</span>
            </Link>
            <Link to="/video" className={classNames({[styles.active]: isVideo})}>
                <GeekIcon type={isVideo ? 'iconbtn_video_sel' : 'iconbtn_video'} className={styles.icon}/>
                <span>视频</span>
            </Link>
            <Link to="/mine" className={classNames({[styles.active]: isMine})}>
                <GeekIcon type={isMine ? 'iconbtn_mine_sel' : 'iconbtn_mine'} className={styles.icon}/>
                <span>我的</span>
            </Link>
        </div>
    );
}