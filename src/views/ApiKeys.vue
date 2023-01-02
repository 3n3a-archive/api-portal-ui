<template>
  <h1>Api Keys</h1>
  <v-btn
    icon="mdi-add"
    @click="addKey()"
  >
    Create
  </v-btn>
  <List />
</template>

<script lang="ts" setup>
  import List from '@/components/apikey/list/List.vue'
</script>

<script lang="ts">
import { useApiKey } from '@/api/apikey';
  export default {
    methods: {
      async addKey() {
        const apiKey = useApiKey()
        return await apiKey.addKey()
      }
    }
  }
</script>
