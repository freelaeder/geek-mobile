// src/pages/personal/index.tsx
import styles from "@styles/personal.module.less";
import Header from "@shared/header";
import Back from "@shared/back";
import {useRequestProfileQuery} from "@service/userEndpoints";
import Loading from "@shared/loading";
import Avatar from "@pages/personal/avatar";
import Nickname from "@pages/personal/widgets/nickname";
import Intro from "@pages/personal/widgets/intro";
import Gender from "@pages/personal/widgets/gender";
import Birthday from "@pages/personal/widgets/birthday";
import Logout from "@pages/personal/widgets/logout";

export default function Personal() {

    const {data, isLoading, isSuccess} = useRequestProfileQuery(undefined)
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
                            <Intro intro={data.data.intro} />
                        </ul>
                        <ul className={styles.options}>
                            <Gender gender={data.data.gender} />
                            <Birthday birthday={data.data.birthday} />
                        </ul>
                        <Logout />
                    </div>
                )
            }
        </>

    )
}