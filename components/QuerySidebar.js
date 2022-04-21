import { useState } from "react"
import LZUTF8 from "lzutf8"

import { checkSpecialService } from "../api/request"
import NormalButton from "../components/NormalButton"

const QuerySidebar = props => {
    const { setRouteResult, setRouteSearching, setLanguage } = props
    const [userInput, setUserInput] = useState(null)

    const updateInput = e => {
        setUserInput(e.target.value.trim().toUpperCase())
    }

    const findRoute = async () => {
        const routelist = JSON.parse(LZUTF8.decompress(localStorage.getItem("routes"), { inputEncoding: "Base64" }))

        setRouteSearching(true)
        const result = routelist.filter(route => route.route === userInput && (route.service_type == 1 || route.service_type === undefined))
        // setRouteResult(routelist.filter(route => route.route === userInput))
        const special = await checkSpecialService(userInput)
        if (special.length) {
            result.push(...special)
        }
        // console.log(result)
        setRouteResult(result)

        setRouteSearching(false)
    }


    return (
        <div className="rounded-xl m-3 w-1/5 bg-slate-800">
            <div className="mt-2 text-white">
                <p className="mx-3 font-bold">輸入巴士路線</p>
            </div>
            <hr className="mx-3 my-1" />
            <input
                className="capitalize mx-3 my-2 w-20 text-sm ring-2 ring-cyan-600 rounded-sm caret-sky-600 
                focus:ring-2 focus:ring-sky-800 focus:outline-none"
                onBlur={e => updateInput(e)}
            />
            <NormalButton value="Search" onClick={findRoute} />

        </div >
    )
}

export default QuerySidebar;