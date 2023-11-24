// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GQL_HOST: '',
    },
  },

  devtools: { enabled: true },

  modules: ['@nuxt/image', 'nuxt-icon', 'nuxt-graphql-client', '@formkit/nuxt'],

  css: ['~/assets/css/main.css', '~/assets/css/custom.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
