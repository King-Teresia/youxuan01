// // 统一管理 项目的用户相关接口
import axiosRequest from "@/utils/axiosRequest"
// import type { loginType, loginResType, userResType } from "./type"//一般引入类型的时候 用 import type xxx 来自弹幕
// // import type  只会导入类型信息，而不会导入模块的实际代码。来自弹幕

// enum userAPI {//枚举可以 统一管理这一组东西 (演唱会应援棒 一根 上面是红和橙 下面是 蓝和绿 颜色由后台的我统一控制 (红蓝/红绿  橙蓝/橙绿))
//     LOGIN_URL = "/user/login",
//     USERINFO_URL = "/user/info"
// }
// export const reqLogin = (data: loginType) => axiosRequest.post<any, loginResType>(userAPI.LOGIN_URL, data)
// export const reqUserInfo = () => axiosRequest.get<any, userResType>(userAPI.USERINFO_URL)



//统一管理咱们项目用户相关的接口
import type {
    loginFormData,
    loginResponseData,
    userInfoReponseData,
} from './type'
//项目用户相关的请求地址
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}

//登录接口
export const reqLogin = (data: loginFormData) =>
    axiosRequest.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () =>
    axiosRequest.get<any, userInfoReponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => axiosRequest.post<any, any>(API.LOGOUT_URL)








