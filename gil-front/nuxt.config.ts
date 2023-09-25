// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'path'


export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        {charset: "utf-8"},
        {
          name: 'viewport',
          content: "width=device-width, initial-scale=1"
        },
        {name : "description", content: "IMBDLike for Video Games"},
        {name: 'author', content: "Christ Mokonda"}
      ],
      link : [
        {
          rel: 'stylesheet',
          href: '//cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
        }
      ] , 
      script : [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js',
          type: 'text/javascript'
        },
      ]
    }
  },
  alias: {
    "@": resolve(__dirname)
  },
  // add bootstrap-vue module for nuxt
  components: ['~/components'],
})
