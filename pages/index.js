import QuerySidebar from "../components/QuerySidebar"
import RouteContentBox from "../components/RouteContentBox"
import RouteResultList from "../components/RouteResultList"
import { useState } from "react"

export default function Home() {

  const [routeResult, setRouteResult] = useState([])
  const [stopInfo, setStopInfo] = useState([])

  return (
    <div className="flex h-screen bg-slate-100 bg-slate-600">
      <QuerySidebar setRouteResult={setRouteResult} />
      <RouteResultList routeResult={routeResult} setStopInfo={setStopInfo} />
      <RouteContentBox stopInfo={stopInfo} />

    </div>
  )
}
