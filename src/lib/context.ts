import { Exchange, Schema, Channel } from '../application/dom'
import type { Ctx } from '../application/dom'
import { ref } from 'vue'
import type { Ref } from 'vue'

const defaultCtx = {
  exchange: Exchange.TBybit,
  schema: Schema.Futures,
  symbol: 'BTCUSDT',
  channel: Channel.Candel
}

export class CTX {
  public exchange: Ref<Exchange>
  public schema: Ref<Schema>
  public symbol: Ref<string>
  public channel: Ref<Channel>

  constructor(ctx: Ctx = defaultCtx) {
    this.exchange = ref(ctx.exchange)
    this.schema = ref(ctx.schema)
    this.symbol = ref(ctx.symbol)
    this.channel = ref(ctx.channel)
  }

  get ctx() {
    return {
      exchange: this.exchange.value,
      schema: this.schema.value,
      symbol: this.symbol.value,
      channel: this.channel.value
    }
  }

  init(ctx: Ctx) {
    this.exchange.value = ctx.exchange
    this.schema.value = ctx.schema
    this.symbol.value = ctx.symbol
    this.channel.value = ctx.channel
  }

  async getConfig(): Promise<void> {
    const context = localStorage.getItem('context')
    if (context) {
      this.init(JSON.parse(context))
    }

    return Promise.resolve()
  }

  setContext(ctx: Ctx) {
    this.exchange = ref(ctx.exchange)
    this.schema = ref(ctx.schema)
    this.symbol = ref(ctx.symbol)
  }
}
