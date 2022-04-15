const KMB_BASE = "https://data.etabus.gov.hk/"
const CTB_NWFB_BASE = "https://rt.data.gov.hk/"
const KMB_API_VER = "v1"
const CTB_NWFB_API_VER = "v1.1"

export const ENDPOINT_KMB_ROUTE = `${KMB_BASE}${KMB_API_VER}/transport/kmb/route/`
export const ENDPOINT_KMB_STOP = `${KMB_BASE}${KMB_API_VER}/transport/kmb/stop/`
export const ENDPOINT_KMB_ROUTE_STOP = `${KMB_BASE}${KMB_API_VER}/transport/kmb/route-stop/`
export const ENDPOINT_KMB_ETA = `${KMB_BASE}${KMB_API_VER}/transport/kmb/eta/`
export const ENDPOINT_KMB_STOP_ETA = `${KMB_BASE}${KMB_API_VER}/transport/kmb/stop-eta/`
export const ENDPOINT_KMB_ROUTE_ETA = `${KMB_BASE}${KMB_API_VER}/transport/kmb/route-eta/`

export const ENDPOINT_CTB_ROUTE = `${CTB_NWFB_BASE}${CTB_NWFB_API_VER}/transport/citybus-nwfb/route/ctb/`
export const ENDPOINT_NWFB_ROUTE = `${CTB_NWFB_BASE}${CTB_NWFB_API_VER}/transport/citybus-nwfb/route/nwfb/`

export const ENDPOINT_CTB_NWFB_ROUTESTOP = `${CTB_NWFB_BASE}${CTB_NWFB_API_VER}/transport/citybus-nwfb/route-stop/`
export const ENDPOINT_CTB_NWFB_STOP = `${CTB_NWFB_BASE}${CTB_NWFB_API_VER}/transport/citybus-nwfb/stop/`