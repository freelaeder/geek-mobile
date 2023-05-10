import React, {useState} from 'react';
import styles from "@styles/personal.module.less";
import {GeekIcon} from "@shared/geekIcon";
import {DatePicker} from "antd-mobile";
import dayjs from "dayjs";
import {useUpdateProfileMutation} from "@service/userEndpoints";
import toast from "react-hot-toast";

interface Props {
    birthday: string
}

function Birthday({birthday}: Props) {
    const [visible, setVisible] = useState(false)
    const [updateBirthday] = useUpdateProfileMutation()
    return (
        <li>
            <span>生日</span>
            <div onClick={() => setVisible(true)} className={styles.value}>
                <span>{birthday}</span>
                <GeekIcon type="iconbtn_right" className={styles.icon}/>
            </div>
            <DatePicker max={new Date()}
                        title={'生日选择'}
                        min={new Date(1900, 0, 1, 0, 0, 0)}
                        onClose={() => setVisible(false)} visible={visible}
                        defaultValue={dayjs(birthday).toDate()}
                        onConfirm={(val) => {
                            updateBirthday({birthday:dayjs(val).format("YYYY-MM-DD")}).unwrap().then(()=>{
                                toast.success('修改生日成功')

                            }).catch(()=> {
                                toast.error('修改生日失败')
                            })
                        }
                        }
            />
        </li>
    );
}

export default Birthday;