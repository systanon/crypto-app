import { HTTPClient } from '@/lib/http.client'
// const formatTime = (ts: number) => new Date(ts).toISOString().slice(0, 10)
const formatTime = (ts: number) => Math.trunc(ts / 1000)

const wsKlineFormatter = (data: any) => ({
  start: +data[0].start,
  open: +data[0].open,
  high: +data[0].high,
  low: +data[0].low,
  close: +data[0].close,
  volume: +data[0].volume,
  // time: +data[0].timestamp
  // time: formatTime(+data[0].timestamp)
  time: formatTime(+data[0].start)
})

export class WSService {
  private readonly handlers = new Map<string, Set<Function>>()
  private readonly httpClient: HTTPClient
  private ws: WebSocket

  constructor(httpClient: HTTPClient, ws: WebSocket) {
    console.log('TCL: WSService -> constructor -> ws', ws)
    this.httpClient = httpClient
    this.ws = ws
    this.ws.addEventListener('message', this.handler.bind(this))
  }
  private handler(message: any) {
    if (message.type !== 'message') return

    const data = JSON.parse(message.data)
    const handlers = this.handlers.get(data.topic)
    if (!handlers) return

    const candel = wsKlineFormatter(data.data)

    handlers.forEach((handler) => handler({ action: 'update', data: candel }))
  }

  subscribe(topic: string, handler: Function) {
    const exist = this.handlers.has(topic)
    const handlers = this.handlers.get(topic) ?? new Set()
    handlers.add(handler)
    this.handlers.set(topic, handlers)
    if (!exist) {
      const payload = JSON.stringify({ op: 'subscribe', args: [topic] })
      if (this.ws.readyState !== WebSocket.OPEN)
        this.ws.addEventListener('open', () => this.ws.send(payload))
      else this.ws.send(payload)
    }
    return () => this.unsubscribe(topic, handler)
  }
  unsubscribe(topic: string, handler: Function) {
    const exist = this.handlers.has(topic)
    if (!exist) return
    const handlers = this.handlers.get(topic) ?? new Set()
    handlers.delete(handler)
    if (handlers.size !== 0) return

    this.handlers.delete(topic)
    this.ws.send(JSON.stringify({ op: 'unsubscribe', args: [topic] }))
  }
}
