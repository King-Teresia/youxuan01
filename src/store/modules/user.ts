// @ts-ignore
import { defineStore } from "pinia";
// 引入 接口
import { reqLogin, reqUserInfo, reqLogout } from "@/views/user";
import { userState } from "./types/type";
// 引入静态路由
import routeMenu from "@/router/config"

// 创建用户相关的 小仓库
let useUserStore = defineStore("User", {//选项式api写法
    state: (): userState => {
        return {
            token: localStorage.getItem("TOKEN"),//用户唯一标识
            menuRoutes: routeMenu,
            username: '',
            avatar: "",
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
            // console.log(result);
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
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