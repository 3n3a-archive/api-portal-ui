/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import { createHead } from "@vueuse/head"
import Vue3EasyDataTable from 'vue3-easy-data-table';


// Types
import type { App } from 'vue'

const head = createHead()

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(head)
    .use(router)
    .use(pinia)
    .component('EasyDataTable', Vue3EasyDataTable)
}
