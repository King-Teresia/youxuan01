// 插件的复习 OneNote里有,这里我们是用插件的方式将 需要全局使用的组件们  注册为全局组件
//@ts-ignore
import svgIcon from "../components/svgIcon/index.vue"
//@ts-ignore
import pagenation from "@/components/pageination/index.vue"

// 之前注册为 全局组件的是 svgicon和pageNation ，这回是 小icon(左侧边栏要用的)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 将category注册为全局组件
// @ts-ignore
import category from "./Category/index.vue"


let allGlobalComponets: any = { svgIcon, pagenation, category }

export default {
    install(app: object) {
        //@ts-ignore
        Object.keys(allGlobalComponets).forEach(key => app.component(key, allGlobalComponets[key]))

        // 左侧边栏要用的icon 也注册为全局组件对应第7行
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            //@ts-ignore 
            app.component(key, component)
        }

    }
}