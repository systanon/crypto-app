<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      drawer: false,
      isNavOpen: false
    }
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    }
  }
})
</script>

<template>
  <div class="grid-container">
    <header class="app-header">
      <slot name="header" :toggleNav="toggleNav"></slot>
    </header>
    <nav class="app-navigation" :class="{ open: isNavOpen }">
      <slot name="navigation" :toggleNav="toggleNav"></slot>
    </nav>
    <main class="app-main">
      <slot name="main"></slot>
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

  .app-navigation {
    background-color: blue;
    color: white;
    padding: 20px;
    position: absolute;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 5;
  }

  .app-navigation.open {
    transform: translateX(0);
  }
}
</style>