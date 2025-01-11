<script lang="ts">
import { defineComponent } from 'vue'
import UIButtonIcon from '@/components/ui/buttons/UIButtonIcon.vue'
import UIButtonTheme from './UIButtonTheme.vue';

export default defineComponent({
  emits: ['handleClick'],
  components: {
    UIButtonIcon,
    UIButtonTheme
  },
  })
</script>

<template>
  <header class="app-header">
    <UIButtonIcon icon-name="rotate-burger" @click="$emit('handleClick')" />
    <UIButtonTheme/>
  </header>
  
</template>

<style scoped>
.app-header {
  padding: 1em;
  display: flex;
  justify-content: space-between;
}
</style>