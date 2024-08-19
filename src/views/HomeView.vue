<script lang="ts">
import { defineComponent } from 'vue'
import { useMarketStore } from '../stores/market.store'
import { mapActions, mapState } from 'pinia'
import { Chart } from '../application/chart'
import { bybitAdapter } from '../application'
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
    ...mapState(useMarketStore, ['symbols', 'klines', 'symbol'])
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
    this.chart = new Chart(bybitAdapter, this.$refs['chart'] as HTMLElement)
    if (this.symbol) {
      this.chart.setCtx({
        symbol: this.symbol,
        schema: Schema.Futures,
        exchange: Exchange.TBybit,
        channel: Channel.Candel
      })
    }
  }
})
</script>

<template>
  <div class="kline-page">
    <div class="kline-page__symbols">
      <div class="symbols-header">{{ symbol }}</div>
      <div class="symbols-list">
        <div
          v-for="symbol in symbols"
          :key="symbol.symbol"
          @click="setCurrentSymbol(symbol.symbol)"
        >
          {{ symbol.symbol }}
        </div>
      </div>
    </div>
    <div ref="chart" class="kline-page__klines"></div>
  </div>
</template>


<style scoped>
.kline-page {
  display: flex;
}
.kline-page__klines {
  width: 1000px;
  height: 1000px;
}
</style>
