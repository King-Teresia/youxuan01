import type { RouteRecordRaw } from "vue-router"//vue-router已经帮咱们写好了，这个就是路由对象的type类型
import type { CategoryObj } from '@/views/product/attr/type'

// 定义小仓库的 类型
export interface userState {
    token: null | string//本地没有存储那就是 null
    menuRoutes: RouteRecordRaw[]
    username: string,
    avatar: string,
}

//定义分类仓库state对象的ts类型
export interface CategoryState {
    c1Id: string | number
    c1Arr: CategoryObj[]
    c2Arr: CategoryObj[]
    c2Id: string | number
    c3Arr: CategoryObj[]
    c3Id: string | number
}
