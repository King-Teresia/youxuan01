// @ts-ignore
import { defineStore } from "pinia";
// 引入 接口
import { reqLogin } from "@/views/user";
import type { loginType, loginResType } from "@/views/user/type";
import { userState } from "./types/type";
// 引入静态路由
import routeMenu from "@/router/config"
// 创建用户相关的 小仓库
let useUserStore = defineStore("User", {//选项式api写法
    state: (): userState => {
        return {
            token: localStorage.getItem("TOKEN"),//用户唯一标识
            menuRoutes: routeMenu,
        }
    },
    actions: {
        async userLogin(loginFormData: loginType) {
            let result: loginResType = await reqLogin(loginFormData);//因为是这块会发送ajax请求到服务器,所以会有res回来 我们用result去接受它
            // console.log(result);
            if (result.code == 200) {
                // code=200说明验证成功,我们存储 token
                localStorage.setItem("TOKEN", (result.data.token as string))
                return "ok的丝袜~"
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },

        userInfo() {
            console.log(123);
        },
    },
    getters: {

    }
})

export default useUserStore