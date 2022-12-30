<template>
  <v-app>
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center text-center fill-height">
          <v-row class="d-flex align-center justify-center">
            <v-col cols="12" sm="4">
              <h1 class="text-h1 font-weight-bold">Error</h1>
              <div class="py-10" />
              <h2>It appears that something unexpected happened.</h2>
              <div class="py-5" />
              <h2>Please make sure you entered the correct url.</h2>
              <div class="py-5" />
              <v-btn to="/" variant="tonal" height="50" block>
                Go Home
              </v-btn>
            </v-col>
          </v-row>
        </v-responsive>
      </v-container>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>
