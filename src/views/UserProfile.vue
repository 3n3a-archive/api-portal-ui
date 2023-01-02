<template>
  <div class="pa-4">
    <h1>User Profile</h1>
    <v-list>
      <v-list-item>
        <strong>Username:</strong> {{ authStore.username }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth';

  const authStore = useAuthStore()
</script>
