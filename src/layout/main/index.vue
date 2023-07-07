<template>
    <router-view v-slot="{ Component }">
        <!-- 来个花里胡哨的动画 上transition -->
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import useLayOutSettingStore from '@/store/modules/layout.config';
let useLayOutStore = useLayOutSettingStore();

// 刷新的本质是 组件的销毁与重建
let flag = ref(true);

watch(() => useLayOutStore.refsh, () => {
    // console.log("组件内部的数据被改变了");
    flag.value = false //销毁组件
    nextTick(() => { //因为nextTick能在更新后 执行回调 也就是在销毁后我们可以再给他加回来 就完成了刷新
        flag.value = true
    })
})
</script>


<style scoped lang="scss">
// xxx-enter-from  ;  xxx-enter-active  ;  xxx-enter-to  ;  

.fade-enter-from {
    opacity: 0
}

.fade-enter-active {
    transition: all .8s;
}

.fade-enter-to {
    opacity: 1
}
</style>




