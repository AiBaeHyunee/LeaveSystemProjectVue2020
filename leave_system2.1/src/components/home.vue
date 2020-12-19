<template>
    <div>
        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
            查看个人信息
        </el-button>

        <el-drawer title="我的个人信息" :visible.sync="drawer">
            <div class="user-info">
                <img src="../assets/img/img.jpg" class="user-avator" alt />
                <div class="user-info-cont">
                    <div class="user-info-name">{{account}}</div>
                    <div>{{role}}</div>
                </div>
            </div>
        </el-drawer>

        <el-row>
            <el-col>
                <el-carousel :interval="4000" type="card" height="300px" >
                    <el-carousel-item v-for="(item,index) in imglist" :key="index">
                        <el-image :src="item.img" :preview-src-list="imgitemlist" id="imgitem" style="width:100%;height:100%"/>                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>

        <el-row :gutter="30">
            <!--公告栏-->
            <el-col :span="16">
                <el-card shadow="hover"  v-model="message">
                    <div slot="header" class="clearfix">
                        <span>公告</span>
                        <el-button type="small" style="float: right" @click="getList()" v-if="clerk!='undefined'">我的公告</el-button>
<!--                        <el-button type="small" style="float: right" @click="returnBack()" v-if="clerk!='undefined',clickButton=1">返回</el-button>-->
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

                        <mavon-editor
                                class="md"
                                :value="todoList.content"
                                :subfield="false"
                                :defaultOpen="'preview'"
                                :toolbarsFlag="false"
                                :editable="false"
                                :scrollStyle="true"
                                :ishljs="true"
                        />
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">关闭</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-card>
            </el-col>
            <el-col :span="8" >
                <el-card >
                    <el-calendar v-model="value" style="height: 500px"></el-calendar>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="12">
                <el-card>
                    <cmap></cmap>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <ecard></ecard>
                </el-card>
            </el-col>
        </el-row>

        <!-- 常用功能 -->
        <el-row>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;" class="show_load" >
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                        class="todo-item"
                                        :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
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
                                <el-button @click="noticeMsg">公告信息</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-3">
                            <i class="el-icon-tickets grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <el-button @click="answerMsg">答复消息</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-4">
                            <i class="el-icon-edit-outline grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <el-button @click="modifyPwd">修改密码</el-button>
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
                drawer: false,
                //轮播图
                imglist:[
                    {img:'https://cdn.stocksnap.io/img-thumbs/280h/3PQLBTZQPC.jpg'},
                    {img:'https://cdn.stocksnap.io/img-thumbs/280h/RB7IEMA2PS.jpg'},
                    {img:'https://cdn.stocksnap.io/img-thumbs/280h/E1C34B4580.jpg'},
                    {img:'https://image.shutterstock.com/image-photo/happy-smiling-kid-glasses-going-260nw-1146209870.jpg'},
                    {img:'https://cdn.stocksnap.io/img-thumbs/280h/school-university_BB76EYQM84.jpg'},
                    {img:'https://cdn.stocksnap.io/img-thumbs/280h/EWT7K0DQLN.jpg'},
                    {img:'https://cdn.stocksnap.io/img-thumbs/280h/4B1IQUY1C3.jpg'},
                    {img:'https://cdn.stocksnap.io/img-thumbs/280h/4TDHSPIMJ6.jpg'},
                    {img:'https://cdn.stocksnap.io/img-thumbs/280h/1D180509DF.jpg'},
                ],
                imgitemlist:[
                    'https://cdn.stocksnap.io/img-thumbs/280h/3PQLBTZQPC.jpg',
                    'https://cdn.stocksnap.io/img-thumbs/280h/RB7IEMA2PS.jpg',
                    'https://cdn.stocksnap.io/img-thumbs/280h/E1C34B4580.jpg',
                    'https://image.shutterstock.com/image-photo/happy-smiling-kid-glasses-going-260nw-1146209870.jpg',
                    'https://cdn.stocksnap.io/img-thumbs/280h/school-university_BB76EYQM84.jpg',
                    'https://cdn.stocksnap.io/img-thumbs/280h/EWT7K0DQLN.jpg',
                    'https://cdn.stocksnap.io/img-thumbs/280h/4B1IQUY1C3.jpg',
                    'https://cdn.stocksnap.io/img-thumbs/280h/4TDHSPIMJ6.jpg',
                    'https://cdn.stocksnap.io/img-thumbs/280h/1D180509DF.jpg'
                ],
                //日历
                value: new Date(),
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
                dialogVisible:false,
                clerk:'',
                clickButton:0,
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
                    this.clickButton =1
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
                    this.clerk = window.sessionStorage.getItem('clerkAccount')
                    console.log(this.clerk)
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
            noticeMsg(){
                this.$router.push('/system_msg/notice_msg');
            },
            answerMsg(){
                this.$router.push('/system_msg/answer_msg');
            },

             modifyPwd(){
                this.$router.push('/modify_password');
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
        height: 445px;
        overflow: auto;
    }
    .show_load{
        position: relative;
        width: 100%;
        height: 300px;
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
    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
     #imgitem{
        height: 100%;
        width: 100%;
        position: absolute;
    }
</style>
