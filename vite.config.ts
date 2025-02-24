import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    dts(),
    vue(),
    UnoCSS(),
    viteStaticCopy({
      targets: [
        {
          src: './global.d.ts',
          dest: './',
        },
        {
          src: './web-types.json',
          dest: './',
        },
      ],
    }),
  ],
  css: {
    modules: { hashPrefix: '' },
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/style/style.css';`,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      // TODO rename to your project
      name: 'todo',
      // TODO rename to your project
      fileName: format => `todo.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
