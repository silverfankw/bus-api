import { useState, useMemo } from "react"
import _ from "lodash"

import NormalButton from "./NormalButton"
import NormalInput from "./NormalInput"

const QuerySidebar = props => {
    const { routeList, setRouteResult } = props
    const [userInput, setUserInput] = useState("")

    const routes = useMemo(() => _.uniq(_.map(_.values(_.mapValues(routeList)), route => route.route)), [routeList])

    const updateInput = e => setUserInput(e.target.value.trim().toUpperCase())

    const findRoute = () => setRouteResult(routeList.filter(route => route.route === userInput))
    
    return (
        <div className="rounded-xl m-3 w-1/5 bg-slate-800">
            <div className="mt-2 text-white">
                <p className="mx-3 font-bold">輸入巴士路線</p>
            </div>
            <hr className="mx-3 my-1" />

            <NormalInput optionList={routes} onChange={updateInput} onBlur={findRoute} value={userInput}/>
            <NormalButton value="Search" onClick={findRoute} />
        </div >
    )
}

export default QuerySidebar;