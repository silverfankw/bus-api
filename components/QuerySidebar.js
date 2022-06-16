import { useState, useMemo } from "react"
import { FormattedMessage } from 'react-intl';
import _ from "lodash"

import NormalButton from "./common/NormalButton"
import NormalInput from "./common/NormalInput"
import RadioSelectors from "./common/RadioSelectors"

import { displayDesc } from "../util/description"

const QuerySidebar = props => {
    const { routeList, setRouteResult, resultLanguage, setResultLanguage, resultDisplayStyle, setResultDisplayStyle } = props
    const [userInput, setUserInput] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const routes = useMemo(() => _.uniq(_.map(_.values(_.mapValues(routeList)), route => route.route)), [routeList])
    const updateInput = e => setUserInput(e.target.value.trim().toUpperCase())
    const findRoute = () => setRouteResult(routeList.filter(route => route.route === userInput))

    const language_option = [
        { name: "language", labelId: "label--chinese", value: "zh", checked: resultLanguage === "zh", onChange: () => setResultLanguage("zh") },
        { name: "language", labelId: "label--english", value: "en", checked: resultLanguage === "en", onChange: () => setResultLanguage("en") },
        { name: "language", labelId: "label--ch-en-combination", value: "comb", checked: resultLanguage === "comb", onChange: () => setResultLanguage("comb") }
    ]

    const display_option = [
        { name: "display", labelId: "label--this-stop-only", value: "single", checked: resultDisplayStyle === "single", onChange: () => setResultDisplayStyle("single") },
        { name: "display", labelId: "label--this-and-next-stop", value: "multi", checked: resultDisplayStyle === "multi", onChange: () => setResultDisplayStyle("multi") }
    ]

    return (
        <div className="rounded-xl m-3 w-1/5 bg-slate-800">
            <div className="mt-2 text-white">
                <p className="mx-3 font-bold"><FormattedMessage id="label--enter-bus-route" /></p>
            </div>
            <hr className="mx-3 my-2" />

            <NormalInput optionList={routes} onChange={updateInput} onBlur={findRoute} value={userInput} />
            <NormalButton value="button--search" onClick={findRoute} />
            <RadioSelectors labelId="label--result-display-language" option={language_option} />
            <RadioSelectors labelId="label--result-display-style" option={display_option} modalHandler={() => setOpenModal(!openModal)} />

            {openModal &&
                <div className="relative w-auto my-3 mx-2 max-w-1xl">
                    <div className="border-1 rounded-lg shadow-lg flex w-full bg-neutral-500 ">
                        <div className="relative p-3 flex-auto">
                            <pre className="my-1 text-xs text-white ">
                                {<FormattedMessage id={"hint--this-and-next-stop"} />}
                            </pre>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}
export default QuerySidebar;