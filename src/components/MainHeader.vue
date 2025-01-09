<script lang="ts">
import { defineComponent } from 'vue'
import UIIcon from '@/components/icons/UIIcon.vue'

export default defineComponent({
  emits: ['handleClick'],
  components: {
    UIIcon
  },
  })
</script>

<template>
  <header>
    <UIIcon name="rotate-burger" @click="$emit('handleClick')" />
  </header>
  
</template>