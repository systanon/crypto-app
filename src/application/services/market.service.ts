import { HTTPClient } from '../../lib/http.client'
// const formatTime = (ts: number) => new Date(ts).toISOString().slice(0, 10)
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

export class MarketService {
  private client: HTTPClient
  constructor(client: HTTPClient) {
    this.client = client
  }

  async getAll(): Promise<any> {
    const url = '/market/instruments-info?category=linear'
    const response = await this.client.jsonDo(url)
    return response
  }
  async getKlines(symbol: string): Promise<any> {
    if (!symbol) return
    const url = `/market/kline?category=linear&symbol=${symbol}&interval=1&limit=20`
    const response = await this.client.jsonDo(url)
    console.log('TCL: MarketService -> response', response)
    return restKlineFormatter(response.body.result)
  }
}
