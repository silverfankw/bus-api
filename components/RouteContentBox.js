import { FormattedMessage } from 'react-intl';
import { useState, useEffect, memo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus, faCopy, faCheck } from '@fortawesome/fontawesome-free-solid'

import NormalButton from "./common/NormalButton"
import NormalTextArea from "./common/NormalTextArea"

const RouteContentBox = props => {
    const { stopIDs, stopList, selectedRoute, resultLanguage, resultDisplayStyle, numericDisplay } = props

    const [formattedStopInfo, setFormattedStopInfo] = useState("")
    const [clickedCopy, setClickedCopy] = useState(false)

    const copyTextContent = e => {
        navigator.clipboard.writeText(formattedStopInfo)
        setClickedCopy(true)
        setTimeout(() => setClickedCopy(false), 2500)
    }

    const exportJSON = () => {
        const stops_detail_json = {
            ...selectedRoute, "stops": stopIDs.map(currID => {
                return { "zh": stopList[currID].name["zh"], "en": stopList[currID].name["en"].toUpperCase() }
            }).concat({ "zh": "", "en": "" }, { "zh": "", "en": "" })
        }

        const file = new File([JSON.stringify(stops_detail_json)], "stop_detail", { type: 'application/json' })
        const url = URL.createObjectURL(file);
        window.open(url, "_blank")
        URL.revokeObjectURL(url);
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
    }, [stopIDs, resultLanguage, resultDisplayStyle, numericDisplay])

    return (
        <div className="container">
            <div className="flex ml-3 mt-2">
                <FontAwesomeIcon className="ml-1 my-1" icon={faBus} />
                <p className="mx-2"><FormattedMessage id="label--stop-info" /></p>
                <NormalButton labelIcon={clickedCopy ? faCheck : faCopy} label={clickedCopy ? `button--copied` : `button--copy`} style={`button ${clickedCopy && `bg-green-700`}`} onClick={copyTextContent} />
                <NormalButton label="button--export-json" style={`button bg-cyan-700 ml-2`} onClick={() => exportJSON()} />
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