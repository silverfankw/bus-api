import { useEffect, useRef } from "react"
import useWindowsDimensions from "../hooks/useWindowsDimensions"

const NormalTextArea = props => {
    // const { height } = useWindowsDimensions()
    // const textAreaElem = useRef(null)

    const { placeholder, value, disabled, rows } = props

    // useEffect(() => {
    //     console.log(height)
    // }, [value])

    return (
        <textarea
            className="placeholder:italic placeholder:text-slate-400 rounded-lg mx-3 my-2 pl-2 pt-1 w-11/12 text-sm"
            placeholder={placeholder}
            // ref={textAreaElem}
            value={value}
            disabled={disabled}
            rows={rows}
        ></textarea>
    )
}

export default NormalTextArea;