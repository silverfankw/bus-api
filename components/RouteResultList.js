import { searchRouteStop, translateStop } from "../api/request"
import { companyMap } from "../util/mapper"
import Spinner from "./Spinner"

const RouteResultList = props => {
    const { language, routeResult, routeSearching, setStopSearching,
        setStopIDs } = props

    const searchRouteInfo = async selectedRecord => {
        setStopSearching(true)
        setStopIDs(selectedRecord.stops[selectedRecord.co[0]])
        setStopSearching(false)
    }

    return (
        <div className="container">
            <p className="mx-3 my-2 font-bold">搜尋結果</p>
            {
                routeSearching ? <Spinner /> :
                    <table className="table-auto mx-3 w-11/12 text-sm">
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
                                routeResult.map((record, index) => {
                                    // console.log(record)
                                    return (
                                    <tr key={`route-result-${index}`} className="hover-tr" onClick={e => searchRouteInfo(record)}>
                                        <td key={`route-result-${index}-cmp`}>
                                            {record.co.map(co => companyMap[co])}</td>
                                        <td key={`route-result-${index}-route`}
                                            className={`${record.serviceType !== '1' ? `after:content-['特班'] after:ml-1 after:text-red-500` : ``}`}>{record?.route}</td>
                                        <td key={`route-result-${index}-name_tc`}>{record.orig[language]}</td>
                                        <td key={`route-result-${index}-dest_tc`}>{record.dest[language]}</td>
                                    </tr>
                                )
})
                            }
                        </tbody>
                    </table>
            }

        </div >
    )
}

export default RouteResultList;