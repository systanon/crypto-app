<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useMarketStore } from '../stores/market.store'

import MainHeader from '@/components/MainHeader.vue'
import MainMenu from '@/components/MainMenu.vue';

export default defineComponent({
  components: {
    MainHeader,
    MainMenu
  },
  data() {
    return {
      drawer: false,
      isNavOpen: false
    }
  },
  methods: {
    ...mapActions(useMarketStore, ['setCurrentSymbol']),
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    }
  },
  computed: {
    ...mapState(useMarketStore, ['symbols', 'klines', 'symbol']),
    formatSymbols() {
      return this.symbols.map(({ symbol }) => symbol)
    }
  },
})
</script>

<template>
  <div class="grid-container">
    <MainHeader @handleClick="toggleNav" class="app-header"/>
    <MainMenu @setCurrentSymbol="setCurrentSymbol" :symbols="formatSymbols" :symbol="symbol" @handleClick="toggleNav" :isNavOpen="isNavOpen"/>
    <main class="app-main">
      <RouterView/>
    </main>
    <footer class="app-footer"> <slot name="footer"></slot></footer>

  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr auto;

  .app-header {
    grid-column: 1/-1;
  }

  .burger-menu {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: white;
  }

  .app-main {
    grid-column: 1/-1;
  }

  .app-footer {
    grid-column: 1/-1;
  }
}
</style>