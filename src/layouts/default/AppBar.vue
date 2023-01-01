<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />

      <v-btn
        icon="mdi-menu"
        @click="app.drawer = !app.drawer"
      />

    </v-app-bar-title>
    <v-spacer></v-spacer>

    <v-btn
      icon="mdi-lock"
      @click="doLogout()"
    />
    </v-app-bar>
</template>

<script lang="ts" setup>
  // Composables
  import { useAppStore } from '@/store/app';

  const app = useAppStore();

</script>

<script lang="ts">
  import { useAuth } from '@/api/auth';
export default {
  methods: {
    async doLogout() {
      const auth = useAuth();
      const logoutRes = await auth.logout()
      console.log(logoutRes ? 'Logout success' : 'Logout faield')
    }
  }
}
</script>
