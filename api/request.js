import {
    ENDPOINT_KMB_ROUTE_STOP,
    ENDPOINT_KMB_SPECIAL_SERVICE,
    ENDPOINT_CTB_NWFB_ROUTESTOP,
    ENDPOINT_KMB_STOP,
    ENDPOINT_CTB_NWFB_STOP
} from "../api/const"

export const searchRouteList = async (endpoint) => {
    return await fetch(endpoint)
        .then(resp => resp.json())
        .then(json => json.data)
        .catch(error => console.log(error))
}

/* Deprecated */
export const searchRouteListByInput = async (endpoint, userInput) => {
    return await fetch(endpoint)
        .then(resp => resp.json())
        .then(json => json.data.filter(item => item.route === userInput))
        .catch(error => console.log(error))
}


export const searchRouteStop = async (company, record) => {
    const endpoint =
        (company === "CTB" || company === 'NWFB') ?
            `${ENDPOINT_CTB_NWFB_ROUTESTOP}${record.co}/${record.route}/outbound`
            : `${ENDPOINT_KMB_ROUTE_STOP}${record.route}/${record.bound === "O" ? "outbound" : "inbound"}/${record.service_type}`

    const result = await fetch(endpoint)
        .then(resp => resp.json())
        .then(json => json.data.map(item => item.stop))
        .catch(error => console.log(error))

    return result
}


export const translateStop = async (company, stopList) => {
    const result = await Promise.all(
        stopList.map(async stopID => {
            return await fetch(
                company === "CTB" || company === "NWFB"
                    ? `${ENDPOINT_CTB_NWFB_STOP}${stopID}`
                    : `${ENDPOINT_KMB_STOP}${stopID}`)
                .then(resp => resp.json())
                .then(json => {
                    if (company === "CTB" || company === "NWFB")
                        return json.data.name_tc.split(',')[0]
                    else return json.data.name_tc
                })
                .catch(error => console.log(error))
        })
    )

    return result
}


export const checkSpecialService = async route => {
    const result = await fetch(`${ENDPOINT_KMB_SPECIAL_SERVICE}&route=${route}&bound=1`)
        .then(resp => resp.json())
        .then(json => json.data.routes.filter(route => parseInt(route.ServiceType.trim(), 10) != 1))
        .catch(error => console.log(error))
    return result
}