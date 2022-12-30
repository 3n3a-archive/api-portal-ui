<template>
  <v-app>
    <default-bar />

    <default-drawer />

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultBar from './AppBar.vue';
  import DefaultDrawer from './Drawer.vue';
  import DefaultView from './View.vue';
</script>
