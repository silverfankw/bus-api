import { FormattedMessage } from 'react-intl';
import { useState, useEffect, memo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus } from '@fortawesome/fontawesome-free-solid'

import NormalButton from "./common/NormalButton"
import NormalTextArea from "./common/NormalTextArea"



const RouteContentBox = props => {
    const { stopIDs, stopList, resultLanguage, resultDisplayStyle } = props

    const [formattedStopInfo, setFormattedStopInfo] = useState("")

    const copyTextContent = e => {
        navigator.clipboard.writeText(formattedStopInfo)
    }

    useEffect(() => {
        let formatted = ""
        stopIDs.forEach((stop, index) => {
            if (index == stopIDs.length - 1 && resultLanguage === "comb")
                formatted = formatted.concat(`${stopList[stop].name["zh"]} ${stopList[stop].name["en"]}`)
            else if (resultLanguage === "comb")
                formatted = formatted.concat(`${stopList[stop].name["zh"]} ${stopList[stop].name["en"]}\n`)
            else if (index == stopIDs.length - 1)
                formatted = formatted.concat(stopList[stop].name[resultLanguage])
            else if (resultDisplayStyle === "single")
                formatted = formatted.concat(`${stopList[stop].name[resultLanguage]}\n`)
            else if (resultDisplayStyle === "multi")
                formatted = formatted.concat(`${stopList[stop].name[resultLanguage]} → ${stopList[stopIDs[index + 1]].name[resultLanguage]}\n`)
        })
        setFormattedStopInfo(formatted)
    }, [stopIDs, resultLanguage, resultDisplayStyle])

    return (
        <div className="container">
            <div className="flex ml-3 mt-2">
                <FontAwesomeIcon className="ml-1 my-1" icon={faBus} />
                <p className="mx-3 font-bold"><FormattedMessage id="label--stop-info" /></p>
                <NormalButton label="button--copy" style="button" onClick={copyTextContent} />
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