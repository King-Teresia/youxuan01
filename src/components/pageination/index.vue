<template>
    <div class="demo-pagination-block">
        <div class="demonstration">All combined</div>
        <el-pagination :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="400" />
    </div>
</template>
