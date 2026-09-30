export default defineNuxtConfig({
  compatibilityDate: "2026-01-13",
  devtools: { enabled: false },
  modules: ["@storyblok/nuxt", "@nuxt/icon"],

  storyblok: {
    accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
    apiOptions: {
      /** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
      region: process.env.STORYBLOK_REGION || "eu",
      /** SDK default is 10 retries at a fixed 300ms on 429s, which multiplies usage when rate limited */
      maxRetries: 2,
      /** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
      endpoint: process.env.STORYBLOK_API_BASE_URL
        ? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
        : undefined,
    },
  },

  // use a global SCSS entrypoint instead of linking external CSS
  css: ["~/assets/scss/main.scss"],

  ssr: true,

  // Pre-render every page to static HTML at build time, so visitors never hit the
  // Storyblok API. A Storyblok publish webhook triggers a Netlify rebuild.
  // server/api routes (e.g. send-email) still deploy as Netlify functions.
  routeRules: {
    "/**": { prerender: true },
    "/api/**": { prerender: false },
  },

  nitro: {
    prerender: {
      // start at the homepage and follow the nav/footer links to find every page
      crawlLinks: true,
      routes: ["/"],
    },
  },

  devServer: {
    https: true,
  },

  // make SCSS variables/themes/typography available to all SCSS files
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/variables.scss" as *;
@use "@/assets/scss/themes.scss" as *;
@use "@/assets/scss/typography.scss" as *;`,
        },
      },
    },
  },
});
