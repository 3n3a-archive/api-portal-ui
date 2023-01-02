<template>
  <div class="pa-4">
    <h1>Api Keys</h1>
    <v-btn
      variant="elevated"
      rounded
      prepend-icon="mdi-plus"
      color="blue"
      @click="addKey()"
      class="my-4"
    >
      Create
    </v-btn>
    <List :refetch-data="doRefetch" />
  </div>
</template>

<script lang="ts" setup>
  import List from '@/components/apikey/list/List.vue'
</script>

<script lang="ts">
import { useApiKey } from '@/api/apikey';
  export default {
    data () {
      return {
        doRefetch: false
      }
    },
    methods: {
      async addKey() {
        const apiKey = useApiKey()
        await apiKey.addKey()
        this.doRefetch = !this.doRefetch
      }
    }
  }
</script>
