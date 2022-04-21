import NormalButton from "./NormalButton"
import Spinner from "./Spinner"
import NormalTextArea from "./NormalTextArea"
import RadioButton from "./RadioButton"

import { useState, useEffect, useRef, memo } from "react"

const RouteContentBox = props => {
    const { stopInfo, stopSearching, language, setLanguage } = props

    const [formattedStopInfo, setFormattedStopInfo] = useState("")

    const copyTextContent = (e) => {
        navigator.clipboard.writeText(formattedStopInfo)
    }

    const handleLanguageChange = value => setLanguage(value)

    useEffect(() => {
        let formatted = ""
        stopInfo.forEach((stop, index) => {
            if (index == stopInfo.length - 1)
                formatted = formatted.concat(stop[language])
            else
                formatted = formatted.concat(`${stop[language]} → ${stopInfo[index + 1][language]}\n`)
        })
        setFormattedStopInfo(formatted)
    }, [stopInfo, language])

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
                    <RadioButton label="中文" name="language-setting" value="name_tc" checked={language === "name_tc"} onChange={() => handleLanguageChange("name_tc")} />
                    <RadioButton label="英文" name="language-setting" value="name_en" onChange={() => handleLanguageChange("name_en")} />
                </div>
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