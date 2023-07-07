<!-- 封装菜单组件(动态创建) -->
<template>
    <template v-for="(item) in menuRouteList" :key="item.path">
        <!--没有子路由-->
        <el-menu-item :index="item.path" v-if="!item.children && !item.meta.hidden" @click="goRoute">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>

        <!-- 有且只有一个子路由 的话就展示那个子路由就完了-->
        <el-menu-item :index="item.children[0].path"
            v-if="item.children && !item.children[0].meta.hidden && item.children.length == 1" @click="goRoute">
            <el-icon>
                <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>

        <!-- 有子路由且个数大于一个1 -->
        <el-sub-menu :index="item.path" v-if="item.children && !item.meta.hidden && item.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 递归 -->
            <myMenu :menuRouteList="item.children"></myMenu>
            <!-- 我调用我自己,把item.children传进来,就走没有子路由那个分支 就展示出来了 -->
            <!-- 递归真nb假设我有一级路由下面有100个层级关系的子路由(包了100层的.children)这点代码也能跑完根本不用写多余的代码 效果图见笔记-->
        </el-sub-menu>

    </template>
</template>
  
<script setup lang="ts">

defineProps(['menuRouteList'])
const goRoute = () => {
    console.log(123);

}

</script>

<!-- 递归配套 -->
<script lang="ts">
export default {
    name: "myMenu"
}
</script>
  
<style scoped lang="scss">
.el-menu {
    border: none;




}
</style>
  