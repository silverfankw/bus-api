import { FormattedMessage } from 'react-intl';

const NormalButton = props => {
    const { label, value, style, onClick } = props
    return (
        <button className={`${style}`} onClick={onClick} value={value}>
            {<FormattedMessage id={label} />}
        </button>


    )
}

export default NormalButton;
