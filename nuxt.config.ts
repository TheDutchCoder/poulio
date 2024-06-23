// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' }
  // },

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  modules: ["nuxt-auth-utils"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
