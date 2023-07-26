// permission : 鉴权
// 什么是鉴权?  就是项目当中的路由 能不能被访问的 权限  (再说明白点 就是某一个路由在什么条件下能够被访问 ，在什么条件下 不能 被访问)
import router from "./router";
// nprogress进度条 &样式
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
// 干掉nprogress自带的小圆圈 只留下 横条
nprogress.configure({ showSpinner: false })

import useUserStore from "./store/modules/user";
import pinia from "./store";
import setting from "./setting";

// 设置全局路由守卫的前置路由守卫
// @ts-ignore
router.beforeEach(async (to, from, next) => {//这个to，和from的类型是RouteLocationNormalized 来自弹幕
    // to and from are both route objects. must call `next`.
    const useUser = useUserStore(pinia)
    //进度条
    nprogress.start()
    // 鉴权
    let token = useUser.token
    // if (token) {//如果登陆成功(拿到token了说明登陆成功)
    //     if (to.path == "/login") {
    //         next({ path: "/" })
    //     } else {
    //         next()
    //     }
    // } else {
    //     //用户未登录判断
    //     if (to.path == '/login') {
    //         next()
    //     } else {
    //         next({ path: '/login', query: { redirect: to.path } })
    //     }
    // }

    // 上面的ifelse是我写的，下面的是老师写的(因为我做到菜单权限那块发现没有调用userinfo方法)
    const username = useUser.username
    if (token) {
        //登录成功,访问login,不能访问,指向首页
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            //登录成功访问其余六个路由(登录排除)
            //有用户信息
            if (username) {
                //放行
                next()
            } else {
                //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
                try {
                    //获取用户信息
                    await useUser.userInfo()
                    //放行
                    //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
                    next({ ...to })
                } catch (error) {
                    //token过期:获取不到用户信息了
                    //用户手动修改本地存储token
                    //退出登录->用户相关的数据清空
                    await useUser.userLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        //用户未登录判断
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }

})
// @ts-ignore
router.afterEach((to, from) => {
    document.title = `${setting.title}-${to.meta.title}`
    nprogress.done()
    localStorage.removeItem("User")

})


// 在这个文件里 我们解决以下两个问题
//第一个问题:任意路由切换实现进度条业务 ---nprogress
//第二个问题:路由鉴权(路由组件访问权限的设置)

// 路由鉴权 的解释在第二行，下面写一下 该项目中详细要怎么做
//1.用户未登录:可以访问login,其余六个路由不能访问(指向login)
//2.用户登录成功:不可以访问login[指向首页],其余的路由可以访问