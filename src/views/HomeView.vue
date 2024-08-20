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
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-skeleton-loader :loading="!formatSymbols.length" type="list-item-two-line"> -->
        <!-- <div class="symbols-header">{{ symbol }}</div> -->
         <v-row>
          <v-col cols="4">
            <v-select
              :value="symbol"
              :items="formatSymbols"
              @update:modelValue="setCurrentSymbol"
              label="Symbols"
              ></v-select>

          </v-col>

         </v-row>
          <!-- label="Symbols" -->
      <!-- </v-skeleton-loader> -->
      <!-- :loading="!formatSymbols.length" -->
    </div>
    <div ref="chart" class="kline-page__klines"></div>
  </div>
</template>

<style scoped>
.kline-page {
  display: grid;
  grid-template-rows: min-content auto;
}

</style>
