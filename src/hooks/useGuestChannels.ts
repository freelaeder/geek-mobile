import {useTypedSelector} from "@store/index";
import {guestChannelSelectors} from "@slice/guestChannel";
import {useLazyRequestGuestChannelsQuery} from "@service/channelEndpoints";
import {useEffect} from "react";


export default function useGuestChannels() {
    // 获取本地访客频道列表
    const guestChannels = useTypedSelector(guestChannelSelectors.selectAll)
    // 获取本地访客列表数量
    const guestChannelTotal = useTypedSelector(guestChannelSelectors.selectTotal)
    // 获取访客频道列表
    const [requestGuestChannels] = useLazyRequestGuestChannelsQuery()

    useEffect(() => {
        // 如果数量大于0 return
        if (guestChannelTotal > 0) return
        requestGuestChannels(undefined)
    }, [guestChannelTotal, requestGuestChannels])

    return guestChannels

}