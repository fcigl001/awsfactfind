// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  nitro: {
    preset: 'aws-lambda' // ✅ key line to fix deploy-manifest runtime
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueform/nuxt',
  ]
})