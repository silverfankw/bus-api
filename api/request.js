import {
    ENDPOINT_HK_BUS_CRAWLER
} from "../api/const"

export const getBusDB = async () => {
    return await fetch(ENDPOINT_HK_BUS_CRAWLER)
        .then(resp => resp.json())
}
