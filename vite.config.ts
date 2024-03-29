import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), '/src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    AutoImport({
      // 自动导入 Vue 相关函数
      imports: ['vue', 'vue-router', 'vuex'],
      resolvers: [
        // 自动导入 Element Plus 相关函数
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: './auto-import.d.ts'
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: loadEnv('', process.cwd()),
        changeOrigin: true
      }
    }
  }
})
