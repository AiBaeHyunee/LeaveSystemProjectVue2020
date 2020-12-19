<template>
    <div style="width: 500px;text-align: center;margin-left: auto;margin-right: auto;margin-top: 100px">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPwd">
                <el-input type="password" v-model="ruleForm.oldPwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
                <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off"></el-input>
            </el-form-item>
            <!--            <el-form-item label="确认密码" prop="checkPass">-->
            <!--                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            // var checkUsername = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('用户名不能为空'));
            //     }
            // };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            // var validatePass2 = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请再次输入密码'));
            //     } else if (value !== this.ruleForm.pass) {
            //         callback(new Error('两次输入密码不一致!'));
            //     } else {
            //         callback();
            //     }
            // };
            return {
                ruleForm: {
                    //输入
                    newPwd: '',
                    // checkPass: '',
                    oldPwd: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    // checkPass: [
                    //     { validator: validatePass2, trigger: 'blur' }
                    // ],
                    // oldpass: [
                    //     { validator: checkUsername(), trigger: 'blur' }
                    // ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('修改成功！');
                        console.log(this.ruleForm);
                        //put方法
                        axios.put('common/updatePwd',this.ruleForm)
                            .then(res => {
                                console.log(res.data);
                                if (res.data.code === 0) {
                                    alert('修改成功！')
                                }
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
