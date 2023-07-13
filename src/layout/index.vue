<template>
    <div class="layout_container">
        <el-container>
            <el-aside class="layout_slider">
                <logo></logo>
                <!-- scrollbar 来限制侧边栏菜单的展开最大高度 -->
                <el-scrollbar>
                    <!-- 来放菜单 -->
                    <el-menu background-color="#00152b" text-color="white" :router="true" :default-active="route.path"
                        :collapse="useLayOutStore.fold">
                        <myMenu :menuRouteList="userStore.menuRoutes"></myMenu>
                    </el-menu>

                </el-scrollbar>
            </el-aside>
            <el-container>
                <el-header class="layout_tabbar" :class="{ amiyafold: useLayOutStore.fold ? true : false }">
                    <headerTabbar></headerTabbar>
                </el-header>
                <el-main class="layout_main" :class="{ amiyafold: useLayOutStore.fold ? true : false }">
                    <p style="height:1200px">
                        <mainShow></mainShow>
                    </p>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script setup lang="ts">
import logo from "./logo/index.vue"
import myMenu from "./menu/index.vue"
import useUserStore from "../store/modules/user"
import mainShow from "./main/index.vue"
import headerTabbar from "./tabbar/index.vue"
import { useRoute } from "vue-router"
import useLayOutSettingStore from "@/store/modules/layout.config"
import { onMounted } from "vue"
let useLayOutStore = useLayOutSettingStore();
const userStore = useUserStore()
const route = useRoute()




</script>



<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        background-color: $base-menu-background;
        height: 100vh;
        background-color: #00152b;
        transition: all .3s;

        .el-scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);


            .el-menu {
                border: none;

            }
        }

        // &.amiyafold {
        //     width: $base-menu-min-width;

        //     :deep(.logo) {
        //         p {
        //             display: none;
        //         }
        //     }
        // }影响字体变化 导致收起菜单的时候 会让文字乱动 影响体验，所以就给注释掉了

    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        width: calc(100% - $base-menu-width);
        left: $base-menu-width;
        height: $base-tabber-height;
        transition: all .3s;


        &.amiyafold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;

        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabber-height );
        left: $base-menu-width;
        top: $base-tabber-height;
        transition: all .3s;


        // padding: 20px;
        &.amiyafold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;

        }
    }

    .el-header {
        --el-header-padding: 0 0;
    }
}
</style>

