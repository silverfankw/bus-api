import { useState, useEffect, useMemo } from "react"
import LZUTF8 from "lzutf8"

import { capitalize } from "../util/util"
import QuerySidebar from "../components/QuerySidebar"
import RouteContentBox from "../components/RouteContentBox"
import RouteResultList from "../components/RouteResultList"

import { getBusDB } from "../api/request"

export default function Home() {

  const [routeResult, setRouteResult] = useState([])
  const [stopList, setStopList] = useState({})

  const [stopIDs, setStopIDs] = useState([])
  const [language, setLanguage] = useState("zh")

  const retrieveData = async () => {
    await getBusDB()
      .then(resp => {
        localStorage.setItem('bus_data', JSON.stringify(resp))
        Object.values(resp.stopList).map(stop => {
          if (stop.name.zh.includes(',')) {
            stop.name.zh = stop.name.zh.split(',')[0]
          }
          if (stop.name.en.includes(',')) {
            stop.name.en = stop.name.en.split(',')[0]
          }
          stop.name.en = capitalize(stop.name.en)
        })
        setStopList(resp.stopList)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    retrieveData()
  }, [])

  return (
    <div className="flex h-screen bg-zinc-600 bg-gradient-to-r from-neutral-600 to-slate-900">
      <QuerySidebar setRouteResult={setRouteResult} />
      <RouteResultList language={language} routeResult={routeResult} setStopIDs={setStopIDs} stopList={stopList} />
      <RouteContentBox language={language} setLanguage={setLanguage} stopList={stopList} stopIDs={stopIDs} />

    </div>
  )
}
