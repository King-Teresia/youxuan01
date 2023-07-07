<template>
    <div class="logo">
        <img :src="setting.logo" v-if="setting.logoHidden">
        <p>{{ setting.title }}</p>
    </div>
</template>
  
<script setup lang="ts">
import setting from "@/setting"

</script>
  
  
<style scoped lang="scss">
.logo {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: $base-menu-logo-height;
    color: white;

    p {
        font-size: $base-logo-title-font-size;

    }

    img {
        width: 50px;
        height: 50px;
    }
}
</style>
  