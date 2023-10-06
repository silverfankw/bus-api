import { useState, useEffect } from "react"
import { IntlProvider } from "react-intl";
import _ from "lodash"

import { useSelector, useDispatch } from "react-redux";
import { selectLanguage } from "../features/webConfig/webConfigSlice"
import {
  selectRouteList, selectRouteResult, selectStopIDs, selectStopList, selectSelectedRoute,
  setRouteList, setStopList,
} from "../features/routeInfo/routeInfoSlice"
import { selectNumericDisplay, selectResultDisplayStyle, selectResultLanguage }
  from "../features/resultDisplayConfig/resultDisplayConfigSlice";

import message_en from '../util/translations/en-us';
import message_zh from '../util/translations/zh-hk';

import { capitalize } from "../util/util"
import QuerySidebar from "../components/QuerySidebar"
import RouteContentBox from "../components/RouteContentBox"
import RouteResultList from "../components/RouteResultList"
import Header from "../components/common/Header";

import { getBusDB } from "../api/request"


export default function Home() {

  const language = useSelector(selectLanguage)

  const routeList = useSelector(selectRouteList)
  const routeResult = useSelector(selectRouteResult)
  const stopList = useSelector(selectStopList)
  const stopIDs = useSelector(selectStopIDs)
  const selectedRoute = useSelector(selectSelectedRoute)

  const numericDisplay = useSelector(selectNumericDisplay)
  const resultLanguage = useSelector(selectResultLanguage)
  const resultDisplayStyle = useSelector(selectResultDisplayStyle)

  const dispatch = useDispatch()

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

    dispatch(setStopList(updatedStops))
  }

  const processRouteList = resp => dispatch(setRouteList(_.values(resp.routeList)))

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
      <Header language={language} />
      <div className="flex bg-zinc-600 bg-gradient-to-r from-neutral-600 to-slate-900">
        <QuerySidebar routeList={routeList} resultLanguage={resultLanguage}
          resultDisplayStyle={resultDisplayStyle} numericDisplay={numericDisplay} />
        <RouteResultList routeResult={routeResult} language={language} />
        <RouteContentBox resultLanguage={resultLanguage} resultDisplayStyle={resultDisplayStyle}
          stopList={stopList} stopIDs={stopIDs} selectedRoute={selectedRoute} numericDisplay={numericDisplay} />
      </div>
    </IntlProvider>

  )
}
