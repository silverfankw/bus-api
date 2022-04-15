import { useState } from "react"
import NormalButton from "../components/NormalButton"

import {
    ENDPOINT_KMB_ROUTE as KMB,
    ENDPOINT_CTB_ROUTE as CTB,
    ENDPOINT_NWFB_ROUTE as NWFB
} from "../api/const"
import { searchRouteList } from "../api/request"

const QuerySidebar = props => {
    const { setRouteSearching } = props
    const [userInput, setUserInput] = useState(null)

    const updateInput = e => {
        setUserInput(e.target.value)
    }

    const searchRoute = async () => {
        setRouteSearching(true)
        await Promise.all(
            [
                searchRouteList(KMB, userInput),
                searchRouteList(CTB, userInput),
                searchRouteList(NWFB, userInput)
            ]
        )
            .then(resp => props.setRouteResult(resp.flat()))
            .catch(error => console.log(error))
        setRouteSearching(false)
    }

    return (
        <div className="rounded-xl m-3 w-1/5 bg-slate-800">
            <div className="flex mt-2 text-white">
                <p className="mx-3 font-bold">輸入巴士路線</p>
            </div>
            <hr className="mx-3 my-1" />
            <input
                className="mx-3 my-2 w-20 text-sm ring-2 ring-sky-600 rounded-sm caret-sky-600 focus:ring-2 focus:ring-sky-600"
                onBlur={e => updateInput(e)}
            />
            <NormalButton value="Search" onClick={searchRoute} />
        </div >
    )
}

export default QuerySidebar;