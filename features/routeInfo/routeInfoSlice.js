import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    routeResult: [],
    routeList: [],
    stopList: {},
    stopIDs: [],
    selectedRoute: {},
}

export const routeInfoSlice = createSlice({
    name: "routeInfo",
    initialState,
    reducers: {
        setRouteResult(state, action) {
            state.routeResult = action.payload
        },
        setRouteList(state, action) {
            state.routeList = action.payload
        },
        setStopList(state, action) {
            state.stopList = action.payload
        },
        setStopIDs(state, action) {
            state.stopIDs = action.payload
        },
        setSelectedRoute(state, action) {
            state.selectedRoute = action.payload
        },
    }
})

// Selector function
export const selectRouteResult = state => state.routeInfo.routeResult
export const selectRouteList = state => state.routeInfo.routeList
export const selectStopList = state => state.routeInfo.stopList
export const selectStopIDs = state => state.routeInfo.stopIDs
export const selectSelectedRoute = state => state.routeInfo.selectedRoute

export const { setRouteResult, setRouteList, setStopList, setStopIDs, setSelectedRoute } = routeInfoSlice.actions

export default routeInfoSlice.reducer