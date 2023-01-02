<template>
  <div v-if="loading">
    Loading...
  </div>

  <div v-if="error != ''">
    {{ error }}
  </div>

  <div v-if="!loading">
    <EasyDataTable
      :headers="headers"
      :items="items"
    >
    </EasyDataTable>
  </div>
</template>

<script lang="ts">
  import { ApiKeyType, useApiKey } from '@/api/apikey';

export default {
  data() {
    return {
      loading: false,
      error: '',
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Api Key', value: 'api_key' },
        { text: 'User Id', value: 'user_id' },
      ],
      items: [] as ApiKeyType[]
    }

  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      { immediate: true }
    )
  },
  methods: {
    async fetchData() {
      this.error = ''
      this.loading = true

      const apiKey = useApiKey()
      const listKeyRes = await apiKey.listApiKeys()
      if (listKeyRes.code === 200 && (typeof(listKeyRes.data) != 'string')) {
        this.loading = false
        this.items = listKeyRes.data
        console.log(this.items)
      } else {
        this.error = listKeyRes.message
      }
    }
  }
}
</script>
