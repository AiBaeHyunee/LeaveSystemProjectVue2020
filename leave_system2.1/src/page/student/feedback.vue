<template>
    <div>
        <div>
            <div>
                <div class="bh-col-md-12 bh-form-groupname borderLeft bh-mb-24" style="text-align: left;margin-top: 20px;margin-bottom: 15px">申请通过消息</div>
                <el-table
                        :data="tableData1"
                        border
                        style="width: 95%;margin: 0 auto">
                    <el-table-column prop="title" label="标题" width="260"></el-table-column>
                    <el-table-column prop="content" label="内容" width="470"></el-table-column>
                    <el-table-column prop="messagedate" label="发布时间" width="250"></el-table-column>
                    <el-table-column prop="receiveID" label="来自" width="110"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="120">
                        <template slot-scope="scope">
                            <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDel(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="height: 60px"></div>
        </div>

        <div>
            <div>
                <div class="bh-col-md-12 bh-form-groupname borderLeft bh-mb-24" style="text-align: left;margin-top: 20px;margin-bottom: 15px">管理员未审核</div>
                <el-table
                        :data="tableData2"
                        border
                        style="width: 95%;margin: 0 auto">
                    <el-table-column prop="title" label="标题" width="200"></el-table-column>
                    <el-table-column prop="content" label="内容" width="400"></el-table-column>
                    <el-table-column prop="messagedate" label="发布时间" min-width="150"></el-table-column>
                    <el-table-column prop="receiveID" label="来自" min-width="170"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="150">
                        <template slot-scope="scope">
                            <el-button
                                    @click="dialogFormVisible = true"
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

        <div>
            <el-dialog title="提交申请" :visible.sync="dialogFormVisible">
                <el-form :model="messageForm" :rules="rules">
<!--                    <el-form-item label="接收方" prop="receiveID" :label-width="formLabelWidth">-->
<!--                        <el-input v-model="messageForm.receiveID" autocomplete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                    781917504145457152-->
                    <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
                        <el-input v-model="messageForm.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="申请内容" prop="content" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="messageForm.content"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm(),dialogFormVisible = false">发送</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>


</template>

<script>
    import axios from "axios"
    import stu from "@/api/edu/stu.js"

    export default {
        name: "answer_message",

        data() {
            return {
                sendID:'',
                receiveID:'',

                dialogFormVisible: false,
                formLabelWidth: '120px',

                // answer_show: true,//expand框是否展开

                message: 'first',
                showHeader: false,
                msgform:[],//将 messageForm 的数据push进这个数组
                messageForm: {
                    // receiveID:'781917504145457152'
                },//在表单中填写的数据会存放在这个对象中
                rules: {
                    receiveID: [
                        { required: true, message: '请输入接收方（必填）', trigger: 'blur' },
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
            // createFilter();
            // handleRead();
            this.handleDel();
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
                        // if(this.tableData.num = 0) {
                        //     this.answer_show = false;
                        // }
                        // createFilter();//过滤数据
                    }
                });
            },
            //
            getData2() {
                //无请求参数
                axios.get('student/showmessageUnread').then(res => {
                    console.log(res.data);
                    if (res.data.code === 20000) {
                        this.tableData2 = res.data.data;
                        console.log('2')
                        console.log(this.tableData2)
                    }
                });
            },


            // 当点击 未读消息中标为已读 时，改变字体颜色
            // handleRead(index,row) {
            //     // this.idx = index;
            //     console.log(row);
            //     this.form = row;
            //     // const item = this.tableData.splice(index, 1);
            //     // console.log(item)   // item为数组
            //     this.currentIndex = index;
            //     this.$emit('tabClick',index);
            //     // this.$set(this.tableData2, this.idx, this.form);
            // },


            handleDel(row) {
                // 从 read[]列表 中删除该行
                // const item = this.read.splice(index, 1);//前端静态操作
                // console.log(item)
                // 将该消息的 messageID 作为请求参数发送给后端
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
                        //index是行索引号，1是指删除一行
                        // this.tableData1.splice(index, 1);
                    })
                    .catch(() => {});

                // row.splice(index, 1);
                // console.log(JSON.stringify(row.messageID))
                // axios.post('student/deletemessage', {
                //     params: {
                //         //将当前删除行的 messageID 发送给后端
                //         messageID:JSON.stringify(row.messageID),
                //     }
                // })
            },


            // 提交表单
            submitForm() {
                console.log('messageForm')
                console.log(JSON.stringify(this.messageForm));
                console.log(this.messageForm);
                this.getData1();
                this.getData2();
                stu.SendMessage(this.messageForm).then(res=>{
                    // 不拿tableData的数据，只需拿后端返回的状态，如果code=20000就表示后端接收到了数据
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
                })
                // this.$axios.post('student/ResendMessage',this.messageForm)
                //     .then(res => {
                //         // 不拿tableData的数据，只需拿后端返回的状态，如果code=20000就表示后端接收到了数据
                //         console.log(res.data);//或者就是res.data
                //         if (res.data.code === 20000) {
                //             // 后端成功接收到了数据
                //             // this.returncode = res.data.code;
                //             // console.log(this.returncode);
                //             console.log('后端接收成功！')
                //             alert('发送成功！');
                //             //this.tableData = res.data.list;//或者就是res.data
                //         }else {
                //             console.log('失败')
                //         }
                //     });
            },
        }
    }
</script>

<style scoped>
    /* 点击按钮变颜色 */
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

    /*查看回复按钮*/
    /*.transition-box {*/
    /*    margin-bottom: 10px;*/
    /*    width: 200px;*/
    /*    height: 100px;*/
    /*    border-radius: 4px;*/
    /*    background-color: #409EFF;*/
    /*    text-align: center;*/
    /*    color: #fff;*/
    /*    padding: 40px 20px;*/
    /*    box-sizing: border-box;*/
    /*    margin-right: 20px;*/
    /*}*/

    /*表格扩展框*/
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
