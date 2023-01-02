<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1 class="text-h2 font-weight-bold">API Portal</h1>

      <div class="py-14" />

      <v-list>
        <v-list-item>
          <v-btn
            to="/apikey"
            value="Api Keys"
            min-width="200"
            density="default"
            variant="elevated"
            color="blue"
          >
            <v-icon
              icon="mdi-key"
              size="large"
              start
            />

            Api Keys
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            to="/profile"
            value="Profile"
            min-width="200"
            variant="tonal"
          >
            <v-icon
              icon="mdi-account"
              size="large"
              start
            />

            Profile
          </v-btn>
        </v-list-item>
      </v-list>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  //
</script>
