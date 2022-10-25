import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ command }) =>
  defineConfig({
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      // https://www.npmjs.com/package/vite-plugin-mock
      viteMockServe({
        mockPath: 'src/mock',
        localEnabled: command === 'serve',
      }),
    ],
  })
