<script lang="ts">
import { defineComponent } from 'vue'
import UISelect  from '@/components/ui/select/UISelect.vue'
import UIButtonIcon from '@/components/ui/buttons/UIButtonIcon.vue'

export default defineComponent({
  name: "MainMenu",
  emits: ['handleClick', 'setCurrentSymbol'],
  components: {
    UIButtonIcon,
    UISelect,
  },
  props: {
    isNavOpen: {
      type: Boolean,
      default: false,
    },
    symbol: {
      type: String,
      default: ''
    },
    symbols: {
      type: Array as () => string[],
      default: () => []
    }
  },
})
</script>

<template>
    <aside class="app-menu" :class="{ open: isNavOpen }">
      <UIButtonIcon icon-name="close-circle" @click="$emit('handleClick')" />
           <UISelect :modelValue="symbol" :options="symbols"
      @update:modelValue="$emit('setCurrentSymbol', $event)"/>
    </aside>
</template> 


<style scoped>

  .app-menu {
    background-color: rgb(239, 232, 232);
    color: white;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: end;
    position: absolute;
    gap: 1em;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 5;
  }

  .app-menu.open {
    transform: translateX(0);
  }
</style>