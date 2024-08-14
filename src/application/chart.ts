import { createChart } from 'lightweight-charts'
import type {
  IChartApi,
  ISeriesApi,
  SeriesType,
  Time,
  MouseEventParams,
  DeepPartial,
  ChartOptions
} from 'lightweight-charts'
import { marketService, wsService } from '.'

export class Chart {
  unsubscribe = () => {}
  private readonly chart: IChartApi
  // private series: ISeriesApi<"Candlestick", HorzScaleItem>
  private series: ReturnType<typeof this.chart.addCandlestickSeries> | null = null
  constructor(htmlElement: HTMLElement, options?: DeepPartial<ChartOptions>) {
    this.chart = createChart(htmlElement, options)
  }
  public setCTX(symbol: string) {
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
    marketService.getKlines(symbol).then((result) => {
      if (!result) return
      console.log('TCL: setCurrentSymbol -> list', result.list)
      // this.cache = result.list[0]
      this.series?.setData(result.list.reverse())
      this.chart.timeScale().fitContent()
      this.unsubscribe = wsService.subscribe(`kline.1.${symbol}`, (data: any) => {
        console.log(data)
        this.series?.update(data)
      })
    })
  }
}
