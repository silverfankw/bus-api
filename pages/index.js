import QuerySidebar from "../components/QuerySidebar"
import RouteContentBox from "../components/RouteContentBox"
import RouteResultList from "../components/RouteResultList"
import { useState, useEffect } from "react"

export default function Home() {

  const [routeResult, setRouteResult] = useState([])
  const [stopInfo, setStopInfo] = useState([])
  const [routeSearching, setRouteSearching] = useState(false)
  const [stopSearching, setStopSearching] = useState(false)

  useEffect(() => {

  }, [])

  return (
    <div className="flex h-screen bg-slate-100 bg-slate-600">
      <QuerySidebar setRouteSearching={setRouteSearching} setRouteResult={setRouteResult} />
      <RouteResultList routeSearching={routeSearching} setStopSearching={setStopSearching} routeResult={routeResult} setStopInfo={setStopInfo} />
      <RouteContentBox stopSearching={stopSearching} stopInfo={stopInfo} />

    </div>
  )
}
