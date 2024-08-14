import { HTTPClient } from '@/lib/http.client'
import url from 'url'
import crypto from 'crypto'
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
  private readonly httpService: HTTPClient
  client: any

  constructor(url: string, httpService: HTTPClient, ws: any) {
    console.log('TCL: WSService -> constructor -> ws', ws)
    this.httpService = httpService
    this.client = ws
    this.client.addEventListener('message', this.handler.bind(this))
  }
  private handler(message: any) {
    if (message.type !== 'message') return

    const data = JSON.parse(message.data)
    const handlers = this.handlers.get(data.topic)
    if (!handlers) return

    const candel = wsKlineFormatter(data.data)

    handlers.forEach((handler) => handler(candel))
  }

  subscribe(topic: string, handler: Function) {
    const exist = this.handlers.has(topic)
    const handlers = this.handlers.get(topic) ?? new Set()
    handlers.add(handler)
    this.handlers.set(topic, handlers)
    if (!exist) {
      this.client.send(JSON.stringify({ op: 'subscribe', args: [topic] }))
    }
    return () => this.unsunscribe(topic, handler)
  }
  unsunscribe(topic: string, handler: Function) {
    const exist = this.handlers.has(topic)
    if (!exist) return
    const handlers = this.handlers.get(topic) ?? new Set()
    handlers.delete(handler)
    if (handlers.size !== 0) return

    this.handlers.delete(topic)
    this.client.send(JSON.stringify({ op: 'unsubscribe', args: [topic] }))
  }

  // open() {
  //   this.client.on('open', () => {
  //     console.log('"open" event!')
  //     console.log('WebSocket Client Connected')
  //     setInterval(() => {
  //       this.client.ping()
  //     }, 30000)
  //     this.client.ping()
  //     this.client.send(JSON.stringify({ op: 'subscribe', args: ['orderbook.50.BTCUSDT'] }))
  //   })
  // }
  // message() {
  //   this.client.on('message', (data) => {
  //     console.log('"message" event! %j', JSON.parse(Buffer.from(data).toString()))
  //   })
  // }
  // ping() {
  //   this.client.on('ping', (data, flags) => {
  //     console.log('ping received')
  //   })
  // }
  // pong() {
  //   this.client.on('pong', (data, flags) => {
  //     console.log('pong received')
  //   })
  // }
}
