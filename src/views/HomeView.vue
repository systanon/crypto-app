<script lang="ts">
import { defineComponent } from 'vue'
import { useMarketStore } from '../stores/market.store'
import { mapActions, mapState } from 'pinia'
import { Chart } from '../application/chart'
import { bybitAdapter, context } from '../application'
import { Channel, Exchange, Schema } from '../application/dom'

export default defineComponent({
  data() {
    return {
      chart: null as Chart | null
    }
  },
  methods: {
    ...mapActions(useMarketStore, ['fetchSymbols', 'setCurrentSymbol'])
  },
  computed: {
    ...mapState(useMarketStore, ['symbols', 'klines', 'symbol']),
    formatSymbols() {
      return this.symbols.map(({ symbol }) => symbol)
    }
  },
  created() {
    this.fetchSymbols()
  },
  watch: {
    symbol(v: string) {
      this.chart?.setCtx({
        symbol: v,
        schema: Schema.Futures,
        exchange: Exchange.TBybit,
        channel: Channel.Candel
      })
    }
  },
  mounted() {
    const chart = new Chart(bybitAdapter, this.$refs['chart'] as HTMLElement, context)
    chart.init()
    this.chart = chart
  }
})
</script>

<template>
    <div ref="chart" class="kline-page__klines"></div>
</template>

<style scoped>
.kline-page__klines {
height: 100%;
}
</style>
