import { FormattedMessage } from 'react-intl';

const RadioButton = props => {
    const { labelId, value, name, checked, onChange } = props

    return (
        <div className="flex mx-1">

            <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="radio" name={name} value={value} checked={checked} onChange={onChange} />

            {/* <input className="my-1" type="radio" name={name} value={value} checked={checked} onChange={onChange} /> */}
            <label className="mx-1 text-white text-sm"><FormattedMessage id={labelId} />{ }</label>
        </div>
    )
}

export default RadioButton