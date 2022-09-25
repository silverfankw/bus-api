/* Use Regexp to define Route Background by company and route number pattern*/

import * as routeDef from "../../util/route_definition"

export const RouteDecorator = props => {
    const { co, route } = props.details

    // Black bg - White text
    const IS_OVERNIGHT_ROUTE = route.match(/(^N)(\d|[A-Z]){1,4}/)

    // Black bg - Yellow text
    const IS_LWB_AIRPORT_OVERNIGHT_ROUTE = routeDef.LWB_OVERNIGHT_ROUTE.indexOf(route) > -1
    const IS_NLB_OVERNIGHT_ROUTE = routeDef.NLB_OVERNIGHT_ROUTE.indexOf(route) > -1

    // Purple bg - Yellow text
    const IS_CTB_NWFB_OVERNIGHT_ROUTE = [...routeDef.CTB_OVERNIGHT_ROUTE, ...routeDef.NWFB_OVERNIGHT_ROUTE].indexOf(route) > -1

    // Dark Blue bg - Yellow text
    const IS_LWB_AIRPORT_ROUTE = routeDef.LWB_AIRPORT_ROUTE.indexOf(route) > -1

    // Red bg - White text
    const IS_XHT_OR_EHC_ROUTE =
        route.match(/(^1)(\d){2}([A-Z])?/) || route.match(/(^3)(\d){2}([A-Z])?/) || route.match(/(^6)(\d){2}([A-Z])?/)
    const IS_XHT_EVENT_ROUTE = routeDef.XHT_EVENT_ROUTE.indexOf(route) > -1
    const IS_RED_BG_EXCLUSION = routeDef.EXCLUSION_FOR_RED_BG.indexOf(route) > -1

    // Green bg - White text
    const IS_WHC_ROUTE = route.match(/(^9)(\d|[A-Z]){2,4}/) || routeDef.CTB_EXTERNAL_ROUTE_XHT.indexOf(route) > -1

    // Orange bg - white text
    const IS_LWB_EXTERNAL_ROUTE = routeDef.LWB_EXTERNAL_ROUTE.indexOf(route) > -1
    const IS_LWB_S_ROUTE = routeDef.LWB_LANTAU_ROUTE.indexOf(route) > -1
    const IS_LWB_EVENT_ROUTE = routeDef.LWB_EVENT_ROUTE.indexOf(route) > -1

    // Red bg - white text
    const IS_CITYFLYER_OR_CTB_E_ROUTE = [...routeDef.CITYFLYER_ROUTE, ...routeDef.CTB_EXTERNAL_ROUTE].indexOf(route) > -1

    // No special color style apply
    const IS_REGULAR_ROUTE =
        !IS_OVERNIGHT_ROUTE && !IS_CTB_NWFB_OVERNIGHT_ROUTE && !IS_XHT_OR_EHC_ROUTE &&
        !IS_WHC_ROUTE && !IS_LWB_EXTERNAL_ROUTE && !IS_CITYFLYER_OR_CTB_E_ROUTE &&
        !IS_LWB_AIRPORT_ROUTE && !IS_LWB_AIRPORT_OVERNIGHT_ROUTE && !IS_LWB_S_ROUTE && !IS_LWB_EVENT_ROUTE && !IS_XHT_EVENT_ROUTE

    // Since co is an array, the decorator will determine color with the first company value
    switch (co[0]) {
        case "kmb":
            if (IS_REGULAR_ROUTE)
                return <span className="px-2 py-0.5">{route}</span>
        case "ctb":
            if (IS_REGULAR_ROUTE || IS_RED_BG_EXCLUSION)
                return <span className="bg-sky-500 text-white px-2 py-0.5">{route}</span>
        case "nwfb":
            if (IS_REGULAR_ROUTE || IS_RED_BG_EXCLUSION)
                return <span className="bg-violet-900 text-white px-2 py-0.5">{route}</span>
        case "nlb":
            if (IS_REGULAR_ROUTE)
                return <span className="bg-[#000080] text-white px-2 py-0.5">{route}</span>
            else if (IS_NLB_OVERNIGHT_ROUTE || IS_LWB_AIRPORT_OVERNIGHT_ROUTE)
                return <span className="bg-black text-yellow-300 px-2 py-0.5">{route}</span>
            else if (IS_CTB_NWFB_OVERNIGHT_ROUTE)
                return <span className="bg-[#291466] text-amber-300 px-2 py-0.5">{route}</span>
            else if ((IS_XHT_OR_EHC_ROUTE || IS_CITYFLYER_OR_CTB_E_ROUTE || IS_XHT_EVENT_ROUTE) && !IS_RED_BG_EXCLUSION)
                return <span className="bg-red-700 px-2 py-0.5">{route}</span>
            else if (IS_WHC_ROUTE)
                return <span className="bg-green-700 px-2 py-0.5">{route}</span>
            else if (IS_LWB_AIRPORT_ROUTE)
                return <span className="bg-[#000070] text-yellow-300 px-2 py-0.5">{route}</span>
            else if (IS_OVERNIGHT_ROUTE)
                return <span className="bg-black text-white px-2 py-0.5">{route}</span>
            else if (IS_LWB_EXTERNAL_ROUTE || IS_LWB_S_ROUTE || IS_LWB_EVENT_ROUTE)
                return <span className="bg-amber-600 px-2 py-0.5">{route}</span>
        default:
            return <span className="px-2 py-0.5">{route}</span>
    }
}