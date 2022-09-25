import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NormalButton = props => {
    const { label, labelIcon, value, style, onClick } = props
    return (
        <button className={`${style}`} onClick={onClick} value={value}>
            {labelIcon && <FontAwesomeIcon className="mr-2 mt-1" icon={labelIcon} />}
            {<FormattedMessage id={label} />}
        </button>


    )
}

export default NormalButton;
