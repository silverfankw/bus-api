const RadioButton = props => {
    const { label, value, name, checked, onChange } = props

    return (
        <div className="flex">
            <input className="my-1" type="radio" name={name} value={value} checked={checked} onChange={onChange} />
            <label className="mx-1 text-white text-sm">{label}</label>
        </div>
    )
}

export default RadioButton