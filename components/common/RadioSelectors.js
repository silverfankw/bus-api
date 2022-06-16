import RadioButton from "./RadioButton"
import { FormattedMessage } from "react-intl";

/*
    label prop is the general description of this group of radio buttons.

    option prop is an object and must include following fields:
        name:       indicator to group all radio buttons
        labelId:    label-id used in react-intl to be shown beside the radio button
        value:      will be used to control internal logic
        checked:    determine the radio button is selected or not
        onChange:   triggered the callback function
*/

const RadioSelectors = props => {

    const { labelId, option, modalHandler } = props

    return (
        <>
            <div className="flex mx-3 mt-4">
                {/* Radio label to indicate what value will be set */}
                <label className={`text-white sm:text-sm mr-2 font-bold ${modalHandler && `cursor-help`}`} onMouseOver={modalHandler} onMouseOut={modalHandler}>
                    <FormattedMessage id={labelId} /></label>
            </div>
            {/* Dynamically generated radio button based on option passed */}
            <div className="flex mt-1 mx-2">
                {option?.map((o, i) => (
                    <RadioButton key={`radio-${i}`} labelId={o?.labelId} name={o?.name} value={o?.value} checked={o?.checked ?? false} onChange={o?.onChange} />
                ))}
            </div>
        </>
    )
}

export default RadioSelectors