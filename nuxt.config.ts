export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt'
  ],

  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/confirm',
      exclude: ['/', '/auth/register'],
    }
  },

  app: {
    head: {
      title: 'FindYourCleaner Partner Portal',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  devtools: { enabled: false },
  compatibilityDate: '2024-11-21'
})