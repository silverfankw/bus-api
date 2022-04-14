import { BASE_URL, ENDPOINT_KMB_ROUTE_STOP } from "../api/const"

const RouteResultList = props => {
    const routeResult = props.routeResult

    const searchRouteInfo = async record => {
        const stopList = await fetch(`${BASE_URL}${ENDPOINT_KMB_ROUTE_STOP}${record.route}/${record.bound === "O" ? "outbound" : "inbound"}/${record.service_type}`)
            .then(resp => resp.json())
            .then(json => json.data.map(item => item.stop))
            .catch(error => console.log(error))
        console.log(stopList)
        props.setStopList(stopList)
    }

    return (
        <div class="rounded-xl m-3 text-white w-2/5 bg-slate-800">
            <p class="mx-3 my-2">搜尋結果</p>
            <table class="mx-3 w-11/12 table-auto w-full text-sm">
                <thead>
                    <tr>
                        <th class="border-b text-left">路線</th>
                        <th class="border-b text-left">起點</th>
                        <th class="border-b text-left">目的地</th>
                    </tr>
                </thead>
                <tbody>
                    {!routeResult.length ?
                        <tr>
                            <td> {"-"} </td>
                            <td> {"-"} </td>
                            <td> {"-"} </td>
                        </tr> :
                        routeResult.map(record => (
                            <tr class="hover-tr" onClick={e => searchRouteInfo(record)}>
                                <td>{record.route}</td>
                                <td>{record.orig_tc}</td>
                                <td>{record.dest_tc}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default RouteResultList;