import { bybitAdapter } from '@/application'
import type { Symbol } from '../lib/bybit-sdk/connector'
import { defineStore } from 'pinia'
import type { Body } from '@/lib/bybit-sdk/connector'

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
      bybitAdapter.getSymbols().then(({ body }: { body: Body }) => {
        console.log('TCL: fetchSymbols -> body', body)
        this.symbols = body.result.list
        this.setCurrentSymbol('BTCUSDT')
      })
    },
    setCurrentSymbol(symbol: string) {
      this.symbol = symbol
    }
  }
})
