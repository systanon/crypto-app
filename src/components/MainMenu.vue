<script lang="ts">
import { defineComponent } from 'vue'
import UISelect  from '@/components/ui/select/UISelect.vue'
import UIIcon from '@/components/ui/icon/UIIcon.vue'

export default defineComponent({
  name: "MainMenu",
  emits: ['handleClick', 'setCurrentSymbol'],
  components: {
    UIIcon,
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
      <UIIcon name="close-circle" @click="$emit('handleClick')" />
           <UISelect :modelValue="symbol" :options="symbols"
      @update:modelValue="$emit('setCurrentSymbol', $event)"/>
    </aside>
</template> 


<style scoped>

  .app-menu {
    background-color: blue;
    color: white;
    padding: 20px;
    position: absolute;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 5;
  }

  .app-menu.open {
    transform: translateX(0);
  }
</style>