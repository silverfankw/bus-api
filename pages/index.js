import { useState, useEffect } from "react"
import _ from "lodash"

import { capitalize } from "../util/util"
import QuerySidebar from "../components/QuerySidebar"
import RouteContentBox from "../components/RouteContentBox"
import RouteResultList from "../components/RouteResultList"

import { getBusDB } from "../api/request"

export default function Home() {

  const [routeResult, setRouteResult] = useState([])
  const [routeList, setRouteList] = useState([])
  const [stopList, setStopList] = useState({})

  const [stopIDs, setStopIDs] = useState([])
  const [language, setLanguage] = useState("zh")

  const processStopList = resp => {
    const updatedStops = _.mapValues(resp.stopList, stop => {
      return {...stop, 
        name: {
          zh: stop.name.zh.includes(',') ? stop.name.zh.split(',')[0] : stop.name.zh,
          en: stop.name.en.includes(',') ? capitalize(stop.name.en.split(',')[0]) : capitalize(stop.name.en)
        }
      }
    })

    setStopList(updatedStops)
  }

  const processRouteList = resp => setRouteList(_.values(resp.routeList))

  const retrieveData = async () => {
    await getBusDB()
      .then(resp => {
        processStopList(resp)
        processRouteList(resp)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    retrieveData()
  }, [])

  return (
    <div className="flex h-screen bg-zinc-600 bg-gradient-to-r from-neutral-600 to-slate-900">
      <QuerySidebar routeList={routeList} setRouteResult={setRouteResult} />
      <RouteResultList language={language} routeResult={routeResult} setStopIDs={setStopIDs} stopList={stopList} />
      <RouteContentBox language={language} setLanguage={setLanguage} stopList={stopList} stopIDs={stopIDs} />

    </div>
  )
}
