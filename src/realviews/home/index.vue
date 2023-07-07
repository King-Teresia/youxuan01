<template>
    <h2>我是1级路由,home</h2>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';
let useUser = useUserStore();

onMounted(() => {
    useUser.userInfo()
})
// onMounted(() => {
//     useStore.userInfo()

// })
</script>


<style scoped lang="scss"></style>

