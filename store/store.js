import { configureStore } from "@reduxjs/toolkit"
import webConfigSlice from "../features/webConfig/webConfigSlice"
import routeInfoSlice from "../features/routeInfo/routeInfoSlice"
import resultDisplayConfigSlice from "../features/resultDisplayConfig/resultDisplayConfigSlice"

const store = configureStore({
    reducer: {
        webConfig: webConfigSlice,
        routeInfo: routeInfoSlice,
        resultDisplayConfig: resultDisplayConfigSlice,
    }
})

export default store