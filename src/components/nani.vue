<template>
    <p>
        难打多？
    </p>
    <h3></h3>
</template>


<script setup lang="ts">
console.log("na..daduo");
// 也在比较深的层次里康康能不能 访问到环境变量(感觉没问题，毕竟人家叫 环境变量)
console.log(import.meta.env);


</script>


<style scoped>
p {
    background-color: orange;
}
</style>
