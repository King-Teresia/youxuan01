// 来定义相对应的 数据类型(这里是登录接口的ts类型)
export interface loginType {
    username: string,
    password: string
}


export interface dataType {
    token?: string,
    message?: string
}

// 登录接口的 从服务器返回的res类型
export interface loginResType {
    code: number,
    data: dataType
}


interface userInfo {
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
}

interface user {
    checkUser: userInfo
}
// 用户信息接口的 从服务器返回的res类型
export interface userResType {
    code: number,
    data: user
}
