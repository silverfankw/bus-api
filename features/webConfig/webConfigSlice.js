import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    language: "zh"
}

export const webConfigSlice = createSlice({
    name: 'webConfig',
    initialState,
    reducers: {
        setLanguage(state, action) {
            // console.log(action)
            state.language = action.payload
        }
    }
})

// Selector function
export const selectLanguage = state => state.webConfig.language

export const { setLanguage } = webConfigSlice.actions

export default webConfigSlice.reducer
