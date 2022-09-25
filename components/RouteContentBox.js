import { FormattedMessage } from 'react-intl';
import { useState, useEffect, memo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus } from '@fortawesome/fontawesome-free-solid'

import NormalButton from "./common/NormalButton"
import NormalTextArea from "./common/NormalTextArea"



const RouteContentBox = props => {
    const { stopIDs, stopList, resultLanguage, resultDisplayStyle, numericDisplay } = props

    const [formattedStopInfo, setFormattedStopInfo] = useState("")

    const copyTextContent = e => {
        navigator.clipboard.writeText(formattedStopInfo)
    }

    useEffect(() => {

        const result_string = stopIDs.reduce((prevString, currStopID, index) => {
            const last = stopIDs.length - 1

            const stopNameZh = stopList[currStopID].name["zh"]
            const stopNameEn = stopList[currStopID].name["en"]

            const nextStopNameZh = index != last ? stopList[stopIDs[index + 1]].name["zh"] : ``
            const nextStopNameEn = index != last ? stopList[stopIDs[index + 1]].name["en"] : ``

            const display_numeric = numericDisplay && resultDisplayStyle !== "multi" ? `${index + 1}. ` : ``
            const last_stop_separator = index != last ? `\n` : ``
            const display_string =
                resultDisplayStyle === "single" ?
                    resultLanguage == "zh" ? `${stopNameZh}` :
                        resultLanguage == "en" ? `${stopNameEn}` :
                            resultLanguage == "comb" ? `${stopNameZh} ${stopNameEn}` : ``
                    : resultDisplayStyle === "multi" ?
                        resultLanguage == "zh" ? `${stopNameZh} ${index != last ? `→` : ``} ${nextStopNameZh}` :
                            resultLanguage == "en" ? `${stopNameEn} ${index != last ? `→` : ``} ${nextStopNameEn}` :
                                resultLanguage == "comb" ? `${stopNameZh} ${stopNameEn} ${index != last ? `→` : ``} ${nextStopNameZh} ${nextStopNameEn}` : ``
                        : ``

            return prevString.concat(display_numeric, display_string, last_stop_separator)
        }, "")

        setFormattedStopInfo(result_string)

        // let formatted = ""
        // stopIDs.forEach((stop, index) => {
        //     if (index == stopIDs.length - 1 && resultLanguage === "comb")
        //         formatted = formatted.concat(`${stopList[stop].name["zh"]} ${stopList[stop].name["en"]}`)
        //     else if (resultLanguage === "comb")
        //         formatted = formatted.concat(`${stopList[stop].name["zh"]} ${stopList[stop].name["en"]}\n`)
        //     else if (index == stopIDs.length - 1)
        //         formatted = formatted.concat(stopList[stop].name[resultLanguage])
        //     else if (resultDisplayStyle === "single")
        //         if (numericDisplay)
        //             formatted = formatted.concat(`${index + 1}. ${stopList[stop].name[resultLanguage]}\n`)
        //         else
        //             formatted = formatted.concat(`${stopList[stop].name[resultLanguage]}\n`)
        //     else if (resultDisplayStyle === "multi")
        //         formatted = formatted.concat(`${stopList[stop].name[resultLanguage]} → ${stopList[stopIDs[index + 1]].name[resultLanguage]}\n`)
        // })
        // setFormattedStopInfo(formatted)
    }, [stopIDs, resultLanguage, resultDisplayStyle, numericDisplay])

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