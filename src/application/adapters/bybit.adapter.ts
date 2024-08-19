import type { Category, Response } from './../../lib/bybit-sdk/connector'
import type { BybitConnector } from '@/lib/bybit-sdk/connector'
import type { Candel, Ctx, ExchangeAdapter, Handler } from '../dom'
import { Schema } from '../dom'

const categories: Record<Schema, Category | null> = {
  [Schema.Spot]: 'spot',
  [Schema.Margin]: null,
  [Schema.Futures]: 'linear'
}

const schemaToCategory = (schema: Schema): Category | null => categories[schema] ?? null

export class BybitAdapter implements ExchangeAdapter {
  bybitConnector: BybitConnector
  constructor(bybitConnector: BybitConnector) {
    this.bybitConnector = bybitConnector
  }
  async getSymbols(): Promise<Response> {
    return await this.bybitConnector.getAll()
  }
  async getCandels(
    ctx: Pick<Ctx, 'schema' | 'symbol'>,
    start: number,
    end: number
  ): Promise<Array<Candel>> {
    const category = schemaToCategory(ctx.schema)
    console.log('TCL: BybitAdapter -> category', category)
    if (!category) return []
    const response = await this.bybitConnector.getKlines(ctx.symbol, category)
    return response.list
  }
  subscribeCandel(ctx: Pick<Ctx, 'schema' | 'symbol'>, handler: Handler<Candel>): () => void {
    const topic = `kline.1.${ctx.symbol}`
    this.bybitConnector.subscribe(topic, handler)
    return () => this.unsubscribeCandel(ctx, handler)
  }
  unsubscribeCandel(ctx: Pick<Ctx, 'schema' | 'symbol'>, handler: Handler<Candel>): void {
    const topic = `kline.1.${ctx.symbol}`
    this.bybitConnector.unsubscribe(topic, handler)
  }
}
