import { useState } from "react"
import NormalButton from "../components/NormalButton"

import { BASE_URL, ENDPOINT_KMB_ROUTE } from "../api/const"

const QuerySidebar = props => {
    const [userInput, setUserInput] = useState(null)

    const updateInput = e => {
        setUserInput(e.target.value)
    }

    const searchRoute = async () => {
        const result = await fetch(`${BASE_URL}${ENDPOINT_KMB_ROUTE}`)
            .then(resp => resp.json())
            .then(json => json.data.filter(item => item.route === userInput))
            .catch(error => console.log(error))

        props.setRouteResult(result)
    }

    return (
        <div class="rounded-xl m-3 w-1/5 bg-slate-800">
            <input
                className="m-3 w-20 text-sm ring-1 ring-sky-600 rounded-sm caret-sky-600 focus:ring-0 focus:ring-sky-200"
                onBlur={e => updateInput(e)}
            />
            <NormalButton value="Search" onClick={searchRoute} />
        </div >
    )
}

export default QuerySidebar;