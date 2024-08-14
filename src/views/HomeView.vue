<script lang="ts">
import { defineComponent } from 'vue'
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { useMarketStore } from '../stores/market.store'
import { mapActions, mapState } from 'pinia'
import { createChart } from 'lightweight-charts'
import { marketService, wsService } from '../application'
import { Chart } from '@/application/chart'

export default defineComponent({
  // setup() {
  //   const marketStore = useMarketStore()

  //   return { marketStore }
  // },
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
      this.chart?.setCTX(v)
    }
  },
  mounted() {
    this.chart = new Chart(this.$refs['chart'] as HTMLElement)

    this.chart.setCTX(this.symbol)
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
