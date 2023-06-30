 <!-- 封装svg矢量图 -->
<template>
  <div>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>

  </div>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀 也就是那个必须的icon-
  prefix: {//百度翻译prefix : 前缀
    type: String,
    default: '#icon-'
  },
  //接受父组件传递过来的矢量图的名字
  name: String,
  //接受父组件传递过来的图标颜色
  color: {
    type: String,
    default: ""
  },
  //接受父组件传递过来的宽度
  width: {
    type: String,
    default: '16px'
  },
  //接受父组件传递过来的高度
  height: {
    type: String,
    default: '16px'
  }

})
</script>


<style scoped></style>