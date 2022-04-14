import { BASE_URL, ENDPOINT_KMB_ROUTE_STOP, ENDPOINT_KMB_STOP } from "../api/const"

const RouteResultList = props => {
    const routeResult = props.routeResult

    const searchRouteInfo = async record => {
        const stopList = await fetch(`${BASE_URL}${ENDPOINT_KMB_ROUTE_STOP}${record.route}/${record.bound === "O" ? "outbound" : "inbound"}/${record.service_type}`)
            .then(resp => resp.json())
            .then(json => json.data.map(item => item.stop))
            .catch(error => console.log(error))

        const stopInfo = await Promise.all(
            stopList.map(async stopID => {
                return await fetch(`${BASE_URL}${ENDPOINT_KMB_STOP}/${stopID}`)
                    .then(resp => resp.json())
                    .then(json => json.data.name_tc)
                    .catch(error => console.log(error))
            })
        )
        props.setStopInfo(stopInfo)
    }

    return (
        <div className="container">
            <p className="mx-3 my-2">搜尋結果</p>
            <table className="mx-3 w-11/12 text-sm">
                <thead>
                    <tr>
                        <th className="normal-th">路線</th>
                        <th className="normal-th">起點</th>
                        <th className="normal-th">目的地</th>
                    </tr>
                </thead>
                <tbody>
                    {!routeResult.length ?
                        <tr>
                            <td> {"-"} </td>
                            <td> {"-"} </td>
                            <td> {"-"} </td>
                        </tr> :
                        routeResult.map((record, index) => (
                            <tr key={`route-result-${index}`} className="hover-tr" onClick={e => searchRouteInfo(record)}>
                                <td key={`route-result-${index}-route`}>{record.route}</td>
                                <td key={`route-result-${index}-name_tc`}>{record.orig_tc}</td>
                                <td key={`route-result-${index}-dest_tc`}>{record.dest_tc}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default RouteResultList;