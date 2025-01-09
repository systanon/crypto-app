<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue';

type Layouts = 'main'

export default defineComponent({
  components: {
    RouterView
  },
  computed: {
    component() {
      const layout = (this.$route.meta.layout || 'main') as Layouts
      const activeLayout: Record<Layouts, any> = { 'main': MainLayout}
      return activeLayout[layout]
    },
  }
  })
</script>

<template>
  <component :is="component">
    <RouterView />
  </component>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

</style>
