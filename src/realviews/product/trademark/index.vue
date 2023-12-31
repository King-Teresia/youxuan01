<template>
    <div>
        <el-card class="box-card">
            <!-- 卡片顶部添加品牌按钮 -->
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark"
                v-has="`btn.Trademark.add`">添加品牌</el-button>
            <!-- 表格组件：用于展示已有得平台数据 -->
            <!-- table:---border:可以设置表格纵向是否有边框
                table-column:---label:某一个列表 ---width:设置这列宽度 ---align:设置这一列对齐方式    
            -->
            <el-table style="margin:10px 0px" border :data="trademarkArr">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <!-- table-column:如果用prop 默认展示数据用div ; 还可以用插槽的方式语法有个 #="{}"详情见elementplus的Table-column Attributes-->
                <el-table-column label="品牌名称" prop="tmName">
                </el-table-column>
                <el-table-column label="品牌LOGO">

                    <!-- 其实下面原本是这样的 <template #="{ row, column, $index }">  但是打包的时候报错 所以要把 没用到的删掉 记得原本是这样的-->
                    <template #="{ row }">
                        <img :src="row.logoUrl" style="width:100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete"
                            @confirm='removeTradeMark(row.id)'>
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件
                pagination
                   v-model:current-page:设置分页器当前页码
                   v-model:page-size:设置每一个展示数据条数
                   page-sizes:用于设置下拉菜单数据
                   background:设置分页器按钮的背景颜色
                   layout:可以设置分页器六个子组件布局调整
            -->
            <el-pagination @size-change="sizeChange" @current-change="getHasTrademark" :pager-count="9"
                v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
                layout="prev, pager, next, jumper,->,sizes,total" :total="total" />

        </el-card>
        <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
        <!-- 
            v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
             title:设置对话框左上角标题
        -->

        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
            <el-form style="width: 80%;" ref="formRef" :model="trademarkParams" :rules="rules">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input v-model="trademarkParams.tmName" placeholder="请您输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求  -->
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>

                </el-form-item>
            </el-form>
            <!-- 具名插槽:footer -->
            <template #footer>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">确定</el-button>
            </template>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ElMessage, UploadProps } from 'element-plus'
import { nextTick, onMounted, reactive, ref } from "vue"
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/views/product/trademark';
// @ts-ignore
import type { Records, TradeMarkResponseData, TradeMark } from '@/views/product/trademark/type'
// 按钮权限的实现
import useUser from "@/store/modules/user"
// @ts-ignore
let userStore = useUser()

//当前页码
let pageNo = ref<number>(1);
//每一页展示多少条数据
let limit = ref<number>(3);
//存储已有品牌数据总数
let total = ref<number>(50);
let trademarkArr = ref<any>([])
// dialog对话框的配置
let dialogFormVisible = ref<boolean>(false)
//获取已有品牌的接口封装为一个函数:在任何情况下向获取数据,调用次函数即可
const getHasTrademark = async (pager = 1) => {
    pageNo.value = pager;
    //当前页码
    let result = await reqHasTrademark(pageNo.value, limit.value);
    console.log(result);

    if (result.code == 200) {
        total.value = result.data.total;
        //存储已有品牌总个数
        trademarkArr.value = result.data.records;
    }
}
//获取el-form组件实例
let formRef = ref();

//新增品牌
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})

//组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有品牌数据
onMounted(() => {
    getHasTrademark();
});



const updateTrademark = (row: TradeMark) => {
    //清空校验规则错误提示信息
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    })
    // //对话框显示
    dialogFormVisible.value = true;
    // //ES6语法合并对象
    Object.assign(trademarkParams, row);
    // 像下面这样写太麻烦，用es6的合并对象语法就ok了
    // trademarkParams.id = row.id
    // trademarkParams.tmName = row.tmName
    // trademarkParams.logoUrl = row.logoUrl
}


//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
    //当前每一页的数据量发生变化的时候，当前页码归1
    getHasTrademark();
}


//添加品牌按钮的回调
const addTrademark = () => {
    //对话框显示
    dialogFormVisible.value = true;
    //清空收集数据
    trademarkParams.id = 0;
    trademarkParams.tmName = '';
    trademarkParams.logoUrl = '';
    //第一种写法:
    // formRef.value?.clearValidate('tmName');
    // formRef.value?.clearValidate('logoUrl');
    // 第二种写法
    nextTick(() => {
        formRef.value.clearValidate('tmName');
        formRef.value.clearValidate('logoUrl');
    })
    // 也顺便给编辑按钮
}


//对话框底部取消按钮
const cancel = () => {
    //对话框隐藏
    dialogFormVisible.value = false;
}
const confirm = async () => {
    //在你发请求之前,要对于整个表单进行校验

    //因为elementplus写了 validate()会对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise，我们就根据这个promise做，因为输入符合规则那就是fullfiled 不符合规则就是rejected，所以可以这么玩 await xxx.validate
    // let prom = formRef.value.validate();
    // console.log(prom); 笔记上有对应的值
    await formRef.value.validate();
    //调用这个方法进行全部表单相校验,如果校验全部通过，在执行后面的语法

    // 添加新的 或者修改
    let result: any = await reqAddOrUpdateTrademark(trademarkParams);
    //添加|修改已有品牌
    if (result.code == 200) {
        //关闭对话框
        dialogFormVisible.value = false;
        //弹出提示信息
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'

        });
        //再次发请求获取已有全部的品牌数据 ; 发送请求的时候有id吗? 有id那就是修改 就保留在当前页，没id那就是添加 跳到第一页
        getHasTrademark(trademarkParams.id ? pageNo.value : 1);
    } else {
        //添加品牌失败
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        });
        //关闭对话框
        dialogFormVisible.value = false;
    }
}

//钩子是在图片上传成功之前触发  来约束文件类型与大小
// @ts-ignore
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // rawFile这个上传的文件是什么文件类型都可以上传，所以咱们来做个限制
    //要求:上传文件格式png|jpg|gif 4M
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {//因为他是 字节
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小小于4M'
            })
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: "上传文件格式务必PNG|JPG|GIF"
        })
        return false;
    }
}

// 图片上传成功
// @ts-ignore
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //response:即为当前这次上传图片post请求服务器返回的数据
    //收集上传图片的地址, 将来新添加一个新的品牌的时候 带给服务器
    // (这块用不到那个参数uploadFile)
    trademarkParams.logoUrl = response.data;
    //图片上传成功,清除掉对应图片校验结果
    formRef.value.clearValidate('logoUrl');//clearValidate elementplus上的解释:清理某个字段的表单验证信息(这里是第一次没上传图片点击确定confirm会弹出callback小红字，然后再点击上传图片后要清除掉小红字)

}

//气泡确认框确定按钮的回调
const removeTradeMark = async (id: number) => {
    //点击确定按钮删除已有品牌请求
    let result = await reqDeleteTrademark(id);
    if (result.code == 200) {
        //删除成功提示信息
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        });
        //再次获取已有的品牌数据
        getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage({
            type: 'error',
            message: '删除品牌失败'
        })
    }
}

//自定义校验规则方法
// @ts-ignore
const validatorTmName = (rule: any, value: any, callBack: any) => {
    //是当表单元素触发blur时候,会触发此方法
    //自定义校验规则
    // console.log(rule);
    // console.log(value);


    if (value.trim().length >= 2) {
        callBack();
    } else {
        //校验未通过返回的错误的提示信息
        callBack(new Error('品牌名称位数大于等于两位'))
    }
}

// 自定义图片规则
// @ts-ignore
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    //如果图片上传
    if (value) {
        callBack();
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }
}
//表单校验规则对象
const rules = {
    tmName: [
        //required:这个字段务必校验,表单项前面出来五角星
        //trigger:代表触发校验规则时机[blur、change]
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
}

</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
