const NormalButton = props => (
    <button class="px-3 text-sm rounded-full
    font-semibold text-white 
    bg-sky-700 ring-1 ring-sky-600 
    hover:ring-sky-500/50 hover:bg-sky-600"
        onClick={props.onClick}>
        {props.value}
    </button>
)

export default NormalButton;