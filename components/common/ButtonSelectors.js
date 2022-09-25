import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NormalButton from "./NormalButton";

const ButtonSelectors = props => {

    const { labelIcon, labelId, option, style, modalHandler } = props

    return (
        <>
            {
                labelId &&
                <div className="flex my-2 mt-4">
                    {/* Radio label to indicate what value will be set */}
                    <FontAwesomeIcon className="my-0.5" icon={labelIcon} />
                    <label className={`text-white sm:text-sm ml-2  ${modalHandler && `cursor-help`}`} onMouseOver={modalHandler} onMouseOut={modalHandler}>
                        <FormattedMessage id={labelId} /></label>
                </div>
            }

            {/* Dynamically generated radio button based on option passed */}
            <div className="flex">
                {option?.map((o, i) => (
                    <NormalButton key={`button-${i}`} style={`border-0.5 border-solid border-neutral-500 rounded-md mx-0.5 ${style} ${o.checked && `bg-green-700 font-bold`}`}
                        label={o?.labelId} value={o?.value} onClick={o?.onChange} modalHandler />
                ))}
            </div>
        </>
    )
}

export default ButtonSelectors