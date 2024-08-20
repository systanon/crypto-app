<script lang="ts">
import { defineComponent } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
export default defineComponent({
  components: {
    RouterLink,
    RouterView
  }
})
</script>

<template>
    <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

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

#app {
  display: grid;
  grid-template-rows: max-content 1fr;
  gap: 40px
}

</style>
