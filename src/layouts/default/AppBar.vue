<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />

      <v-btn
        icon="mdi-menu"
        @click="app.drawer = !app.drawer"
      />
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
  // Composables
  import { useAppStore } from '@/store/app';

  const app = useAppStore();
</script>
