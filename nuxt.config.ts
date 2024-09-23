export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    '@nuxt/eslint',
    "@nuxtjs/google-fonts",
    "nuxt-auth-utils",
    "@nuxt/icon"
  ],
  devServer: {
    port: 3000,
  },
  googleFonts: {
    families: {
      Poppins: true,
    }
  },
  runtimeConfig: {
    adminUser: 'admin', // can be overridden by ADMIN_USER environment variable
    adminPassword: 'password', // can be overridden by ADMIN_PASSWORD environment variable
    sessionMaxAge: 86400 // cookie session length in seconds, can be overridden by SESSION_MAX_AGE environment variable
  },
});