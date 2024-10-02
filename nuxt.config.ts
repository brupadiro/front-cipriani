// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';


export default defineNuxtConfig({
  modules: ['@primevue/nuxt-module', '@nuxtjs/strapi', '@nuxt/eslint', '@nuxt/fonts', '@nuxt/ui', '@vueuse/nuxt', '@vueform/nuxt'],
  primevue: {
    options: {
        theme: {
          preset: Aura,
          options: {
              prefix: 'p',
              darkModeSelector: 'system',
              cssLayer: false
          }
          }
    }
  },
  ssr: false,
  strapi: {
    url: 'https://complete-victory-b1ae57a058.strapiapp.com',
    prefix: '/api',
    version: 'v4',
    cookie: {
      path: '/',
      maxAge: 14 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true
    },
    cookieName: 'strapi_jwt' // Options
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  },

  ui: {
    safelistColors: ["primary", "red", "orange", "green"],
  },

  colorMode: {
    preference: 'light',
    disableTransition: true,
    fallback: 'light',
  },
  css: ['~/assets/styles.scss'],
  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    "/": {
      prerender: true
    },
  },

  devtools: {
    enabled: true,
  },

  typescript: {
    strict: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  compatibilityDate: "2024-07-11",
});
