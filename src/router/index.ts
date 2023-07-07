import { createRouter, createWebHashHistory } from 'vue-router'
import routesDetail from './config'

// (像做这种后台管理项目 最主要的是菜单(感觉用菜单形容不是很好 用用户吧，那我为什么不删呢 因为是老师说的)权限 而这种菜单/用户权限 是需要根据用户信息去匹配的  然后动态添加路由)


let router = createRouter({
    history: createWebHashHistory(),
    routes: routesDetail,
    //在vue项目中，如果前一个页面有滚动条的滚动，当路由跳转后发现滚动条的位置还保持在原来的位置，这个就带来了困扰 配置如下 会让新跳转到页面后让滚动条回到初始位置
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

export default router