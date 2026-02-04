// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
  ],

  // Global CSS
  css: ['~/assets/css/main.css'],

  // SSG for GitHub Pages
  ssr: true,
  nitro: {
    preset: 'github-pages',
  },

  // Color mode configuration
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
  },

  // Nuxt Content configuration
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'png', 'jpg'],
  },

  // Sitemap configuration
  site: {
    url: 'https://nicholastn1.github.io',
  },

  // App configuration
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },
      title: 'Nicholas Nogueira - Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfolio de Nicholas Nogueira, Full Stack Software Engineer com 5+ anos de experiência em Ruby on Rails, Vue.js, React e mais.',
        },
        { name: 'author', content: 'Nicholas Nogueira' },
        // Open Graph
        {
          property: 'og:title',
          content: 'Nicholas Nogueira - Software Engineer',
        },
        {
          property: 'og:description',
          content:
            'Portfolio de Nicholas Nogueira, Full Stack Software Engineer com 5+ anos de experiência.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://nicholastn1.github.io' },
        { property: 'og:locale', content: 'pt_BR' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // Google Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
        },
      ],
    },
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false, // Disabled for faster dev, enable in CI
  },

  // Development server configuration (for Docker)
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  // Vite configuration for Docker hot reload
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
      hmr: {
        port: 24678,
      },
    },
  },

  compatibilityDate: '2025-01-01',
})
