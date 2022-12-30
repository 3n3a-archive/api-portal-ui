<template>

  <h1 class="text-h2 font-weight-bold">Register</h1>
  <div class="py-14" />
  <RegisterForm />
  <div class="py-5" />
  <RouterLink to="/auth/login">
    Already part of the group? Login Now!
  </RouterLink>
</template>

<script lang="ts" setup>
import RegisterForm from '@/components/register/form/Form.vue'
</script>
