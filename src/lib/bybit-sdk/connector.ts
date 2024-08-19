import type { HTTPClient } from '../http.client'
export type Category = 'spot' | 'linear' | 'inverse'

const formatTime = (ts: number) => Math.trunc(ts / 1000)

const restKlineFormatter = (data: any) => {
  console.log('TCL: restKlineFormatter -> data', data.list[0])
  data.list = data.list.map(([start, open, high, low, close, volume, turnover]: Array<any>) => ({
    start: +start,
    open: +open,
    high: +high,
    low: +low,
    close: +close,
    volume: +volume,
    // turnover,
    time: formatTime(+start)
    // time: +start
    // timestamp: +start
  }))
  return data
}

export type Symbol = {
  symbol: string
  baseCoin: string
  contractType: string
  copyTrading: string
  deliveryFeeRate: string
  deliveryTime: string
  fundingInterval: number
  isPreListing: boolean
  launchTime: string
  leverageFilter: {
    minLeverage: string
    maxLeverage: string
    leverageStep: string
  }
  lotSizeFilter: {
    maxOrderQty: string
    minOrderQty: string
    qtyStep: string
    postOnlyMaxOrderQty: string
    maxMktOrderQty: string
  }
  lowerFundingRate: string
  preListingInfo: string | null
  priceFilter: {
    minPrice: string
    maxPrice: string
    tickSize: string
  }
  priceScale: string
  quoteCoin: string
  settleCoin: string
  unifiedMarginTrade: boolean
  upperFundingRate: string
}

export type Body = {
  result: {
    category: string
    list: Array<Symbol>
    nextPageCursor: string
  }
  retCode: number
  retExtInfo: Object
  retMsg: string
  time: number
}

export type Response = {
  body: Body
}

export type KLineResponse = {
  category: Category
  symbol: string
  list: [
    string, // startTime	string	Start time of the candle (ms)
    string, // openPrice	string	Open price
    string, // highPrice	string	Highest price
    string, // lowPrice	string	Lowest price
    string, // closePrice	string	Close price. Is the last traded price when the candle is not closed
    string, // volume	string	Trade volume. Unit of contract: pieces of contract. Unit of spot: quantity of coins
    string // turnover	string	Turnover. Unit of figure: quantity of quota coin
  ] // Tuple
}

export type WSKLineMessage = {
  topic: string //	Topic name
  type: string //	Data type. snapshot
  ts: number //The timestamp (ms) that the system generates the data
  data: [
    {
      start: number //	The start timestamp (ms)
      end: number //	The end timestamp (ms)
      interval: string //	Kline interval
      open: string //	Open price
      close: string //	Close price
      high: string //	Highest price
      low: string //	Lowest price
      volume: string //	Trade volume
      turnover: string //	Turnover
      confirm: boolean //	Weather the tick is ended or not
      timestamp: number //	The timestamp (ms) of the last matched order in the candle
    }
  ]
}

export type Cb = (kline: WSKLineMessage) => void

export class BybitConnector {
  private readonly httpClient: HTTPClient
  wsService: any
  constructor(httpClient: HTTPClient, wsService: any) {
    this.httpClient = httpClient
    this.wsService = wsService
  }
  async getAll(): Promise<Response> {
    const url = '/market/instruments-info?category=linear'
    const response = await this.httpClient.jsonDo(url)
    return response
  }

  async getKlines(symbol: string, category: string): Promise<any> {
    console.log('TCL: BybitConnector -> symbol', symbol)
    if (!symbol) return
    const url = `/market/kline?category=${category}&symbol=${symbol}&interval=1&limit=20`
    const response = await this.httpClient.jsonDo(url)
    console.log('TCL: MarketService -> response', response)
    return restKlineFormatter(response.body.result)
  }

  subscribe(topic: string, handler: Function) {
    console.log('TCL: BybitConnector -> subscribe -> topic', topic)
    this.wsService.subscribe(topic, handler)
    return () => this.unsubscribe(topic, handler)
  }
  unsubscribe(topic: string, handler: Function) {
    this.wsService.unsubscribe(topic, handler)
  }
}
