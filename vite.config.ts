import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// element-plus自动按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 路径(对应笔记中的src别名 引用的时候直接@就行了)
import path from 'path'
// 引入SVG矢量图库
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock配置与vite-plugin-mock配置
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'


// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',//这行代码表示 开发阶段可以使用mock接口
      }),
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // 矢量图配置
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],//注意这个目录 咱们矢量图都放这个文件夹
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    // 全局的scss变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',//scss的全局 都放在这个目录下
        },
      },
    },

    // 跨域配置
    server: {
      proxy: {
        '/api': {
          //目标地址
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }


  }
})




