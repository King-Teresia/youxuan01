import { createApp } from 'vue'
import './style.css'
//@ts-ignore
import App from './App.vue'

const app = createApp(App)
// element-plus的国际化配置(中国化)
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 矢量图配置
import 'virtual:svg-icons-register'

//看一眼能不能获取到刚刚创建的.env.development那仨  看看管不管用
console.log(import.meta.env);

// 引入插件对象 
import globalComponet from "@/components"
// console.log(globalComponet); 是一个对象
app.use(globalComponet)//只要我们 app.use咱们自定义的插件 就会触发 插件里的那个 install()
console.log(app);


app.use(ElementPlus, {
    locale: zhCn,
})

app.mount('#app')
