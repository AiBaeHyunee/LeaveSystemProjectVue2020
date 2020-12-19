<template>
    <div border class="container">>
        <!--        </el-form>-->
        <div class="crumbs" style="margin-bottom: 30px">
            <el-breadcrumb separator="/">
                <!--                <el-breadcrumb-item :to="{path: '/manager/empower/detail_feedback'}">-->
                <el-breadcrumb-item :to="{path: '/manager/empower/feedback'}">
                    返回消息详情
                </el-breadcrumb-item>
                <!--                <el-breadcrumb-item :to="{ path: '/student/tijiao_shenhe' }">-->
                <el-breadcrumb-item :to="{ path: '/student/review_submit' }">
                    提交审核
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div><hr/>
        <div style="text-align: center;margin-top: 40px;font-size: 25px;font-weight: 800">提交审核</div>
        <div style="height: 50px"></div>
        <div style="width: 70%;margin: 0 auto" border>
            <el-form ref="messageForm" :rules="rules" label-width="80px" border style="font-weight: 700;">
                <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
                    <el-input v-model="messageForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content" >
                    <el-input type="textarea" v-model="messageForm.content" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" @click="submitForm">提交申请</el-button>
                    <el-button @click="reset">重写</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    // import axios from "axios"

    export default {
        name: "tijiao_shenhe",

        data() {
            return {
                msgform:[],//将 messageForm 的数据push进这个数组
                messageForm: {
                    title: '',
                    content: '2'
                },//在表单中填写的数据会存放在这个对象中
                rules: {
                    title: [
                        { required: true, message: '请输入消息标题（必填）', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请填写消息内容', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            reset() {
                this.messageForm = {
                    title:'',
                    content:''
                }
            },
            submitForm() {
                // 将messageForm push进 msgform[]数组中，之后在getData()中发送给后端
                this.msgform.push(this.messageForm);

                console.log('messageForm')
                console.log(JSON.stringify(this.messageForm));
                console.log(this.messageForm);
                this.messageForm = {
                    title:'',
                    content:''
                }
                alert('发送成功！')

                this.$reqs.post("student/ReSendMessage", this.messageForm)
                    .then(res => {
                        console.log(res.data);//或者就是res.data
                        if (res.data.code === 20000) {
                            // 后端成功接收到了数据
                            // this.returncode = res.data.code;
                            // console.log(this.returncode);
                            console.log('后端接收成功！')
                            alert('发送成功！');
                            //this.tableData = res.data.list;//或者就是res.data
                        }else {
                            console.log('失败')
                        }
                    });
            },
        }
    }
</script>

<style scoped>

</style>
