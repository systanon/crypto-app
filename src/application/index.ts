import { HTTPClient } from '../lib/http.client'
import { MarketService } from './services/market.service'
import { WSService } from './services/ws.service'
// import WebSocket2 from 'ws'

export const httpClient = new HTTPClient({
  base: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const wsUrl = import.meta.env.VITE_APP_WSS_DOMAIN

const WS = new WebSocket(wsUrl)

export const marketService = new MarketService(httpClient)
export const wsService = new WSService(wsUrl, httpClient, WS)



// isTrusted
// : 
// true
// bubbles
// : 
// false
// cancelBubble
// : 
// false
// cancelable
// : 
// false
// composed
// : 
// false
// currentTarget
// : 
// WebSocket {url: 'wss://stream-testnet.bybit.com/v5/public/linear', readyState: 1, bufferedAmount: 0, onopen: null, onerror: null, …}
// data
// : 
// "{\"topic\":\"orderbook.50.BTCUSDT\",\"type\":\"delta\",\"ts\":1723224177793,\"data\":{\"s\":\"BTCUSDT\",\"b\":[],\"a\":[[\"61250.30\",\"0.002\"],[\"61928.50\",\"0\"]],\"u\":1164581,\"seq\":9341228167},\"cts\":1723224177788}"
// defaultPrevented
// : 
// false
// eventPhase
// : 
// 0
// lastEventId
// : 
// ""
// origin
// : 
// "wss://stream-testnet.bybit.com"
// ports
// : 
// []
// returnValue
// : 
// true
// source
// : 
// null
// srcElement
// : 
// WebSocket {url: 'wss://stream-testnet.bybit.com/v5/public/linear', readyState: 1, bufferedAmount: 0, onopen: null, onerror: null, …}
// target
// : 
// WebSocket {url: 'wss://stream-testnet.bybit.com/v5/public/linear', readyState: 1, bufferedAmount: 0, onopen: null, onerror: null, …}
// timeStamp
// : 
// 11344.89999999851
// type
// : 
// "message"
// userActivation
// : 
// null