<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon style="margin-right: 10px;" @click="changeIcon">
                <component :is="useLayOutStore.fold?'Fold':'Expand'"></component>
            </el-icon>
            <!-- 面包屑动态展示对应路由的标题 -->
            <el-breadcrumb :separator-icon="ArrowRight">
                <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
                <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index" v-show="item.meta.title"
                    :to="item.path">
                    <el-icon style="margin: 0 3px;" @click="changeIcon">
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>

        <div class="tabbar_right">
            <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
            <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>

            <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
                <!-- 表单元素 -->
                <el-form>
                    <el-form-item label="主题颜色">
                        <el-color-picker @change="setColor" v-model="color" size="small" show-alpha
                            :predefine="predefineColors" />
                    </el-form-item>
                    <el-form-item label="暗黑模式">
                        <el-switch @change="changeDark" v-model="dark" class="mt-2" style="margin-left: 24px" inline-prompt
                            active-icon="MoonNight" inactive-icon="Sunny" />
                    </el-form-item>
                </el-form>
                <template #reference>
                    <el-button size="small" icon="Setting" circle></el-button>
                </template>
            </el-popover>

            <img :src="useUser.avatar" alt="" style="border-radius: 30%;">
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ useUser.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ArrowRight } from '@element-plus/icons-vue';
import useLayOutSettingStore from '@/store/modules/layout.config';
import useUserStore from '@/store/modules/user';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter()
let useLayOutStore = useLayOutSettingStore();
const useUser = useUserStore()
const fullScreen = () => {
    //DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏的化 这个full的值是true,不是全屏会返回null 布尔值就是false] 详情见 OneNote的 随手放 有好多document的属性
    let full = document.fullscreenElement;
    //切换为全屏模式
    if (!full) {
        //文档根节点的方法requestFullscreen,实现全屏模式
        document.documentElement.requestFullscreen();
    } else {
        //变为不是全屏模式->退出全屏模式
        document.exitFullscreen();
    }
}

const updateRefsh = () => {
    useLayOutStore.refsh = !useLayOutStore.refsh;
}

// 定义展开栏图标 的变量
const changeIcon = () => {
    useLayOutStore.fold = !useLayOutStore.fold
}

const logout = async () => {
    // 退出登录的第一件事:向服务器发请求(告诉服务器我现在这个token 废了，下次有人再拿这个token找你 别让他通行 ; 下次我找你要个新的)
    // 即 通知服务器 本次用户的 唯一标识失效
    // 第二件事：清理pinia仓库中的用户数据 username啊 avatar啊之类的
    // 第三件事：跳转到登陆界面
    await useUser.userLogout()
    router.push({ path: '/login', query: { redirect: route.path } })
}

//收集开关的数据
let dark = ref<boolean>(false);
//颜色组件组件的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

//switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
    //获取HTML根节点
    let html = document.documentElement;
    //判断HTML标签是否有类名dark
    dark.value ? html.className = 'dark' : html.className = '';
}

//主题颜色的设置
const setColor = () => {
    //通知js修改根节点的样式对象的属性与属性值
    const html = document.documentElement;
    html.style.setProperty('--el-color-primary', color.value);
}


</script>

<script lang="ts">
export default {
    name: "Tabbar"
}
</script>


<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // 整点花里胡哨的东西 来个渐变色
    // background-image: linear-gradient(to right, white, pink, white);

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 10px;


    }

    .tabbar_right {
        display: flex;
        align-items: center;

        img {
            width: 24px;
            height: 24px;
            margin: 0 10px;
        }
    }
}
</style>