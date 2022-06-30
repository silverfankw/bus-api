import { useEffect, useRef } from "react"
import useWindowsDimensions from "../../hooks/useWindowsDimensions"

const NormalTextArea = props => {
    // const { height } = useWindowsDimensions()
    // const textAreaElem = useRef(null)

    const { placeholder, value, disabled, rows, style } = props

    return (
        <div className="mx-3">
            <textarea
                className={`resize-none bg-gray-600	
                placeholder:italic placeholder:text-slate-400 
                rounded-lg my-2 pl-2 pt-1 w-full  col
                text-sm ${style}`}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                rows={40}
            ></textarea >
        </div>
    )
}

export default NormalTextArea;