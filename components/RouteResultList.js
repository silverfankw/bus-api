import { useEffect } from "react"
import { companyMap } from "../util/mapper"

const RouteResultList = props => {
    const { routeResult, setStopIDs } = props

    const searchRouteInfo = async selectedRecord => {
        setStopIDs(selectedRecord.stops[selectedRecord.co[0]])
    }

    // useEffect(() => {
    //     console.log(routeResult.map(
    //         route => `${route?.co}-${route?.route}: ${route?.orig?.zh} - ${route?.dest?.zh}`
    //     ))
    // }, [routeResult])

    return (
        <div className="container">
            <p className="mx-3 my-2 font-bold">搜尋結果</p>
            {
                // routeSearching ? <Spinner /> :
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
                                return (
                                    <tr key={`route-result-${index}`} className="hover-tr" onClick={e => searchRouteInfo(record)}>
                                        <td key={`route-result-${index}-cmp`}>
                                            {record.co.map(co => companyMap[co])}</td>
                                        <td key={`route-result-${index}-route`}
                                            className={`${record.serviceType !== '1' ? `after:content-['特班'] after:ml-1 after:text-red-500` : ``}`}>{record?.route}</td>
                                        <td key={`route-result-${index}-name_tc`}>{record.orig["zh"]}</td>
                                        <td key={`route-result-${index}-dest_tc`}>{record.dest["zh"]}</td>
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