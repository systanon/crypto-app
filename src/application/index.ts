import { BybitConnector } from './../lib/bybit-sdk/connector'
import { BybitAdapter } from './adapters/bybit.adapter'
import { HTTPClient } from '../lib/http.client'
import { WSService } from '../lib/bybit-sdk/ws.service'
import { CTX } from '../lib/context'

export const httpClient = new HTTPClient({
  base: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const wsUrl = import.meta.env.VITE_APP_WSS_DOMAIN

const WS = new WebSocket(wsUrl)
export const context = new CTX()
export const wsService = new WSService(httpClient, WS)
export const bybitConnector = new BybitConnector(httpClient, wsService)
export const bybitAdapter = new BybitAdapter(bybitConnector)

// export const getContext = () => context

// export const createChart = (element: HTMLElement): Chart => {
//   const chart = new Chart(bybitAdapter, element as HTMLElement, context)
//   chart.init() // Ok!
//   return chart
// }
