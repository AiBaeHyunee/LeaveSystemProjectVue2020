<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >教务处</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/office/search_progress' }">教务处查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-card class="box-card">
            <div class="search-bar">
                <el-form :inline="true" class="fl">
                    <el-input style="display: none;"></el-input>
                    <el-form-item label="学生学号">
                        <el-input v-model="search.stuNumber" placeholder="请输入学号" ></el-input>
                    </el-form-item>
                </el-form>
                <div class="fl">
                    <el-button type="text" @click="handleReset">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
                </div>
            </div>

            <div>
                <el-table
                        ref="singleTable"
                        :data="eduData"
                        border
                        highlight-current-row
                        style="width: 100%">

                    <el-table-column label="序号" type="index" width="60" sortable></el-table-column>
                    <el-table-column prop="stuNumber" label="学号" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="stuName"  label="学生姓名" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="stuDept" label="学生院系" min-width="120" sortable></el-table-column>
                    <el-table-column prop="stuType" label="学历" min-width="120" ></el-table-column>

                    <el-table-column label="状态" min-width="120"  style="position: center"
                                     :filters="[{ text: '已通过', value: '1' }, { text: '未通过', value: '0' }]"
                                     :filter-method="filterTag"
                                     filter-placement="bottom-end">
                        <template slot-scope="scope" >
                            <el-tag :type="scope.row.eduStatus === '1' ? 'success' : 'danger'" disable-transitions>
                                {{scope.row.eduStatus === "1" ?'已通过':'未通过'}}
                            </el-tag>

                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" min-width="170">
                        <template slot-scope="scope">
                            <div>
                                <el-button type="success" size="mini" icon ="el-icon-edit" @click="cardReview(scope.row.stuNumber)">查看详情</el-button>
                                <el-button type="danger" size="mini" icon ="el-icon-edit" @click="getInfo(scope.row.stuNumber),dialogVisible = true" v-if="scope.row.msgStatus==='0'">新申请</el-button>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>
                <el-dialog
                        :visible.sync="dialogVisible"
                        @close="onDialogClose()">
                    <template slot="title">
                        <div class='titleSize'>新申请</div>
                    </template>
                    <el-form ref="stuData"  :model="stuData" label-width="80px" class="f3">
                    <span>
                        <el-col :span="18">
                        <el-form-item label="学号:" prop="stuNumber" >{{stuData.stuNumber}}
                            </el-form-item>
                            </el-col>
                            <el-form-item label="姓名:" prop="stuName" >{{stuData.stuName}}
                        </el-form-item>
                    </span>
                    </el-form>
                    <el-form ref="eduData"  :model="eduData" label-width="120px" class="f2">

                        <el-form-item label="标题:" prop="title" >
                            <span>{{eduData.title}}</span>
                        </el-form-item>
                        <el-divider></el-divider>

                        <el-form-item label="提交时间:" prop="messagedate" >
                            <span>{{eduData.messagedate}}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="内容:" prop="content" >
                            <span>{{eduData.content}}</span>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">关闭</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </div>

                </el-dialog>
                <div class="pagination-bar">
                    <el-pagination
                            @size-change="handleSizeChange"
                            :page-sizes="[5, 10, 15, 20]"
                            @current-change="getList"
                            :current-page="page"
                            :page-size="limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>

            </div>
        </el-card>
        <ImportAndExport :exportExceltype="excelobj"></ImportAndExport>

    </div>
</template>

<script>
    import ImportAndExport from '@/components/common/ImportAndExport'
    export default {
        components: { ImportAndExport },
        data() {
            return {
                search:{
                    stuNumber:'',
                },
                total: 0,//总记录数
                page:1,//当前页
                limit:15,//每页记录数

                dialogVisible:false,
                stuData:[],
                eduData: [],
                excelobj: 'office',
                extp: this.exportExceltype,
            }
        },
        props: ["exportExceltype"],
        created() {
            // this.initList()
            this.getList()
        },
        methods: {
            //获取新消息
            getInfo(id) {
                this.$axios.get('/sector/edu/studentId/'+id).then(res=> {
                    this.stuData = res.data.data[0]

                }),
                    this.$axios.get('/sector/edu/message/'+id).then(res=> {
                        this.eduData = res.data.data[0]
                        console.log(this.eduData)
                        console.log(this.eduData.content)
                        this.$message({
                            type:"success",
                            message:res.data.message
                        })
                    })},

            cardReview(id) {
                window.sessionStorage.setItem("edustuNumber",id);
                this.$router.push('/sector/office/review_progress')
            },

            filterTag(value, row) {
                return row.eduStatus === value;
            },
            //获取
            getList(page =1) {
                this.page = page
                this.$axios.get('/sector/edu/findAllByPage?start=' +this.page+'&size=' + this.limit).then(res=>{
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.total = res.data.data.total;
                    this.eduData = res.data.data.list;
                    console.log(this.total);

                }, function(err) {
                    console.log(err);
                })
            },

            //搜索
            doSearch(){
                if(this.search.stuNumber!=null){
                    this.$axios.get('/sector/edu/studentId/'+this.search.stuNumber).then(res=>{
                        this.eduData = res.data.data
                        console.log(this.eduData)
                    })
                }else{
                    this.getList()
                }
            },
            //重置
            handleReset() {
                this.search = {
                    stuNumber: ''
                }
                this.getList()
            },
            handleSizeChange(val) {
                this.limit = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.page = val;
                console.log(`当前页: ${val}`);
            },

            onDialogClose() {
                this.$refs.eduData.resetFields()
            },

        }

    }
</script>

<style lang="scss">
    .fr{
        float:right;
    }
    .fl{
        float:left;
    }
    .search-bar{
        overflow: hidden;
    }
    .f2{
        text-align:center;
        font-weight:bold;

        border: 1px solid #dcdfe6 !important;
    }
    .f2 .el-form-item__label {
        font-size: 21px;
    }
    .tools-bar{
        margin-bottom:20px;
    }
    .titleSize{
        font-size: 30px;
        text-align:center;
    }

</style>


