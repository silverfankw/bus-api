import { useState, useEffect } from "react"
import { IntlProvider } from "react-intl";
import message_en from '../util/translations/en-us';
import message_zh from '../util/translations/zh-hk';
import _ from "lodash"

import { capitalize } from "../util/util"
import QuerySidebar from "../components/QuerySidebar"
import RouteContentBox from "../components/RouteContentBox"
import RouteResultList from "../components/RouteResultList"
import Header from "../components/common/header";

import { getBusDB } from "../api/request"

export default function Home() {
  const [language, setLanguage] = useState("zh")

  const [routeResult, setRouteResult] = useState([])
  const [routeList, setRouteList] = useState([])
  const [stopList, setStopList] = useState({})
  const [stopIDs, setStopIDs] = useState([])

  const [resultLanguage, setResultLanguage] = useState("comb")
  const [resultDisplayStyle, setResultDisplayStyle] = useState("multi")

  const messages = {
    "zh": message_zh,
    "en": message_en
  }

  const processStopList = resp => {
    const updatedStops = _.mapValues(resp.stopList, stop => {
      return {
        ...stop,
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
    <IntlProvider locale={language} messages={messages[language]}>

      <Header language={language} setLanguage={setLanguage} />
      <div className="flex bg-zinc-600 bg-gradient-to-r from-neutral-600 to-slate-900">
        <QuerySidebar resultLanguage={resultLanguage} setResultLanguage={setResultLanguage}
          resultDisplayStyle={resultDisplayStyle} setResultDisplayStyle={setResultDisplayStyle}
          routeList={routeList} setRouteResult={setRouteResult} />
        <RouteResultList routeResult={routeResult} setStopIDs={setStopIDs} />
        <RouteContentBox resultLanguage={resultLanguage} resultDisplayStyle={resultDisplayStyle} stopList={stopList} stopIDs={stopIDs} />

      </div>
    </IntlProvider>
  )
}
