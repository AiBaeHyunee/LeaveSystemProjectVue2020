<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">数字离校系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="password"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="identifyCode">
                    <el-input v-model="param.identifyCode" placeholder="identifyCode">
                        <el-button slot="prepend" icon="el-icon-card"></el-button>
                    </el-input>
                </el-form-item>
                <!--                <template>-->
                <!--                    <el-image-->
                <!--                        src="require('../../../assets/img/img.jpg')">-->
                <!--                    </el-image>-->
                <!--                </template>-->
                <template>
                    <div id="app">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                        <el-button size="small" @click="refreshCode" id="yz">看不清，换一张验证码</el-button>
                    </div>
                </template>
                <br>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码任意。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default{
        data: function() {
            return {
                param: {
                    username: 'admin',
                    password: '123123',

                },
                identifyCodes: '1234567890',
                identifyCode: '',
                rules: {
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                    // vertifycode:[{equired: true, message: '请输入验证码', trigger: 'blur' }]
                },
            }
        },
        methods: {
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        this.$message.success('登录成功');
                        localStorage.setItem('ms_username', this.param.username);
                        this.$router.push('/home');
                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            randomNum (min, max) {
                return Math.floor(Math.random() * (max - min) + min)
            },
            refreshCode () {
                this.identifyCode = ''
                this.makeCode(this.identifyCodes, 4)
            },
            makeCode (o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
                }
            }
        },
        mounted () {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        }
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
