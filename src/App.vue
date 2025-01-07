<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
export default defineComponent({
  components: {
    RouterView
  }
})
</script>

<template>
  <RouterView />
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;
}

/* #app {
  display: grid;
  grid-template-rows: max-content 1fr;
  gap: 40px
} */

</style>
