import NormalButton from "./common/NormalButton"
import NormalTextArea from "./common/NormalTextArea"

import { useState, useEffect, memo } from "react"

const RouteContentBox = props => {
    const { stopIDs, stopList, language, displayOption } = props

    const [formattedStopInfo, setFormattedStopInfo] = useState("")

    const copyTextContent = e => {
        navigator.clipboard.writeText(formattedStopInfo)
    }

    useEffect(() => {
        let formatted = ""
        stopIDs.forEach((stop, index) => {
            if (index == stopIDs.length - 1 && language === "comb")
                formatted = formatted.concat(`${stopList[stop].name["zh"]} ${stopList[stop].name["en"]}`)
            else if (language === "comb")
                formatted = formatted.concat(`${stopList[stop].name["zh"]} ${stopList[stop].name["en"]}\n`)
            else if (index == stopIDs.length - 1)
                formatted = formatted.concat(stopList[stop].name[language])
            else if (displayOption === "single")
                formatted = formatted.concat(`${stopList[stop].name[language]}\n`)
            else if (displayOption === "multi")
                formatted = formatted.concat(`${stopList[stop].name[language]} → ${stopList[stopIDs[index + 1]].name[language]}\n`)
        })
        setFormattedStopInfo(formatted)
    }, [stopIDs, language, displayOption])

    return (
        <div className="container">
            <div className="flex mt-2">
                <p className="mx-4 font-bold">站位資料</p>
                <NormalButton value="Copy" onClick={copyTextContent} style="mb-1" />
            </div>
            <NormalTextArea
                placeholder="No data"
                value={formattedStopInfo}
                rows={stopIDs.length}
                disabled
            />
        </div>
    )
}

export default memo(RouteContentBox);