<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">数字离校系统</div>
                <el-form :model="param" :rules="rules" ref="param" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password">
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登录</el-button>
                    </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                param: {
                    username: '2018110427',
                    password: '123456',
                },
                rules: {
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                    // vertifycode:[{equired: true, message: '请输入验证码', trigger: 'blur' }]
                },
            }
        },
        methods: {
            //方法一
            submitForm() {
                this.$refs.param.validate(async valid => {
                    if (!valid) return;
                    console.log("login")
                    const {data: res} = await this.$http.post('/login?username=' + this.param.username + '&password=' + this.param.password)
                    console.log(res)
                    if (res.code !== 20000) return this.$message.error(res.message)
                    console.log(res.message)
                    this.$message.success(res.message)
                    console.log(res.data.clerkName)
                    window.sessionStorage.setItem("clerkName",res.data.clerkName)
                    console.log(res.data.clerkAccount)
                    window.sessionStorage.setItem("clerkAccount",res.data.clerkAccount)
                    console.log(res.data.department)
                    window.sessionStorage.setItem("department",res.data.department)
                    console.log(res.data.stuType)
                    window.sessionStorage.setItem("stuType",res.data.stuType)
                    console.log(res.data.stuName)
                    window.sessionStorage.setItem("stuName",res.data.stuName)
                    console.log(res.data.stuNumber)
                    window.sessionStorage.setItem("stuNumber",res.data.stuNumber)
                    console.log(res.data.stuDept)
                    window.sessionStorage.setItem("stuDept",res.data.stuDept)

                    window.sessionStorage.setItem("stuPhoto",res.data.stuPhoto)
                    window.sessionStorage.setItem("clerkPhoto",res.data.clerkPhoto)
                    this.$router.push('/home')
                });
            },
        },
        mounted () {

        },
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    #yz{
        margin-left: 135px;
    }
    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #47b9f2;
        border-bottom: 1px solid #ddd;
    }
    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }
    .ms-content {
        padding: 30px 30px;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }
    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
