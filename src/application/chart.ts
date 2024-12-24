import { createChart } from 'lightweight-charts'
import type { Candel, Ctx, ExchangeAdapter, Message } from './dom'

import type { IChartApi, DeepPartial, ChartOptions } from 'lightweight-charts'
import type { CTX } from '@/lib/context'

export class Chart {
  unsubscribe = () => {}
  private readonly exchange: ExchangeAdapter
  private readonly chart: IChartApi
  private series: ReturnType<typeof this.chart.addCandlestickSeries> | null = null
  public context: CTX
  constructor(
    exchange: ExchangeAdapter,
    htmlElement: HTMLElement,
    context: CTX,
    options?: DeepPartial<ChartOptions>
  ) {
    this.exchange = exchange
    this.chart = createChart(htmlElement, options)
    this.context = context
  }
  public init() {
    const ctx = this.context.ctx
    this.setCtx(ctx)
  }
  public async setCtx(ctx: Ctx) {
    const caldels = await this.exchange.getCandels(ctx, 0, 1)
    this.context.setContext(ctx)

    this.unsubscribe()
    if (this.series) {
      this.chart.removeSeries(this.series)
    }

    this.series = this.chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350'
    })

    this.series?.setData(caldels.reverse())
    this.chart.timeScale().fitContent()

    this.unsubscribe = this.exchange.subscribeCandel(ctx, (message: Message<Candel>) => {
      console.log('TCL: Chart -> publicsetCtx -> message', message)
      switch (message.action) {
        case 'snapshot':
          // const candels = message.data
          // setData
          break
        case 'insert':
          // const candel = message.data
          //insert

          break
        case 'update':
          // const candel = message.data
          //update
          try {
            this.series?.update(message.data)
          } catch (e) {
            console.warn(e)
          }
          break
        case 'upsert':
          // const candel = message.data
          //upsert
          break
        case 'delete':
          // const candel = message.data
          // delete
          break
        case 'reset':
          // const candel = message.data
          // reset
          break
        default:
          console.error('Error', message)
          break
      }
    })
  }
}
