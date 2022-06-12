import { useState, useMemo } from "react"
import _ from "lodash"

import NormalButton from "./common/NormalButton"
import NormalInput from "./common/NormalInput"
import RadioSelectors from "./common/RadioSelectors"

import { displayDesc } from "../util/description"

const QuerySidebar = props => {
    const { routeList, setRouteResult, language, setLanguage, displayOption, setDisplayOption } = props
    const [userInput, setUserInput] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const routes = useMemo(() => _.uniq(_.map(_.values(_.mapValues(routeList)), route => route.route)), [routeList])
    const updateInput = e => setUserInput(e.target.value.trim().toUpperCase())
    const findRoute = () => setRouteResult(routeList.filter(route => route.route === userInput))

    const language_option = [
        { name: "language", label: "中文", value: "zh", checked: language === "zh", onChange: () => setLanguage("zh") },
        { name: "language", label: "英文", value: "en", checked: language === "en", onChange: () => setLanguage("en") },
        { name: "language", label: "中英混合", value: "comb", checked: language === "comb", onChange: () => setLanguage("comb") }
    ]

    const display_option = [
        { name: "display", label: "只顯示單站", value: "single", checked: displayOption === "single", onChange: () => setDisplayOption("single") },
        { name: "display", label: "顯示本站與下站", value: "multi", checked: displayOption === "multi", onChange: () => setDisplayOption("multi") }
    ]

    return (
        <div className="rounded-xl m-3 w-1/5 bg-slate-800">
            <div className="mt-2 text-white">
                <p className="mx-3 font-bold">輸入巴士路線</p>
            </div>
            <hr className="mx-3 my-2" />

            <NormalInput optionList={routes} onChange={updateInput} onBlur={findRoute} value={userInput} />
            <NormalButton value="Search" onClick={findRoute} />
            <RadioSelectors label="站位顯示語言 Result Language" option={language_option} />
            <RadioSelectors label="站位顯示方式 Result Display Style" option={display_option} modalHandler={() => setOpenModal(!openModal)} />


            {openModal &&
                <div className="relative w-auto my-3 mx-2 max-w-1xl">
                    <div className="border-1 rounded-lg shadow-lg flex w-full bg-neutral-500 ">
                        <div className="relative p-3 flex-auto">
                            <pre className="my-1 text-xs text-white ">
                                {displayDesc}
                            </pre>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default QuerySidebar;