<template>

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
export default {
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      (v: string) => !!v || 'Email is required',
      (v: string) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Please enter valid Email Address'
    ],
    username: '',
    usernameRules: [
      (v: string) => !!v || 'Username is required',
      (v: string) => (v && v.length >= 5) || 'Username must be longer then 5 characters',
    ],
    password: '',
    passwordRules: [
      (v: string) => !!v || 'Password is required',
      (v: string) => (v && v.length >= 12) || 'Password has a minimum length of 12 characters',
      (v: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(v) || 'Password must contain lowercase, uppercase and special characters'
    ]
  }),

  methods: {
    async validateSubmit() {
      // @ts-ignore
      const { valid } = await this.$refs.form.validate()

      if (valid) console.log('handleFormSubmit')
    },
    reset() {
      // @ts-ignore
      this.$refs.form.reset()
    },
  },
}

</script>
