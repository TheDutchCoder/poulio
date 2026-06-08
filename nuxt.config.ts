// https://nuxt.com/docs/api/configuration/nuxt-config
const predApiUpstream =
  process.env.NUXT_PRED_API_BASE || 'https://wc2026-api.rp-kaper-github.workers.dev'

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
  },

  routeRules: {
    '/api/**': { proxy: `${predApiUpstream}/**` },
  },

  runtimeConfig: {
    public: {
      // Browser calls same-origin /api/*; Nitro proxies to the Worker (avoids CORS).
      predApiBase: '/api',
    },
  },
})
