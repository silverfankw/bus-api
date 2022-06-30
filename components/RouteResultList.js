import { companyMap } from "../util/mapper"
import { FormattedMessage } from 'react-intl';
import { RouteDecorator } from "./common/RouteDecorator"

const RouteResultList = props => {
    const { routeResult, setStopIDs } = props

    const searchRouteInfo = async selectedRecord => {
        const availableCompany = Object.keys(selectedRecord.stops)[0]
        setStopIDs(selectedRecord.stops[availableCompany])
    }

    // useEffect(() => {
    //     console.log(routeResult.map(
    //         route => `${route?.co}-${route?.route}: ${route?.orig?.zh} - ${route?.dest?.zh}`
    //     ))
    // }, [routeResult])

    const routeBoxStyle = (co, route) => {
        if (route.match(/(^N)(\d|[A-Z]){1,4}/))
            return <span className="bg-black text-white px-2 py-0.5 font-bold rounded-sm">{route}</span>
        else if (route.match(/(^1)(\d|[A-Z]){2,4}/) || route.match(/(^3)(\d|[A-Z]){2,4}/) || route.match(/(^6)(\d|[A-Z]){2,4}/) && route != "629")
            return <span className="bg-red-700 px-2 py-0.5 font-bold rounded-sm">{route}</span>
        else if (route.match(/(^9)(\d|[A-Z]){2,4}/))
            return <span className="bg-green-900 px-2 py-0.5 rounded-sm">{route}</span>
        else
            return <span className="px-2 py-0.5 rounded-sm">{route}</span>
    }

    return (
        <div className="container">
            <p className="mx-3 my-2 font-bold"><FormattedMessage id="label--search-result" /></p>
            {
                // routeSearching ? <Spinner /> :
                <table className="table-auto mx-3 w-11/12 text-sm">
                    <thead>
                        <tr>
                            <th className="normal-th"><FormattedMessage id="label--bus-company" /></th>
                            <th className="normal-th"><FormattedMessage id="label--bus-route" /></th>
                            <th className="normal-th"><FormattedMessage id="label--departure" /></th>
                            <th className="normal-th"><FormattedMessage id="label--destination" /></th>
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
                                            {record.co.map((co, i) => i != record.co.length - 1 ? `${companyMap[co]} 及 ` : companyMap[co])}</td>
                                        <td key={`route-result-${index}-route`}
                                            className={`${record.serviceType !== '1' ? `after:content-['特班'] after:ml-1 after:text-red-500` : ``}`}>
                                            {/* <span className="border px-2 py-0.5">{record?.route}</span> */}
                                            {/* <RouteDecorator co={record?.co} route={record?.route} /> */}
                                            {routeBoxStyle(record.co, record.route)}
                                        </td>
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