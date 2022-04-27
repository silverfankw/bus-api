import NormalButton from "./NormalButton"
import Spinner from "./Spinner"
import NormalTextArea from "./NormalTextArea"
import RadioButton from "./RadioButton"

import { useState, useEffect, useRef, memo } from "react"

const RouteContentBox = props => {
    const { stopIDs, stopList, stopSearching, language, setLanguage } = props

    const [formattedStopInfo, setFormattedStopInfo] = useState("")

    const copyTextContent = (e) => {
        navigator.clipboard.writeText(formattedStopInfo)
    }

    const handleLanguageChange = value => setLanguage(value)

    useEffect(() => {
        let formatted = ""
        stopIDs.forEach((stop, index) => {
            if (index == stopIDs.length - 1)
                formatted = formatted.concat(stopList[stop].name[language])
            else
                formatted = formatted.concat(`${stopList[stop].name[language]} → ${stopList[stopIDs[index + 1]].name[language]}\n`)
        })
        setFormattedStopInfo(formatted)
    }, [stopIDs, language])

    return (
        <div className="container">
            {/* <div className="m-1 rounded-lg bg-slate-700">
                <nav className="py-2 space-x-2">
                    {[
                        ['路線站位', '/'],
                        ['路線到站預計時間', '/'],
                    ].map(([title, url]) => (
                        <a key={title} href={url} className="text-white text-sm rounded-lg px-3 py-2 bg-slate-700 font-medium 
                        hover:bg-slate-100 hover:text-slate-900 hover:font-bold">{title}</a>
                    ))}
                </nav>
            </div> */}
            <div className="flex mt-2">
                <p className="mx-4 font-bold">站位資料</p>
                <NormalButton value="Copy" onClick={copyTextContent} style="mb-1" />
                <div className="flex mx-3">
                    <RadioButton label="中文" name="language-setting" value="zh" checked={language === "zh"} onChange={() => handleLanguageChange("zh")} />
                    <RadioButton label="英文" name="language-setting" value="en" onChange={() => handleLanguageChange("en")} />
                </div>
            </div>
            {stopSearching ?
                <Spinner /> :
                <NormalTextArea
                    placeholder="No data"
                    value={formattedStopInfo}
                    rows={stopIDs.length}
                    disabled
                />
            }
        </div>
    )
}

export default memo(RouteContentBox);