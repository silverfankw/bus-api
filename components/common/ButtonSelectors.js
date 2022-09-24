import { FormattedMessage } from "react-intl";
import NormalButton from "./NormalButton";

const ButtonSelectors = props => {

    const { labelId, option, style, modalHandler } = props

    return (
        <>
            {
                labelId &&
                <div className="flex mx-3 mt-4">
                    {/* Radio label to indicate what value will be set */}
                    <label className={`text-white sm:text-sm mr-2 font-bold ${modalHandler && `cursor-help`}`} onMouseOver={modalHandler} onMouseOut={modalHandler}>
                        <FormattedMessage id={labelId} /></label>
                </div>
            }

            {/* Dynamically generated radio button based on option passed */}
            <div className="flex mt-1 mx-2">
                {option?.map((o, i) => (
                    <NormalButton key={`button-${i}`} style={`border-0.5 border-solid border-neutral-500 rounded-md mx-1 ${style} ${o.checked && `bg-green-700 font-bold`}`}
                        label={o?.labelId} value={o?.value} onClick={o?.onChange} modalHandler />
                ))}
            </div>
        </>
    )
}

export default ButtonSelectors