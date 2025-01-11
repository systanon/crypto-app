<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { getGlobalTheme, setGlobalTheme, THEMES } from '@/helpers/theme'
import UIButtonIcon from '@/components/ui/buttons/UIButtonIcon.vue'

const theme = ref(getGlobalTheme())
onBeforeMount(() => {
  setGlobalTheme(theme.value)
})
const nextTheme = () => {
      const index = THEMES.findIndex((_theme) => _theme === theme.value) + 1;
      const _index = index === THEMES.length ? 0 : index;
      theme.value = THEMES[_index]
      setGlobalTheme(THEMES[_index]);
    }
</script>

<template>
  <div class="app-theme">
    <UIButtonIcon :icon-name="theme" @click="nextTheme" />
  </div>

</template>