import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { createHtmlPlugin } from 'vite-plugin-html'
import { getSVGSymbolsString } from './scripts/svg'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    vueDevTools(),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.ts',
      template: 'index.html',
      inject: {
        data: {
          injectSVGSymbols: await getSVGSymbolsString(resolve('src/icons'))
        },
        tags: [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'app',
              class: 'app-container'
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "./src/sass/style.scss" as *;
        @import "./src/css/reset.css";
        @import "./src/css/theme.css";
        `
      }
    }
  }
}))
