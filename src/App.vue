<template>
  <h3>来</h3>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>

  <el-button type="primary" plain>Primary</el-button>
  <el-button type="success" plain>Success</el-button>
  <el-button type="info" plain>Info</el-button>
  <el-button type="warning" plain>Warning</el-button>
  <el-button type="danger" plain>Danger</el-button>

  <el-button type="success" :icon="Check" circle />
  <el-button type="info" :icon="Message" circle />
  <el-button type="warning" :icon="Star" circle />
  <el-button type="danger" :icon="Delete" circle />

  <hr class="my-4" />
  <!-- <div class="demo-pagination-block">
    <div class="demonstration">All combined</div>
    <el-pagination :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="400" />
  </div> -->
  <pagenation></pagenation>
  <svgIcon name="loading"></svgIcon>
  <nani></nani>
  <h3>我要使用icon了</h3>
  <svgIcon name="home" color="" width="50px" height="50px"></svgIcon>

  <h3>我要测试,测试什么呢?测一下全局样式管用不(确实管用)</h3>
</template>

<script setup lang="ts">
import nani from "@/components/nani.vue"
import {
  Check,
  Delete,
  Message,
  Star,
} from '@element-plus/icons-vue'
</script>


<style scoped lang="scss">
h3 {
  color: $color
}
</style>