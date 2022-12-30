<template>
  <v-navigation-drawer
    v-model="app.drawer"
    width="300"
  >
    <nav-list :items="routeItems">
      <template #divider>
        <v-divider class="my-3 mb-4 ms-16" />
      </template>
    </nav-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  // Components
  import NavList from '@/components/nav/list/List.vue';

  // Composables
  import router from '@/router';
  import { useAppStore } from '@/store/app';

  const app = useAppStore();
  const routeItems = router.getRoutes();
</script>
