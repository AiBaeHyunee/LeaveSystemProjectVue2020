<template>
    <div>
        <el-row :gutter="27">
            <el-col :span="4">
                <!--显示登录用户界面-->
                <el-card shadow="hover" class="mgb20" style="width:220px;height:140px;">
                    <div class="user-info">
                        <img :src="Photo" class="user-avator" alt />
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
                <el-card shadow="hover" style="width:99%;height:400px;" v-model="message">
                    <div slot="header" class="clearfix">
                        <span>公告</span>
                        <!--<el-button style="float: right; padding: 3px 0" type="text">添加</el-button>-->
                    </div>
                    <el-table :data="todoList" :show-header="false" style="width: 100%">
                        <!--消息标题-->
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <!--date-->
                        <el-table-column prop="'date'" width="150"></el-table-column>
                    </el-table>
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
                            <i class="el-icon-lx-people grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div>个人信息</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-2">
                            <i class="el-icon-lx-notice grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div>离校进度</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-3">
                            <i class="el-icon-lx-goods grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div>离校表单</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-4">
                            <i class="el-icon-lx-goods grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div>修改密码</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="2.5" style="padding-left: 120px">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid-content grid-con-5">
                            <i class="el-icon-lx-goods grid-con-icon"></i>
                            <div class="grid-cont-right">
                                <div>管理员入口</div>
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
                todoList: [{
                    date: '2020-04-19 20:00:00',
                    title: '【财务部】2017届毕业生离校请退校园卡通知',
                },{
                    date: '2020-04-19 21:00:00',
                    title: '【财务部】2017届毕业生离校请退校园卡通知',
                },{
                    date: '2020-04-19 21:00:00',
                    title: '【财务部】2017届毕业生离校请退校园卡通知',
                },{
                    date: '2020-04-19 21:00:00',
                    title: '【财务部】2017届毕业生离校请退校园卡通知',
                },{
                    date: '2020-04-19 21:00:00',
                    title: '【财务部】2017届毕业生离校请退校园卡通知',
                },{
                    date: '2020-04-19 21:00:00',
                    title: '【财务部】2017届毕业生离校请退校园卡通知',
                }]
            }
        },
        created() {
            this.roles();
        },
        methods: {
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
                    let Photo = window.sessionStorage.getItem("stuPhoto");
                    console.log(Photo);
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
            }
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
</style>
