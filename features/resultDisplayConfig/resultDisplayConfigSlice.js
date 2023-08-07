import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    numericDisplay: false,
    resultLanguage: "comb",
    resultDisplayStyle: "multi",
}

export const resultDisplayConfigSlice = createSlice({
    name: "resultDisplayConfig",
    initialState,
    reducers: {
        setNumericDisplay(state, action) {
            state.numericDisplay = action.payload
        },
        setResultLanguage(state, action) {
            state.resultLanguage = action.payload
        },
        setResultDisplayStyle(state, action) {
            state.resultDisplayStyle = action.payload
        }
    }
})

// Selector function
export const selectNumericDisplay = state => state.resultDisplayConfig.numericDisplay
export const selectResultLanguage = state => state.resultDisplayConfig.resultLanguage
export const selectResultDisplayStyle = state => state.resultDisplayConfig.resultDisplayStyle

export const { setNumericDisplay, setResultLanguage, setResultDisplayStyle } = resultDisplayConfigSlice.actions

export default resultDisplayConfigSlice.reducer