<template>
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >教务处</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/office/search_progress' }">教务处查询</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/office/review_progress' }">教务处审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <el-row style="font-size: 20px">学生信息详情</el-row>
        <el-table
                :data="stuInfo"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="民族"><span>{{ props.row.stuNation }}</span></el-form-item>
                        <el-form-item label="身份"><span>{{ props.row.stuFeature }}</span></el-form-item>
                        <el-form-item label="性别"><span>{{ props.row.stuSex }}</span></el-form-item>
                        <el-form-item label="专业"><span>{{ props.row.stuSpecialty }}</span></el-form-item>
                        <el-form-item label="班级"><span>{{ props.row.stuClass }}</span></el-form-item>
                        <el-form-item label="地址"><span>{{ props.row.stuAddress }}</span></el-form-item>
                        <el-form-item label="电话"><span>{{ props.row.stuPhoneNumber }}</span></el-form-item>
                        <el-form-item label="联系方式"><span>{{ props.row.stuContact }}</span></el-form-item>
                        <el-form-item label="进校时间"><span>{{ props.row.stuInDate }}</span></el-form-item>
                        <el-form-item label="离校时间"><span>{{ props.row.stuOutDate }}</span></el-form-item>
                        <el-form-item label="已修学分"><span>{{ props.row.stuCredit }}</span></el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="学生学号" prop="stuNumber" min-width="170px" sortable></el-table-column>
            <el-table-column label="学生姓名" prop="stuName" min-width="170px" sortable></el-table-column>
            <el-table-column label="学院" prop="stuDept" min-width="170px"></el-table-column>
            <el-table-column label="学历" prop="stuType" min-width="170px"></el-table-column>
        </el-table>
        </el-card>

        <div>
            <el-divider></el-divider>
            <span></span>
        </div>

        <el-card>
            <el-row style="font-size: 20px">部门进度审核</el-row>
            <el-steps :space="200" :active="number" finish-status="success" style="margin-left: 400px">
                <el-step title="准备离校"></el-step>
                <el-step title="进行中"></el-step>
                <el-step title="已完成"></el-step>
            </el-steps>
            <div class="content-table" style="margin-left: 400px;">
                <mail :tableData="tableData" :tableStyle="{ width:'600px' }" :class="highligt(tableData.value)"></mail>
            </div>
            <div style="margin-left: 500px">
                <el-button type="success" size="mini" icon ="el-icon-edit" @click="eduReview()" v-if="this.count === 4 ">审核</el-button>
                <el-button type="primary" size="mini" icon ="el-icon-edit"  style="margin-left: 100px" @click="sendMsg()" v-if="this.count === 4 ">反馈</el-button>
                <router-link :to="'/sector/office/search_progress'" style="margin-left: 100px">
                    <el-button type="info" size="mini" icon="el-icon-refresh-left">返回</el-button>
                </router-link>
            </div>

        </el-card>

        <el-dialog title="拒绝信息" :visible.sync="dialogVisible" @close="onDialogClose()">
            <el-form ref="dataForm" :model="dataForm" label-width="80px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="dataForm.title" placeholder="请输入标题"></el-input>
                </el-form-item>

                <el-form-item label="内容" prop="content">
                    <el-input v-model="dataForm.content" placeholder="请输入拒绝理由"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="info" @click="sendMsg">发送</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData:[
                    {key: '一卡通注销', value:'未审核'},
                    {key: '后勤部宿舍迁出', value: '未审核'},
                    {key: '财务处缴费', value: '未审核'},
                    {key: '图书馆图书借阅', value: '未审核'},
                    {key: '教务处毕业证审核', value: '未审核'},
                ],
                stuInfo:[],
                number:1,
                count:0,
                dialogVisible:false,
                dataForm:{},
              }
        },
        created() {
            this.searchEdu()
        },
        methods:{
            //高光文字
            highligt(value){
              if(value === '未审核'){
                  return 'red-color';
              }
              return ;
            },
            //发送拒绝消息
            onDialogClose() {
                this.dataForm.content = []
                this.$refs.dataForm.resetFields()
            },
            sendMsg() {
                this.dialogVisible = true,
                this.$axios.post('/sector/edu/checkRefuse/' + window.sessionStorage.getItem("edustuNumber"),this.dataForm)
                    .then(response => {//添加成功
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '发送成功!'
                        });
                        //回到列表页面 路由跳转
                        this.dialogVisible = false
                        this.searchEdu()
                        console.log(response);
                    })
            },
            init(){
                for(let i = 0;i <=4 ;i++){
                    if(this.tableData[i].value ==='0'){
                        this.tableData[i].value='未审核'
                    }else{
                        this.tableData[i].value='已审核'
                        this.count++;
                        console.log(this.count)
                    }
                }
                if(this.count === 5){
                    this.number = 3
                }
                else if(this.count === 0){
                    this.number = 0
                }
                else{
                    this.number = 2
                }
            },
            searchEdu(){
                this.count =0
                this.$axios.get('/sector/edu/stuInfoAndProcess/' + window.sessionStorage.getItem("edustuNumber")).then(res => {
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.stuInfo = res.data.data.stuInfo;

                    this.tableData[0].value = res.data.data.process[0].cardStatus;
                    this.tableData[1].value = res.data.data.process[0].dormStatus;
                    this.tableData[2].value = res.data.data.process[0].financeStatus;
                    this.tableData[3].value = res.data.data.process[0].libStatus;
                    this.tableData[4].value = res.data.data.process[0].eduStatus;

                    this.init()
                    console.log(this.stuInfo);
                    console.log(res.data.data.process);

                }, function (err) {
                    console.log(err);
                })
            },
            eduReview(){
                this.$confirm('是否通过审核', '提示', {
                    confirmButtonText: '确认审核',
                    cancelButtonText: '取消审核',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/sector/edu/checkPass/' + window.sessionStorage.getItem("edustuNumber")).then(res => {
                        console.log(res.data);
                        this.$message({
                            type: 'success',
                            message: '审核成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消审核'
                        });

                    });
                    this.searchEdu()
                });
            },

        },
    }
</script>

<style>
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
    .content-table{
        margin-left: 450px;
    }
    .red-color{
        color: red;
    }
</style>
