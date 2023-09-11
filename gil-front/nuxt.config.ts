// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'path'


export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, '/')
  },
  runtimeConfig: {
    apikey: process.env.API_KEY,
  },
  css: [
    '~/assets/styles.css', // Chemin vers votre fichier CSS
  ],
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    }
  ],
 
})
