<template>

  <h1 class="text-h2 font-weight-bold">Login</h1>
  <div class="py-14" />
  <LoginForm />
  <div class="py-5" />
  <RouterLink to="/auth/register">
    Want to join the fun? Register Now!
  </RouterLink>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/login/form/Form.vue'
</script>
