<template>
    <div>

        <div>
            <!--            &lt;!&ndash; 点击send_message页面中的消息时，跳转到这个页面查看具体收到的消息标题以及内容 &ndash;&gt;-->
            <!-- 已过时-------》如果msgStatus为1的话，就是新消息，我只需要拿到新消息 -->
            <div>
                <!--              read接口  学生发送申请给部门管理员，管理员已读后 msgStatus：1 会回复我们的消息（一条），并覆盖掉学生发送的消息。-----》管理员回复申请--申请通过消息 -->
                <div class="bh-col-md-12 bh-form-groupname borderLeft bh-mb-24" style="text-align: left;margin-top: 20px;margin-bottom: 15px">申请通过消息</div>
                <el-table
                        :data="tableData1"
                        border
                        style="width: 95%;margin: 0 auto">
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="内容"
                            width="470">
                    </el-table-column>
                    <el-table-column
                            prop="messagedate"
                            label="发布时间"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            prop="receiveID"
                            label="来自"
                            width="110">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="120">
                        <template slot-scope="scope">
                            <!--                        <template>-->
                            <!--                             @click="handleRead(scope.$index)"-->
                            <!--                            <el-button-->
                            <!--                                    size="small"-->
                            <!--                                    @click="handleRead(scope.$index, scope.row)"-->
                            <!--                                    :class="{grey: index === currentIndex }">-->
                            <!--                                标为已读-->
                            <!--                            </el-button>-->
                            <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDel(scope.row)">
                                删除
                            </el-button>
                            <!--                            @click.native.prevent="deleteRow(scope.$index, tableData)"-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="height: 60px"></div>
        </div>


        <div>
            <!--            &lt;!&ndash; 点击send_message页面中的消息时，跳转到这个页面查看具体收到的消息标题以及内容 &ndash;&gt;-->
            <!-- 已过时-------》如果msgStatus为1的话，就是新消息，我只需要拿到新消息 -->
            <div>
                <!--              unread接口  学生发送申请给部门管理员，管理员未读 msgStatus：0 ------- 即：显示学生提交的申请，管理员还未审核的。-->
                <div class="bh-col-md-12 bh-form-groupname borderLeft bh-mb-24" style="text-align: left;margin-top: 20px;margin-bottom: 15px">管理员未审核</div>
                <el-table
                        :data="tableData2"
                        border
                        style="width: 95%;margin: 0 auto">
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="内容"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="messagedate"
                            label="发布时间"
                            width="270">
                    </el-table-column>
                    <el-table-column
                            prop="receiveID"
                            label="来自"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="240">
                        <template slot-scope="scope">
                            <!--                        <template>-->
                            <!--                             @click="handleRead(scope.$index)"-->
                            <!--                            <el-button-->
                            <!--                                    size="small"-->
                            <!--                                    @click="handleRead(scope.$index, scope.row)"-->
                            <!--                                    :class="{grey: index === currentIndex }">-->
                            <!--                                标为已读-->
                            <!--                            </el-button>-->
                            <!--                            <el-button-->
                            <!--                                    @click="dialogFormVisible = true"-->
                            <!--                                    type="primary"-->
                            <!--                                    size="small">-->
                            <!--                                重新提交申请-->
                            <!--                            </el-button>-->
                            <el-button
                                    @click="jump"
                                    type="primary"
                                    size="small">
                                重新提交申请
                            </el-button>
                            <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDel(scope.row)">
                                撤销申请
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="height: 60px"></div>
        </div>

    </div>


</template>

<script>
    import axios from "axios"

    export default {
        // name: "answer_message",

        data() {
            return {
                dialogFormVisible: false,
                formLabelWidth: '120px',


                message: 'first',
                showHeader: false,
                msgform:[],
                messageForm: {},
                rules: {
                    title: [
                        { required: true, message: '请输入消息标题（必填）', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请填写消息内容', trigger: 'blur' }
                    ]
                },

                tableData1:[],
                tableData2:[],
                // tableData: [{
                //     //这是教务处发给学生的消息
                //     sendID:'教务处',//发送方Id
                //     receiveID: '2018110411',//接收方Id
                //     messagedate: '2020-07-19 21:00:00',//消息发送时间
                //     title: '【通知】你的离校申请【计财处】未通过',
                //     content: '和看到回复拉菲红地方的返回计科的发爱好的反馈了阿UI花覅度犯困方法卡话费卡额很过',
                //     msgStatus: '1',//1:新消息，0:教务处审核已通过
                // }]
            };
        },
        created() {
            this.getData1();
            this.getData2();
        },
        methods: {
            // 已过时----》从后端拿用户已发布消息的数据渲染到 tableData[]中
            getData1() {
                //无请求参数
                axios.get('student/showmessageRead').then(res => {
                    console.log(res.data);
                    if (res.data.code === 20000) {
                        this.tableData1 = res.data.data;
                        console.log('1')
                        console.log(this.tableData1)
                    }
                });
            },
            //
            getData2() {
                axios.get('student/showmessageUnread').then(res => {
                    console.log(res.data);
                    if (res.data.code === 20000) {
                        this.tableData2 = res.data.data;
                        console.log('2')
                        console.log(this.tableData2)
                    }
                });
            },


            handleDel(row) {
                console.log(typeof row.messageID)
                console.log(row.messageID)

                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        axios.post('student/deletemessage',row.messageID)
                            .then(res => {
                                console.log(res.data);
                                if (res.data.code === 20000) {
                                    // 后端成功删除了数据
                                    console.log('删除成功！')
                                    this.getData1();
                                    this.getData2();
                                    this.$message.success('删除成功！')
                                }else {
                                    console.log('失败')
                                }
                            });
                    })
                    .catch(() => {});

            },


            jump() {
                this.$router.push({path: '/student/review_submit'})
            },


        }
    }
</script>

<style scoped>
    .grey {
        color: #8c939d;
    }

    .msgForm {
        width: 95%;
        margin:0 auto;
        margin-top: 10px;
        border:1px solid #ddd;
        border-radius: 2px
    }

    .bh-form-groupname {
        font-size: 16px;
        font-weight: 700;
        border-left: 4px solid #009688;
        padding-left: 8px;
        line-height: 16px;
        min-height: 0!important;
        margin-bottom: 8px;
        float: none!important;
    }


    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
