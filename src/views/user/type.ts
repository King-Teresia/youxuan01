// // 来定义相对应的 数据类型(这里是登录接口的ts类型)
// export interface loginType {
//     username: string,
//     password: string
// }


// export interface dataType {
//     token?: string,
//     message?: string
// }

// // 登录接口的 从服务器返回的res类型
// export interface loginResType {
//     code: number,
//     data: dataType
// }


// interface userInfo {
//     userId: number,
//     avatar: string,
//     username: string,
//     password: string,
//     desc: string,
//     roles: string[],
//     buttons: string[],
//     routes: string[],
//     token: string,
// }

// interface user {
//     checkUser: userInfo
// }
// // 用户信息接口的 从服务器返回的res类型
// export interface userResType {
//     code: number,
//     data: user
// }







//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
    username: string
    password: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
    data: string
}

//定义获取用户信息返回数据类型
export interface userInfoReponseData extends ResponseData {
    data: {
        routes: string[]
        buttons: string[]
        roles: string[]
        name: string
        avatar: string
    }
}




















