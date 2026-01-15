import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-swiper', '@nuxt/eslint', '@pinia/nuxt'],
  routeRules: {
    // 为了SEO目的，在构建时生成
    '/': { prerender: true },
    // 缓存1小时
    '/api/*': { cache: { maxAge: 60 * 60 } },
    // 重定向以避免404
    '/old-page': {
      redirect: { to: '/new-page', statusCode: 302 }
    }
    // ...
  },
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  $development: {
    //
  },
  runtimeConfig: {
    // 只在服务器端可用的私有键（使用 NUXT_ 前缀）
    apiSecret: process.env.NUXT_API_SECRET || 'default-secret',
    // public中的键也可以在客户端使用（使用 NUXT_PUBLIC_ 前缀）
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://192.168.66.135:8080',
      appName: process.env.NUXT_PUBLIC_APP_NAME || '租赁算力平台',
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || '1.0.0',
      env: process.env.NUXT_PUBLIC_ENV || process.env.NODE_ENV || 'development',
      // Mock 配置
      useMock: process.env.NUXT_PUBLIC_USE_MOCK === 'true' || process.env.NUXT_PUBLIC_USE_MOCK === '1',
      mockBase: process.env.NUXT_PUBLIC_MOCK_BASE || 'https://m1.apifoxmock.com/m1/7602696-7341408-default'
    }
  },
  vite: {
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@use "@/assets/_colors.scss" as *;'
    //     }
    //   }
    // }
  },
  css: ['~/app/assets/css/main.css'],
  ui: {
    fonts: false,
    theme: {
      prefix: ''
    },
    experimental: {
      componentDetection: true
    }
  },
  // fonts: {
  //   processCSSVariables: true
  // },
  app: {
    //页面过渡效果 真的所有页面
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: '华璟智璇 租赁平台',
      titleTemplate: '%s - 华璟智璇 GPU 租赁',

      meta: [
        { name: 'description', content: '华璟智璇 高性能 GPU 租赁平台，按需付费' },
        { name: 'keywords', content: 'GPU 租赁, AI 训练, CUDA, 云算力' },

        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '华璟智璇 GPU 租赁平台' },
        { property: 'og:description', content: '高性能 GPU 云租赁' },
        { property: 'og:site_name', content: '华璟智璇' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' }
      ],

      link: [
        // { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  sourcemap: {
    server: false,
    client: false
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '~': fileURLToPath(new URL('./', import.meta.url))
  },
  nitro: {
    logLevel: 3 // debug
  },
  typescript: {
    typeCheck: false,   // 先关掉
  },
})