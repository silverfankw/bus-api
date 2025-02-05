import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faPlayCircle, faFlagCheckered, faSign, faBuilding } from '@fortawesome/fontawesome-free-solid'

import { FormattedMessage } from 'react-intl';
import { useDispatch } from "react-redux";
import { setStopIDs, setSelectedRoute } from "../features/routeInfo/routeInfoSlice";

import { companyMap } from "../util/mapper"
import { RouteDecorator } from "./common/RouteDecorator"

const RouteResultList = props => {
    const { routeResult, language } = props

    const dispatch = useDispatch()

    const [selectedIndex, setSelectedIndex] = useState(null)

    const searchRouteInfo = async selectedRecord => {
        const availableCompany = Object.keys(selectedRecord.stops)[0]
        dispatch(setSelectedRoute({ "route": selectedRecord.route, "dest": selectedRecord.dest }))
        dispatch(setStopIDs(selectedRecord.stops[availableCompany]))
    }

    useEffect(() => {
        setSelectedIndex(null)
    }, [routeResult])

    const constructCompanyName = (co, isLastCompany) => {
        return language === `zh` ? `${companyMap[co]}${!isLastCompany ? ` 及 ` : ``}` : `${co.toUpperCase()}${!isLastCompany ? ` & ` : ``}`
    }

    return (
        <div className="container w-1/3">
            <div className="mx-3 my-2">
                <FontAwesomeIcon icon={faListAlt} />
                <span className="mx-3"><FormattedMessage id="label--search-result" /></span>

                {
                    <table className="table-auto my-2 w-full text-sm border-separate">
                        <thead>
                            <tr>
                                <th className="normal-th"><FontAwesomeIcon className="mr-1" icon={faBuilding} /><FormattedMessage id="label--bus-company" /></th>
                                <th className={`normal-th `}><FontAwesomeIcon className="mr-1" icon={faSign} /><FormattedMessage id="label--bus-route" /></th>
                                <th className="normal-th"><FontAwesomeIcon className="mr-1" icon={faPlayCircle} /><FormattedMessage id="label--departure" /></th>
                                <th className="normal-th"><FontAwesomeIcon className="mr-1" icon={faFlagCheckered} /><FormattedMessage id="label--destination" /></th>
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
                                        <tr key={`route-result-${index}`} className={`hover-tr ${selectedIndex == index ? `selected-tr` : ``}`} onClick={e => { searchRouteInfo(record); setSelectedIndex(index) }}>
                                            <td key={`route-result-${index}-cmp`}>
                                                {record.co.map((co, i) => constructCompanyName(co, i == record.co.length - 1))}</td>

                                            <td key={`route-result-${index}-route`}
                                                className={`route-num ${record.serviceType !== '1' && record.co == "kmb" ? `after:content-['特班'] after:ml-0.5 after:text-red-500 after:font-bold` : ``}`}
                                            >
                                                <RouteDecorator details={record} />
                                            </td>
                                            <td key={`route-result-${index}-name_tc`}>{record.orig[language]}</td>
                                            <td key={`route-result-${index}-dest_tc`}>{record.dest[language]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div >
    )
}

export default RouteResultList;