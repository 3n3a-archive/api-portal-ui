<template>
  <div v-if="hasMessage" class="my-5">
    <v-alert
      v-if="isError"
      color="red"
      type="error"
      elevation="2"
    >
      {{ message }}
    </v-alert>
    <v-alert
      v-else
      color="green"
      type="success"
      elevation="2"
    >
      {{ message }}
    </v-alert>
  </div>
  <div v-else class="py-14" />

  <v-form ref="form" v-model="valid" lazy-validation class="d-flex flex-column flex-gap">
    <v-text-field v-model="username" label="Username or Email" :rules="usernameRules" required />

    <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password" required />

    <v-btn
      variant="tonal"
      block
      height="50"
      class="mt-4"
      color="black"
      active
      @click="validateSubmit"
    >
      Login
    </v-btn>
  </v-form>

</template>


<style lang="scss">
  @use '@/styles/settings.scss';

  .flex-gap {
    gap: 1em;
  }
</style>

<script lang="ts">
  // Composables
  import { useAppStore } from '@/store/app';
  import { useAuth } from '@/api/auth';
  import { Validator } from '@/api/validator';
  
  // Other Imports
  import router from '@/router';

  // Definitions
  const app = useAppStore();
  const auth = useAuth();

  export default {
    data: () => ({
      valid: false,
      message: '',
      hasMessage: false,
      isError: false,
      username: '',
      usernameRules: [
        (v: string) => !!v || 'Username or Email is required',
        (v: string) => (Validator.hasMinLength(v, 5) || Validator.validEmail(v)) || 'Please enter a valid Username or Email',
      ],
      password: '',
      passwordRules: [
        (v: string) => !!v || 'Password is required',
        (v: string) => Validator.hasMinLength(v, 12) || 'Password has a minimum length of 12 characters',
        (v: string) => Validator.strongPassword(v) || 'Password must contain lowercase, uppercase and special characters'
      ]
    }),

    methods: {
      async validateSubmit() {
        // @ts-ignore
        const { valid } = await this.$refs.form.validate()

        if (valid) {
          const loginRes = await auth.loginWithEmailAndPassword({
            username_or_email: this.username,
            password: this.password,
          })
          
          if (loginRes.code === 200) {
            this.isError = false
            this.message = loginRes.message
            this.hasMessage = true
            app.isAuthenticated = true
            const routerRes = await router.push({ name: 'Home' })
            console.log(routerRes)
          } else {
            this.isError = true
            console.log('Login failed')
            this.message = loginRes.message
            this.hasMessage = true
          }
          

        }
      },
      reset() {
        // @ts-ignore
        this.$refs.form.reset()
      },
    },
  }

</script>
