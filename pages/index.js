import { useState, useEffect } from "react"
import { IntlProvider, FormattedMessage } from "react-intl";
import message_en from '../util/translations/en-us';
import message_zh from '../util/translations/zh-hk';
import _ from "lodash"

import { capitalize } from "../util/util"
import QuerySidebar from "../components/QuerySidebar"
import RouteContentBox from "../components/RouteContentBox"
import RouteResultList from "../components/RouteResultList"

import { getBusDB } from "../api/request"
import NormalButton from "../components/common/NormalButton";

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
      <div className="flex h-25 bg-zinc-600 bg-gradient-to-r from-neutral-600 to-slate-900">
        <div className="rounded-full mx-3 mt-3 w-screen bg-gradient-to-r from-neutral-600 to-slate-900">

          <div className="flex mt-1 justify-center text-white sm:text-2xl font-bold">
            <FormattedMessage id="header--title" />
          </div>
          <div className="flex mt-1 justify-center text-white sm:text-sm font-medium">
            <FormattedMessage id="header--subtitle" />
          </div>
          <div className="flex h-5 justify-end">
            <div className={`border border-solid border-neutral-700 rounded-md mx-1 ${language === `en` ? `bg-emerald-700` : `hover:border-neutral-300 mouse-hover`}`}
              onClick={() => setLanguage("en")}>
              <p className="text-white sm:text-xs mx-2">English</p>
            </div>
            <div className={`border border-solid border-neutral-700 rounded-md mx-1  ${language === `zh` ? `bg-emerald-700` : `hover:border-neutral-300 mouse-hover`}`}
              onClick={() => setLanguage("zh")}>
              <p className="text-white sm:text-xs mx-2">繁體中文</p>
            </div>
          </div>
        </div>

      </div>
      <div className="flex h-screen bg-zinc-600 bg-gradient-to-r from-neutral-600 to-slate-900">
        <QuerySidebar resultLanguage={resultLanguage} setResultLanguage={setResultLanguage}
          resultDisplayStyle={resultDisplayStyle} setResultDisplayStyle={setResultDisplayStyle}
          routeList={routeList} setRouteResult={setRouteResult} />
        <RouteResultList routeResult={routeResult} setStopIDs={setStopIDs} />
        <RouteContentBox resultLanguage={resultLanguage} resultDisplayStyle={resultDisplayStyle} stopList={stopList} stopIDs={stopIDs} />

      </div>
    </IntlProvider>
  )
}
