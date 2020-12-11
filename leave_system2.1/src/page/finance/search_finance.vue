<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >财务处</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/finance/search_finance' }">财务处查询</el-breadcrumb-item>
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
                        :data="financeData"
                        border
                        highlight-current-row
                        style="width: 100%">

                    <el-table-column label="序号" type="index" width="60" sortable></el-table-column>
                    <el-table-column prop="stuNumber" label="学号" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="stuName"  label="学生姓名" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="stuDept" label="学生院系" min-width="120" sortable></el-table-column>
                    <el-table-column prop="stuType" label="学历" min-width="120" ></el-table-column>
                    <el-table-column prop="expense" label="应退款" min-width="120" sortable></el-table-column>

                    <el-table-column label="财务处状态" min-width="120"  style="position: center"
                                     :filters="[{ text: '已通过', value: '1' }, { text: '未通过', value: '0' }]"
                                     :filter-method="filterTag"
                                     filter-placement="bottom-end">
                        <template slot-scope="scope" >
                            <el-tag :type="scope.row.financeStatus === '1' ? 'success' : 'danger'" disable-transitions>
                                {{scope.row.financeStatus === "1" ?'已通过':'未通过'}}
                            </el-tag>

                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="200">
                        <template slot-scope="scope">
                            <div >
                                <el-button type="primary" size="mini" icon ="el-icon-edit" @click="financeReview(scope.row.stuNumber)" v-if="scope.row.financeStatus==='0'">审核</el-button>
                                <el-button type="success" size="mini" icon ="el-icon-edit" @click="getInfo(scope.row.stuNumber),dialogVisible = true,dialogTitle='用户详情'" >详情</el-button>
<!--                                v-if="scope.row.financeStatus==='1'"-->
                                <!--                                <el-button type="text" size="small" @click="getInfo(scope.row.clerkID),dialogVisible = true,dialogTitle='修改用户'">详情</el-button>-->
                            </div>
                        </template>

                    </el-table-column>
                </el-table>
                    <el-dialog

                            :visible.sync="dialogVisible"
                            @close="onDialogClose()">
                        <template slot="title">
                            <div class='titleSize'>用户详情</div>
                        </template>
                        <el-form ref="financeData"  :model="financeData" label-width="80px" class="f2">
                        <el-form-item label="学号:" prop="stuNumber" >
                            <span>{{financeData.stuNumber}}</span>
<!--                            <el-input v-model="financeData.stuNumber" placeholder="学号"></el-input>-->
                        </el-form-item>
                            <el-divider></el-divider>
                            <el-form-item label="姓名:" prop="stuName">
                                <span>{{financeData.stuName}}</span>
                            </el-form-item>
                            <el-divider></el-divider>
                            <el-form-item label="院系:" prop="stuDept">
                                <span>{{financeData.stuDept}}</span>
                            </el-form-item>
                            <el-divider></el-divider>
                            <el-form-item label="学历:" prop="stuType">
                                <span>{{financeData.stuType}}</span>
                            </el-form-item>
                            <el-divider></el-divider>
                            <el-form-item label="应退款:" prop="expense" >
                                <span>{{financeData.expense}}</span>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">关闭</el-button>
<!--                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
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
<!--                <div>-->
<!--&lt;!&ndash;                    <el-button type="text" size="small" @click="exportExcel()">导出</el-button>&ndash;&gt;-->
<!--                </div>-->
            </div>

        </el-card>
        <ImportAndExport :exportExceltype="excelobj"></ImportAndExport>
    </div>
</template>

<script>
    import ImportAndExport from '@/components/common/ImportAndExport'
    import teacher from '@/api/edu/teacher'
    export default {
        components: { ImportAndExport },
        data() {
            return {
                search: {
                    stuNumber: '',

                },
                total: 0,//总记录数
                page: 1,//当前页
                limit: 5,//每页记录数
                dialogVisible: false,
                financeData: [],
                excelobj: 'finance',
                extp: this.exportExceltype,
            }
        },
        props: ["exportExceltype"],
        created() {
            // this.initList()
            this.getList()
        },
        methods: {
            //获取
            getList(page = 1) {

                this.page = page
                this.$axios.get('/sector/finance/findAllByPage?start=' + this.page + '&size=' + this.limit).then(res => {
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.total = res.data.data.total;
                    this.page = res.data.data.pages;
                    this.financeData = res.data.data.list;

                    console.log(this.total);

                }, function (err) {
                    console.log(err);
                })
            },
            getInfo(id) {
                teacher.getFinanceInfo(id)
                    .then(response => {
                        this.financeData = response.data[0]
                        console.log(this.financeData)
                    })
                // this.$axios.get('/sector/finance/'+id)
                //     .then(res=>{
                //         //得到一个PageInfo对象
                //         //将PageInfo中的total赋值给当前的total
                //         this.financeData = res.data.data
                //         console.log(this.financeData);
                // })
            },

            financeReview(id) {
                this.$confirm('是否通过审核', '提示', {
                    confirmButtonText: '确认审核',
                    cancelButtonText: '取消审核',
                    type: 'warning'
                }).then(() => {

                    this.$http.post('/sector/finance/' + id).then(res => {
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
                    this.getList();
                });
            },

            filterTag(value, row) {
                return row.financeStatus === value;
            },

            // cardExport() {
            //     this.$axios.get('/sector/finance/export').then(res=>{
            //         this.financeData = res.data
            //         console.log(this.financeData)
            //     });
            // },
            //搜索
            doSearch() {
                if (this.search.stuNumber != null) {
                    this.$axios.get('/sector/finance/' + this.search.stuNumber).then(response => {
                        this.financeData = response.data.data
                        console.log(this.financeData)
                    })
                    // teacher.doFinanceSearch(this.search.stuNumber).then(response => {
                    //     this.financeData = response.data
                    //     console.log(this.financeData)
                    // });
                } else {
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
            // eslint-disable-next-line no-unused-vars
            handleSizeChange(val) {
                this.limit = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.page = val;
                console.log(`当前页: ${val}`);
            },
            onDialogClose() {
                this.$refs.financeData.resetFields()
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
    .f2{
        font-size: 20px;
        text-align:center;
        font-weight:bold;

        border: 1px solid #dcdfe6 !important;
    }

    .search-bar{
        overflow: hidden;
    }
</style>

<style>
    .tools-bar{
        margin-bottom:20px;
    }
.titleSize{
    font-size: 30px;
    text-align:center;
}
</style>


