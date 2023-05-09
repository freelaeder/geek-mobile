// src/pages/personal/index.tsx
import styles from "@styles/personal.module.less";
import {GeekIcon} from "@shared/geekIcon";
import Header from "@shared/header";
import Back from "@shared/back";
import {useRequestProfileQuery} from "@service/userEndpoints";
import Loading from "@shared/loading";
import Avatar from "@pages/personal/avatar";
import Nickname from "@pages/personal/widgets/nickname";

export default function Personal() {

    const {data, isLoading, isSuccess} = useRequestProfileQuery(undefined)
    console.log(data)
    if (isLoading) return <Loading/>

    return (
        <>
            {
                isSuccess && (
                    <div className={styles.page}>
                        <Header title="个人信息" left={<Back/>}/>
                        <ul className={styles.options}>
                            <Avatar avatar={data.data.photo} />
                            <Nickname name={data.data.name} />
                            <li>
                                <span>简介</span>
                                <div className={styles.value}>
                                    <span>简介</span>
                                    <GeekIcon type="iconbtn_right" className={styles.icon}/>
                                </div>
                            </li>
                        </ul>
                        <ul className={styles.options}>
                            <li>
                                <span>性别</span>
                                <div className={styles.value}>
                                    <span>{data.data.gender === '1' ? '男' : '女' }</span>
                                    <GeekIcon type="iconbtn_right" className={styles.icon}/>
                                </div>
                            </li>
                            <li>
                                <span>生日</span>
                                <div className={styles.value}>
                                    <span>{data.data.birthday}</span>
                                    <GeekIcon type="iconbtn_right" className={styles.icon}/>
                                </div>
                            </li>
                        </ul>
                        <button className={styles.logout}>退出登录</button>
                    </div>
                )
            }
        </>

    )
}