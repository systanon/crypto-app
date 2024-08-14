import { marketService, wsService } from '@/application'
import { defineStore } from 'pinia'

export type Symbol = {
  symbol: string
}
export type KLine = {
  start: number
}

export const useMarketStore = defineStore('market', {
  state: () => {
    return {
      symbols: [] as Array<Symbol>,
      klines: [] as Array<KLine>,
      symbol: ''
      // index: new Map(),
      // total: 0,
      // pages: 1,
      // favorites: new Set(),
    }
  },
  actions: {
    fetchSymbols() {
      marketService.getAll().then(({ body }) => {
        console.log('TCL: fetchSymbols -> body', body)
        this.symbols = body.result.list
        this.setCurrentSymbol('BTCUSDT')
      })
    },
    setCurrentSymbol(symbol: string) {
      // ;(window as any).off?.()
      this.symbol = symbol
      // marketService.getKlines(symbol).then(({ list }) => {
      //   console.log('TCL: setCurrentSymbol -> list', list)
      //   this.klines = list
      //   ;(window as any).off = wsService.subscribe(`kline.1.${symbol}`, (data: any) => {
      //     console.log(data)
      //     this.klines.push(data)
      //   })
      // })
    }
  }
})
