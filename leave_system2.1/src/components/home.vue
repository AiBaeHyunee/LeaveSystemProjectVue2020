<template>
    <div>
        <el-row :gutter="27">
            <el-col :span="4">
                <!--显示登录用户界面-->
                <el-card shadow="hover" class="mgb20" style="width:220px;height:140px;">
                    <div class="user-info">
                        <img src="../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{account}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <!--公告栏-->
            <!--            <div class="container">-->
            <el-col :span="20">
                <el-card shadow="hover" style="width:99%;" v-model="message">
                    <div slot="header" class="clearfix">
                        <span>公告</span>
                        <el-button type="small" style="float: right" @click="getList()" v-if="account!=null">部门公告</el-button>
                        <!--<el-button style="float: right; padding: 3px 0" type="text">添加</el-button>-->
                    </div>
                    <el-table :data="todoList" :show-header="false" style="width: 100%" class="show_table" >
                        <!--消息标题-->
                        <el-table-column>
                            <template slot-scope="scope">
<!--                                {{scope.row.publishTime}}-->
                            <div    v-if="scope.row.isTop==='1'">
                                <a  style="color:red" @click="getNotice(scope.row.noticeID),dialogVisible = true" class="message-title">【{{scope.row.noticeType}}】{{scope.row.title}} <img src="../assets/img/new.gif">
                                </a>
                            </div>
                                <div    v-if="scope.row.isTop==='0'">
                                    <a  style="color:blue" @click="getNotice(scope.row.noticeID),dialogVisible = true" >【{{scope.row.noticeType}}】{{scope.row.title}}    </a>
                                </div>
                            </template>
                        </el-table-column>
                        <!--date-->
                        <el-table-column prop="'date'" width="150"></el-table-column>
                    </el-table>
                    <el-dialog
                        :visible.sync="dialogVisible"
                        @close="onDialogClose()">
                        <template slot="title">
                            <div class='titleSize'>公告详情</div>
                        </template>
                        <el-form ref="todoList"  :model="todoList" label-width="80px" class="f2" >
                            <el-form-item label="标题:" prop="title" style="align-content: center">
                                <span>{{todoList.title}}</span>
                                <!--                            <el-input v-model="financeData.stuNumber" placeholder="学号"></el-input>-->
                            </el-form-item>
                            <el-divider></el-divider>
                            <el-form-item label="内容:" prop="content">
                                <span>{{todoList.content}}</span>
                            </el-form-item>
<!--                            <el-divider></el-divider>-->

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">关闭</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-card>
            </el-col>

        </el-row>

        <!-- 常用功能 -->
        <el-row>
            <div style="text-align:center;padding-bottom: 20px;">
                <span>常用功能</span>
            </div>
            <el-row :gutter="15" class="mgb20" style="padding-left: 120px">
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-1">
                            <i class="el-icon-user grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <el-button @click="userInfo">个人信息</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-2">
                            <i class="el-icon-date grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <el-button @click="leaveProgress">离校进度</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-3">
                            <i class="el-icon-tickets grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <el-button @click="leaveTable">离校表单</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-4">
                            <i class="el-icon-edit-outline grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <el-button @click="reviewPwd">修改密码</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-5">
                            <i class="el-icon-user-solid grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <el-button @click="manage">管理员入口</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </el-row>

    </div>
</template>

<script>
    // import Schart from 'vue-schart';
    // import bus from './common/bus';
    import teacher from "../api/edu/teacher";
    export default {
        data() {
            return {
                name:'未登录',
                department:'无角色',
                message: 'first',
                showHeader: false,
                account:'',
                role:'',
                Photo:'',
                total: 0,//总记录数
                page:1,//当前页
                limit:10,//每页记录数
                todoList: [],
                dialogVisible:false
            }
        },
        created() {
            this.getInfo()
            this.roles();
        },
        methods: {
            getList(page =1) {
                this.page = page
                this.$axios.get('/sector/notice/findSelfNotice/' +this.limit+'/' +this.page ).then(res=>{
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    // this.total = res.data.data.total;
                    // this.todoList = res.data.data.list;
                    console.log(res.data.data);
                    if (res.data.data!=null){
                        this.todoList = res.data.data.list;
                        console.log(this.todoList);
                    }
                    else{
                        this.$message({
                            type: 'error',
                            message:res.data.message
                        })

                    }
                    this.message = res.data.message;
                    console.log(this.message);
                    console.log(this.todoList);
                    // if (res.data.success!=null){
                    //
                    //     this.$message({
                    //         type: 'success',
                    //         message:res.data.message
                    //     })}
                    // else {}


                }, function(err) {
                    console.log(err);
                })
            },
            getNotice(id){
                    teacher.getNotice(id)
                        .then(response => {
                            this.todoList = response.data[0]
                            console.log(this.todoList)
                        })
            },
            getInfo() {
                this.$axios.get('/common/notice/viewByAllPeople').then(res=> {
                    this.todoList = res.data.data
                    // if (this.todoList != null) {
                    //     this.$message({
                    //         type: 'success',
                    //         message: res.data.message
                    //     })
                    // } else {
                    //     this.$message({
                    //         type: 'error',
                    //         message: res.data.message
                    //     })
                    // }
                })},
            roles(){
                if(window.sessionStorage.getItem("stuType") !=="undefined") {
                    let useraccount = window.sessionStorage.getItem("stuNumber");
                    console.log(useraccount);
                    if (useraccount) {
                        this.account = useraccount;
                    }

                    let userrole = window.sessionStorage.getItem("stuDept");
                    console.log(userrole);
                    if (userrole) {
                        this.role = userrole;
                    }
                    // let Photo = window.sessionStorage.getItem("stuPhoto");
                    // console.log(Photo);
                }
                else{
                    let useraccount = window.sessionStorage.getItem("clerkAccount");
                    console.log(useraccount);
                    if (useraccount) {
                        this.account = useraccount;
                    }

                    let userrole = window.sessionStorage.getItem("department");
                    console.log(userrole);
                    if (userrole) {
                        this.role = userrole;
                    }
                    let Photo = window.sessionStorage.getItem("clerkPhoto");
                    console.log(Photo);
                }

            },
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                });
            },
            userInfo(){
                this.$router.push('/user_info');
            },
            onDialogClose() {
                this.$refs.todoList.resetFields()
            },
        }
    };
</script>


<style scoped>
    .el-row {
        margin-bottom: 40px;
    }

    .grid-content {
        display: table-cell;
        align-items: center;
        height: 80px;
    }

    .grid-cont-right {
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 70px;
        text-align: center;
        line-height: 70px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(47, 148, 213);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(59, 187, 242);
    }

    .grid-con-4 .grid-con-icon {
        background: rgb(71, 185, 242);
    }

    .grid-con-5 .grid-con-icon {
        background: rgb(79, 133, 242);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 10px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 20px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }
    .show_table {
        position: relative;
        width: 100%;
        height: 300px;
        overflow: auto;
    }
    .f2{
        font-size: 30px;
        /*text-align:center;*/
        font-weight:bold;

        border: 1px solid #dcdfe6 !important;
    }

    .titleSize{
        font-size: 30px;
        text-align:center;
    }
    .message-title{
        font-weight:bold;
    }

</style>
