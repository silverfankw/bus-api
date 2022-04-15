import { searchRouteStop, translateStop } from "../api/request"
import Spinner from "./Spinner"

const RouteResultList = props => {
    const { routeResult, routeSearching, setStopSearching } = props

    const searchRouteInfo = async selectedRecord => {
        const company = selectedRecord.co === undefined ? "KMB" : selectedRecord.co

        setStopSearching(true)
        const stopList = await searchRouteStop(company, selectedRecord)
        const stopInfo = await translateStop(company, stopList)
        setStopSearching(false)

        props.setStopInfo(stopInfo)
    }

    return (
        <div className="container">
            <p className="mx-3 my-2 font-bold">搜尋結果</p>
            {
                routeSearching ? <Spinner /> :
                    <table className="mx-3 w-11/12 text-sm">
                        <thead>
                            <tr>
                                <th className="normal-th">公司</th>
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
                                    <td> {"-"} </td>
                                </tr> :
                                routeResult.map((record, index) => (
                                    <tr key={`route-result-${index}`} className="hover-tr" onClick={e => searchRouteInfo(record)}>
                                        <td key={`route-result-${index}-cmp`}>{record.co === undefined ? "KMB / LWB" : record.co}</td>
                                        <td key={`route-result-${index}-route`}>{record.route}</td>
                                        <td key={`route-result-${index}-name_tc`}>{record.orig_tc}</td>
                                        <td key={`route-result-${index}-dest_tc`}>{record.dest_tc}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
            }

        </div>
    )
}

export default RouteResultList;