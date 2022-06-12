const NormalButton = props => {
    const { value, style, onClick } = props
    return (
        <button
            className={`px-3 text-sm rounded-full
                font-semibold text-white 
                bg-sky-700 ring-1 ring-sky-600 
                transition ease-in-out 
                hover:ring-sky-500/50 hover:bg-sky-600 hover:scale-110 duration-500
                ${style}`
            }
            onClick={onClick}>
            {value}
        </button>
    )
}

export default NormalButton;