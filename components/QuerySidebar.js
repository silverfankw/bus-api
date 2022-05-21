import { useState, useEffect, useMemo } from "react"
import _ from "lodash"

import NormalButton from "./NormalButton"
import NormalInput from "./NormalInput"

const QuerySidebar = props => {
    const { setRouteResult } = props
    const [userInput, setUserInput] = useState(null)
    const [routes, setRoutes] = useState([])


    const updateInput = e => {
        setUserInput(e.target.value.trim().toUpperCase())
        findRoute()
    }

    const findRoute = async () => {
        setRouteResult(routes.filter(route => route.route === userInput))
        console.log("search")
    }

    useEffect(() => {
        const storage = window.localStorage.getItem("bus_data")
        if (storage)
            setRoutes(_.values(_.mapValues(JSON.parse(localStorage.getItem("bus_data"))?.routeList)))
    }, [])

    const routeList = useMemo(() => {
        console.log("memo")
        return _.uniq(_.map(routes, route => route.route))
    }, [routes])

    return (
        <div className="rounded-xl m-3 w-1/5 bg-slate-800">
            <div className="mt-2 text-white">
                <p className="mx-3 font-bold">輸入巴士路線</p>
            </div>
            <hr className="mx-3 my-1" />

            <NormalInput optionList={routeList} onBlur={updateInput} />
            <NormalButton value="Search" onClick={findRoute} />
        </div >
    )
}

export default QuerySidebar;