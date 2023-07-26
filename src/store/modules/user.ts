// @ts-ignore
import { defineStore } from "pinia";
// 引入 接口
import { reqLogin, reqUserInfo, reqLogout } from "@/views/user";
import { userState } from "./types/type";
// 引入静态路由
import { constantRoute, asnycRoute, anyRoute } from '@/router/config'
import router from "@/router";

// 引入loadsh的深拷贝方法
// @ts-ignore
import cloneDeep from "lodash/cloneDeep"

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
    return asnycRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                //硅谷333账号:product\trademark\attr\sku
                item.children = filterAsyncRoute(item.children, routes)
            }
            return true
        }
    })
}


// 创建用户相关的 小仓库
let useUserStore = defineStore("User", {//选项式api写法
    state: (): userState => {
        return {
            token: localStorage.getItem("TOKEN"),//用户唯一标识
            menuRoutes: constantRoute,
            username: '',
            avatar: "",
            buttons: [],

            // password: "123",
            // desc: "",
            // role: [
            //     ""
            // ],
        }
    },
    actions: {
        async userLogin(loginFormData: any) {
            let result: any = await reqLogin(loginFormData);//因为是这块会发送ajax请求到服务器,所以会有res回来 我们用result去接受它
            // console.log(result);
            if (result.code == 200) {
                // code=200说明验证成功,我们存储 token
                localStorage.setItem("TOKEN", (result.data as string))
                return "ok的丝袜~"
            } else {
                return Promise.reject(new Error(result.data))
            }
        },

        async userInfo() {
            // 获取用户信息
            let result = await reqUserInfo()
            console.log(result);
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                this.buttons = result.data.buttons

                //计算当前用户需要展示的异步路由
                let userAsyncRoute = filterAsyncRoute(cloneDeep(asnycRoute), result.data.routes,)
                //菜单需要的数据整理完毕
                this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];

                //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
                [...userAsyncRoute, anyRoute].forEach((route: any) => {
                    router.addRoute(route)
                })


                return "ok"
            } else {
                return Promise.reject("获取用户信息错误")
            }

        },
        async userLogout() {
            let res = await reqLogout()
            console.log(res);
            if (res.code = 200) {
                this.$reset()
                this.token = '';
                this.username = '';
                this.avatar = '';
                localStorage.removeItem("TOKEN")
                localStorage.removeItem("User")
                localStorage.clear()
                return "ok"
            } else {
                return Promise.reject(new Error(res.message))
            }


        },


    },
    getters: {

    },
    persist: true




},

)

export default useUserStore