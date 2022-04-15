import { useState, useEffect } from "react"
import LZUTF8 from "lzutf8"

import QuerySidebar from "../components/QuerySidebar"
import RouteContentBox from "../components/RouteContentBox"
import RouteResultList from "../components/RouteResultList"

import { searchRouteList } from "../api/request"
import {
  ENDPOINT_KMB_ROUTE as KMB,
  ENDPOINT_CTB_ROUTE as CTB,
  ENDPOINT_NWFB_ROUTE as NWFB
} from "../api/const"

export default function Home() {

  const [routeResult, setRouteResult] = useState([])
  const [stopInfo, setStopInfo] = useState([])
  const [routeSearching, setRouteSearching] = useState(false)
  const [stopSearching, setStopSearching] = useState(false)

  const initRoutesList = async () => {
    await Promise.all(
      [searchRouteList(KMB), searchRouteList(CTB), searchRouteList(NWFB)]
    )
      .then(resp => localStorage.setItem('routes', LZUTF8.compress(JSON.stringify(resp.flat()), { outputEncoding: "Base64" })))
      // .then(resp => localStorage.setItem('routes', JSON.stringify(resp.flat())))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    initRoutesList()
  }, [])

  return (
    <div className="flex h-screen bg-zinc-600">
      <QuerySidebar setRouteSearching={setRouteSearching} setRouteResult={setRouteResult} />
      <RouteResultList routeResult={routeResult} routeSearching={routeSearching} setStopSearching={setStopSearching} setStopInfo={setStopInfo} />
      <RouteContentBox stopSearching={stopSearching} stopInfo={stopInfo} />

    </div>
  )
}
