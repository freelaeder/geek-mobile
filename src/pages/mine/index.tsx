// src/pages/mine/index.tsx
import {Link} from "react-router-dom";
import {GeekIcon} from "@shared/geekIcon";
import styles from '@styles/mine.module.less'
import {useRequestUserQuery} from "@service/userEndpoints";
import Loading from "@shared/loading";

export default function Mine() {
    const {data, isLoading, isSuccess, isError} = useRequestUserQuery(undefined)
    if (isLoading) return <Loading/>
    if (isError) return <div>身份已过期，请重新登录</div>
    return (
        <div className={styles.page}>
            {/* 个人资料 - 开始 */}
            {
                isSuccess && <div className={styles.profile}>
                    {/* 个人信息 - 开始 */}
                    <div className={styles.info}>
                        <div className={styles.avatar}>
                            <img
                                src={data.data.photo}
                                alt="avatar"
                            />
                        </div>
                        <div className={styles.name}>{data.data.name}</div>
                        <Link className={styles.link} to="/person">
                            个人信息 &gt;
                        </Link>
                    </div>
                    {/* 个人信息 - 结束*/}
                    {/* 统计数据 - 开始 */}
                    <div className={styles.data}>
                        <Link to="/">
                            <span>{data.data.art_count}</span>
                            <span>动态</span>
                        </Link>
                        <Link to="/">
                            <span>{data.data.follow_count}</span>
                            <span>关注</span>
                        </Link>
                        <Link to="/">
                            <span>{data.data.fans_count}</span>
                            <span>粉丝</span>
                        </Link>
                        <Link to="/">
                            <span>{data.data.like_count}</span>
                            <span>被赞</span>
                        </Link>
                    </div>
                    {/* 统计数据 - 结束 */}
                </div>
            }
            {/* 个人资料 - 结束 */}
            {/* 按钮区域 - 开始 */}
            <div className={`${styles.button} ${styles.pos}`}>
                <Link to="/">
                    <GeekIcon className={styles.icon} type="iconbtn_mymessages"/>
                    <span>消息通知</span>
                </Link>
                <Link to="/">
                    <GeekIcon className={styles.icon} type="iconbtn_mycollect"/>
                    <span>收藏</span>
                </Link>
                <Link to="/">
                    <GeekIcon className={styles.icon} type="iconbtn_history1"/>
                    <span>浏览历史</span>
                </Link>
                <Link to="/">
                    <GeekIcon className={styles.icon} type="iconbtn_myworks"/>
                    <span>我的作品</span>
                </Link>
            </div>
            {/* 按钮区域 - 结束 */}
            {/* 按钮区域 - 开始 */}
            <div className={styles.button}>
                <Link to="/">
                    <GeekIcon className={styles.icon} type="iconbtn_feedback"/>
                    <span>用户反馈</span>
                </Link>
                <Link to="/">
                    <GeekIcon className={styles.icon} type="iconbtn_xiaozhitongxue"/>
                    <span>小智同学</span>
                </Link>
            </div>
            {/* 按钮区域 - 结束 */}
        </div>
    );
}