<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">
                <!-- 这里的这个 xs 是响应式 : 当前的设备屏幕 小于 768px时 占据24份中的 x 份 那我写0就可以起到隐藏的作用 -->
            </el-col>

            <el-col :span="12" :xs="24">

                <el-form class="form" :model="loginForm" :rules="loginRules" ref="loginReview">

                    <el-form-item prop="username">
                        <el-input v-model.trim="loginForm.username" :prefix-icon="User" placeholder="请输入账号"></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input v-model.trim="loginForm.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                            show-password />
                    </el-form-item>

                    <el-form-item>
                        <el-button :loading="loadButton" id="btn" type="primary" @click="submitForm()">登陆</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import useUserStore from "@/store/modules/user"
import router from "@/router/index"
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time';
import { useRoute } from 'vue-router';
const route = useRoute();
const useStore = useUserStore()
// 定义变量来控制按钮的loading效果
const loadButton = ref(false)
const loginForm = reactive({ username: 'admin', password: 'atguigu123' })
const submitForm = async () => {
    // let result = loginReview.value.validate()
    // console.log(result)
    // 表单校验
    await loginReview.value.validate()
    // 开始转 (这个还能起到 网速慢的情况下 防止用户疯狂点击 转圈结束才能再点一次)
    loadButton.value = true
    try {
        await useStore.userLogin(loginForm);
        // 做那个多此一举的功能
        let redirect: any = route.query.redirect;
        router.push({ path: redirect || '/' })

        ElNotification({
            type: "success",
            message: "欢迎回来",
            title: `嗨嗨嗨,${getTime()}好`
        })

        // 停止转
        loadButton.value = false
    } catch (error) {
        // 停止转
        loadButton.value = false

        ElNotification({
            type: "error",
            message: (error as Error).message
        })

    }


}

// 表单的rules
const loginRules = reactive({
    username: [
        { required: true, message: 'Please input your name', trigger: 'blur' },
        { min: 3, max: 8, message: 'Length should be 3 to 8', trigger: 'blur' },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, max: 16, message: '密码位数位3-16', trigger: 'blur' },
        // { pattern: '^\d{6,}$', message: '正则不对' }
    ]
})
const loginReview = ref()

</script>


<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .form {
        width: 80%; //宽度 占 右侧12分栏的 80%
        position: relative;
        top: 30vh;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;

        h2 {
            color: white;
            font-size: 40px;
        }

        h3 {
            font-size: 20px;
            color: white;
            margin: 20px 0;
        }

        .el-input {
            color: black;
        }

        #btn {
            width: 100%;
        }

    }

}
</style>

