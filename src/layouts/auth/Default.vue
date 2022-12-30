<template>
  <v-app>
    <v-container class="fill-height">
      <v-responsive class="d-flex align-center text-center fill-height">
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" sm="4">
            <default-view />
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultView from './View.vue';
</script>
