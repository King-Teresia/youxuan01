import axios from "axios";
import ElMessage from "element-plus";//ElMessage 消息提示 的组件
//创建axios实例(因为这样做的化 axios.create不仅会返回axios实例 还能做一些 基础配置 比如 baseurl与 timeout)
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,//这个是直接用的 开发环境下的 环境变量 (在这里是url会携带上/api 因为我设置的字段就是api)
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
    // 这个config配置对象里 有一个比较重要的东西 是 headers属性 (作用是 与服务器端通信时  携带公共参数)
    // console.log(config);看一眼这个config是什么  着重看一下headers ，也就是说 
    config.headers.message = "call me dady"
    config.headers.token = "amiyaLove"
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    // 响应拦截器与上面的请求同理 log一下 res 康康 但其实我们关注的是从服务器返回来的 数据 所以下面 就干脆直接写成了 return res.data
    return response.data;
}, (error) => {
    //这块一般处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    // @ts-ignore
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;

console.log(axios);
console.log(request);
console.log("其实axios和request本质上都是axios实例,他们唯一的区别就是后者 比前者 多了三个配置 哪三个配置呢 一个是baseURL 另一个是timeout 还有就是拦截器");


