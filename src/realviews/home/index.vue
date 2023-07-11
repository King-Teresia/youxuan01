<template>
    <img :src="useUser.avatar" alt="" style="border-radius: 10%; width: 50vw;">
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';
let useUser = useUserStore();


onMounted(() => {
    useUser.userInfo()

})




</script>


<style scoped lang="scss"></style>

