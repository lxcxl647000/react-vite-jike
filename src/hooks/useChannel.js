import { useEffect, useState } from "react"
import { getChannels } from "@/apis/article";

export default () => {
    const [channels, setChannels] = useState([]);

    const getChannelList = async () => {
        const res = await getChannels();
        setChannels(res.data.channels);
    };

    useEffect(() => {
        getChannelList();
    }, []);

    return { channels };
}