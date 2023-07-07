<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
// import axiosRequest from "@/utils/axiosRequest"
import { onMounted } from "vue";
import { reqLogin } from "./views/user"
onMounted(() => {
  // axiosRequest({
  //   url: "/user/login",//为什么不加/api因为我们封装的axios在发请求的时候 会自动添加上(baseURL) 我们设置的字段(在这里是那个环境变量的api) 
  //   method: "get"
  // }).then(res => console.log(res))

  // 上面这么写太麻烦了
  // axiosRequest.get("/user/login").then(res => console.log(res))
  // axiosRequest.post("/user/login", { username: "admin", password: "123" }).then(res => console.log(res))
  reqLogin({ username: "admin", password: "1234567" })

})
</script>


<style scoped lang="scss"></style>
