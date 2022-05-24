import NormalButton from "./NormalButton"
import RadioButton from "./RadioButton"
import Spinner from "./Spinner"
import NormalTextArea from "./NormalTextArea"

const RouteStopList = props => {
    const {stopIDs, language, stopSearching, handleLanguageChange, formattedStopInfo} = props

    const copyTextContent = (e) => {
        navigator.clipboard.writeText(formattedStopInfo)
    }

    return (
        <>
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
    </>
    )
}

export default RouteStopList