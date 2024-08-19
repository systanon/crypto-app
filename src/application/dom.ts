import type { Response } from '@/lib/bybit-sdk/connector'

export type Candel = {
  time: string
  high: number
  close: number
  open: number
  low: number
  volume: number
}

export type Symbol = {
  exchange: Exchange
  schema: Schema
  symbol: string
}

export type Action = 'snapshot' | 'insert' | 'update' | 'upsert' | 'delete' | 'reset'

export enum Exchange {
  Binance,
  Bybit,
  TBinance,
  TBybit
}

export enum Schema {
  Margin,
  Futures,
  Spot
}

export enum Channel {
  Candel,
  Symbol,
  SymbolInfo
}

export type Message<T> =
  | {
      exchange: Exchange
      schema: Schema
      channel: Channel
      symbol: string
      action: 'snapshot'
      data: Array<T>
    }
  | {
      exchange: Exchange
      schema: Schema
      channel: Channel
      symbol: string
      action: 'reset'
      data: never
    }
  | {
      exchange: Exchange
      schema: Schema
      channel: Channel
      symbol: string
      action: 'insert' | 'update' | 'upsert' | 'delete'
      data: T
    }

export type Ctx = {
  exchange: Exchange
  schema: Schema
  channel: Channel
  symbol: string
}

export type Handler<T> = (message: Message<T>) => void

export interface ExchangeAdapter {
  getSymbols(ctx: Pick<Ctx, 'schema' | 'symbol'>): Promise<Response>
  getCandels(
    ctx: Pick<Ctx, 'schema' | 'symbol'>,
    start: number,
    end: number
  ): Promise<Array<Candel>>
  subscribeCandel(ctx: Pick<Ctx, 'schema' | 'symbol'>, handler: Handler<Candel>): () => void
  unsubscribeCandel(ctx: Pick<Ctx, 'schema' | 'symbol'>, handler: Handler<Candel>): void
}
