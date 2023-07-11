// @ts-ignore
import { createPinia } from "pinia"

// 创建大仓库
const pinia = createPinia()

// 持久化插件piniaPluginPersistedstate
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

// 暴露大仓库
export default pinia
