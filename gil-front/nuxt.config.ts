// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'path'


export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, '/')
  },
  runtimeConfig: {
    public: {
      RAWG_API_KEY: process.env.RAWG_API_KEY,
    }
  },
  css: [
    '~/assets/style.css', // Chemin vers votre fichier CSS
  ],
  components: ['~/components'],
 
})
