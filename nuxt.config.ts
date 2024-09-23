export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    '@nuxt/eslint',
    "@nuxtjs/google-fonts",
    "nuxt-auth-utils",
  ],
  devServer: {
    port: 3000,
  },
  googleFonts: {
    families: {
      Poppins: true,
    }
  },
});