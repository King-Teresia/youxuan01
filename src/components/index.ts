// 插件的复习 OneNote里有,这里我们是用插件的方式将 需要全局使用的组件们  注册为全局组件
//@ts-ignore
import svgIcon from "../components/svgIcon/index.vue"
//@ts-ignore
import pagenation from "@/components/pageination/index.vue"
let allGlobalComponets: object = { svgIcon, pagenation }

export default {
    install(app: object) {
        //@ts-ignore
        Object.keys(allGlobalComponets).forEach(key => app.component(key, allGlobalComponets[key]))

    }
}