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
    <v-text-field v-model="email" label="Email" :rules="emailRules" required />

    <v-text-field v-model="username" label="Username" :rules="usernameRules" required />

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
      Register
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
import { Validator } from '@/api/validator';
import { useAuth } from '@/api/auth';

  // Other Imports
  import router from '@/router';

const auth = useAuth();

export default {
  data: () => ({
    valid: false,
    message: '',
    hasMessage: false,
    isError: false,
    email: '',
    emailRules: [
      (v: string) => !!v || 'Email is required',
      (v: string) => Validator.validEmail(v) || 'Please enter valid Email Address'
    ],
    username: '',
    usernameRules: [
      (v: string) => !!v || 'Username is required',
      (v: string) => Validator.hasMinLength(v, 5) || 'Username must be longer then 5 characters',
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
          const signupRes = await auth.signupWithEmailAndPassword({
            username: this.username,
            email: this.email,
            password: this.password,
          })
          
          if (signupRes.code === 200) {
            this.isError = false
            await router.push({ name: 'Login' })
          } else {
            this.isError = true
            console.log('Signup failed')
          }
          
          this.message = signupRes.message
          this.hasMessage = true
      }
    },
    reset() {
      // @ts-ignore
      this.$refs.form.reset()
    },
  },
}

</script>
