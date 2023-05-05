import {GeekIcon} from "@shared/geekIcon";
import {useNavigate} from "react-router-dom";

interface Props {
    click?: () => void;
}


export default function Back({click}: Props) {
    const navigate = useNavigate()
    return (
        <GeekIcon type={'iconfanhui'} style={{width: "4.5333vw", height: "4.5333vw"}} onClick={
            () => {
                if (typeof click !== 'undefined') click()
                navigate(-1)
            }
        }/>
    )
}