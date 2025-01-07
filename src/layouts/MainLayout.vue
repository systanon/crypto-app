<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      drawer: false
    }
  }
})
</script>

<template>
    <v-layout class="h-100">
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <slot name="left-panel"></slot>
      </v-navigation-drawer>

      <v-main class="h-100">
        <slot name="main"></slot>
      </v-main>
    </v-layout>
</template>