import type { RouteRecordRaw } from "vue-router"//vue-router已经帮咱们写好了，这个就是路由对象的type类型

// 定义小仓库的 类型
export interface userState {
    token: null | string//本地没有存储那就是 null
    menuRoutes: RouteRecordRaw[]
}