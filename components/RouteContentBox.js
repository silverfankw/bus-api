import NormalButton from "./NormalButton"
import Spinner from "./Spinner"
import NormalTextArea from "./NormalTextArea"

import { useState, useEffect, useRef, memo } from "react"

const RouteContentBox = props => {
    const { stopInfo, stopSearching } = props

    const [formattedStopInfo, setFormattedStopInfo] = useState("")

    const copyTextContent = (e) => {
        navigator.clipboard.writeText(formattedStopInfo)
    }

    useEffect(() => {
        let formatted = ""
        stopInfo.forEach((stop, index) => {
            if (index == stopInfo.length - 1)
                formatted = formatted.concat(stop)
            else
                formatted = formatted.concat(`${stop} → ${stopInfo[index + 1]}\n`)
        })
        setFormattedStopInfo(formatted)
    }, [stopInfo])

    return (
        <div className="container">
            <div className="flex mt-2">
                <p className="mx-4 font-bold">站位資料</p>
                <NormalButton value="Copy" onClick={copyTextContent} style="mb-1" />
            </div>
            {stopSearching ?
                <Spinner /> :
                <NormalTextArea
                    placeholder="No data"
                    value={formattedStopInfo}
                    rows={stopInfo.length}
                    disabled
                />
            }
        </div>
    )
}

export default memo(RouteContentBox);