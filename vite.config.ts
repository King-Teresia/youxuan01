import { defineConfig, loadEnv } from 'vite'
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
export default defineConfig(({ command, mode }: ConfigEnv) => {
  // 获取各个环境下 对应的变量
  let env = loadEnv(mode, process.cwd())

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

    // 跨域配置by 我自己
    // server: {
    //   proxy: {
    //     '/api': {
    //       //目标地址
    //       target: 'http://localhost:3000',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //   }
    // }


    // 真实的接口by 尚硅谷 代理跨域
    server: {
      proxy: {
        // 关键字api
        [env.VITE_APP_BASE_API]: {
          // 服务器地址
          target: env.VITE_SERVE,
          // 是否需要跨域
          changeOrigin: true,
          // 路径重写 这里的意思是 把路径中所有的 /api 重写为 空字符串
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    }

  }
})




