// 统一管理 项目的用户相关接口
import axiosRequest from "@/utils/axiosRequest"
import type { loginType, loginResType, userResType } from "./type"//一般引入类型的时候 用 import type xxx 来自弹幕
// import type  只会导入类型信息，而不会导入模块的实际代码。来自弹幕

enum userAPI {//枚举可以 统一管理这一组东西 (演唱会应援棒 一根 上面是红和橙 下面是 蓝和绿 颜色由后台的我统一控制 (红蓝/红绿  橙蓝/橙绿))
    LOGIN_URL = "/user/login",
    USERINFO_URL = "/user/info"
}
export const reqLogin = (data: loginType) => axiosRequest.post<any, loginResType>(userAPI.LOGIN_URL, data)
export const reqUserInfo = () => axiosRequest.get<any, userResType>(userAPI.USERINFO_URL)
