import NormalButton from "./NormalButton"
import { useState, useEffect, useRef, memo } from "react"

const RouteContentBox = props => {
    const stopInfo = props.stopInfo
    const textAreaElem = useRef(null)

    const [formattedStopInfo, setFormattedStopInfo] = useState("")
    // console.log(stopInfo)

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
                <p className="mx-4">站位資料</p>
                <NormalButton value="Copy" onClick={copyTextContent} style="mb-1" />
            </div>
            <textarea
                className="rounded-lg mx-3 my-2 pl-2 pt-1 w-11/12 text-sm"
                ref={textAreaElem}
                value={formattedStopInfo}
                rows={stopInfo.length > 40 ? 40 : stopInfo.length}
                disabled
            ></textarea>
        </div>
    )
}

export default memo(RouteContentBox);