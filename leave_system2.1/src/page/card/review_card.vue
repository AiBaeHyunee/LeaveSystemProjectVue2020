<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >一卡通</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/finance/review_finance' }">搜索公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-card class="box-card">
            <div class="search-bar">
                <el-form :inline="true" class="fl">
                    <el-input style="display: none;"></el-input>
                    <el-form-item label="公告标题">
                        <el-input v-model="search.noticeID" placeholder="请输入公告标题" ></el-input>
                    </el-form-item>
                </el-form>
                <div class="fl">
                    <el-button type="text" @click="handleReset">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="doSearch(search.noticeID)">查询</el-button>
                </div>
            </div>

            <div>
                <el-table
                        ref="singleTable"
                        :data="cardData"
                        border
                        highlight-current-row
                        style="width: 100%">

                    <el-table-column type="selection"  align="center"></el-table-column>
                    <el-table-column prop="noticeID" label="编号"  align="center"></el-table-column>
                    <el-table-column style="color: blue" prop="title" label="公告标题" align="center" :show-overflow-tooltip='true'></el-table-column>

                    <el-table-column prop="noticeType" label="发布者"  align="center"></el-table-column>
                    <el-table-column prop="content" label="内容" align="center"  :show-overflow-tooltip='true'></el-table-column>
                    <el-table-column prop="checkStatus" label="状态"  align="center">
                        <template slot-scope="scope">
                            <!--                        <el-tag :type="scope.row.checkStatus === '1' ? 'success' : 'danger'" disable-transitions>-->
                            <!--                            {{scope.row.checkStatus === "1" ?'已通过':'未通过'}}-->
                            <!--                        </el-tag>-->
                            <el-tag :type="(scope.row.checkStatus == '1' ? '' : (scope.row.checkStatus == '1' ? 'success' : (scope.row.checkStatus == '2' ? 'danger' : (scope.row.checkStatus == '0' ? 'warning' : 'danger'))))" size="mini">
                                {{ scope.row.checkStatus == '3' ? '草稿' : (scope.row.checkStatus == '1' ? '审核通过' : (scope.row.checkStatus == '2' ? '审核未通过' : (scope.row.checkStatus == '0' ? '待审核' : '待审核'))) }}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="200">
                        <template slot-scope="scope">
                            <div>
                                <el-button type="success" size="mini" icon ="el-icon-edit" @click="getInfo(scope.row.noticeID),dialogVisible=true">编辑</el-button>
                                <!--                                <el-button type="primary" size="mini" icon ="el-icon-edit" @click="cardReview(scope.row.noticeID)" v-if="scope.row.checkStatus==='0'">审核</el-button>-->
                                <el-button
                                        type="danger" size="mini"
                                        icon="el-icon-delete"
                                        class="blue"
                                        @click="removeDataById(scope.row.noticeID)"
                                >删除</el-button>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>
                <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" @close="onDialogClose()">
                    <!--                    <template slot-scope="scope">-->
                    <el-form ref="form" :model="form" label-width="70px">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="content">
                            <el-input type="textarea" rows="5" v-model="form.content"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">关 闭</el-button>
                        <el-button type="primary" @click="uploadnotice(),dialogVisible = false">确 定</el-button>
                                    </span>
                    <!--                    </template>-->
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
<!--        <ImportAndExport :exportExceltype="excelobj"></ImportAndExport>-->

    </div>
</template>

<script>
    // import ImportAndExport from '@/components/common/ImportAndExport'
    import teacher from "../../api/edu/teacher";
    export default {
        // components: { ImportAndExport },
        data() {
            return {
                search:{
                    noticeID:'',
                },
                total: 0,//总记录数
                page:1,//当前页
                limit:10,//每页记录数
                dialogVisible:false,
                cardData: [],
                form:{},
                // excelobj: 'library',
                // extp: this.exportExceltype,
            }
        },
        // props: ["exportExceltype"],
        created() {
            // this.initList()
            this.getList()
        },
        methods: {
            cardReview() {
                this.$confirm('是否通过审核', '提示', {
                    confirmButtonText: '确认审核',
                    cancelButtonText: '拒绝审核',
                    type: 'warning'
                }).then(() => {
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
            },
            removeDataById(id) {
                // debugger
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { // promise
                    // 点击确定，远程调用ajax
                    return teacher.removeById(id)
                }).then(response => {
                    this.getList()
                    console.log(response.data.message)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
            },
            getInfo(id) {
                teacher.getNotice(id)
                    .then(response => {
                        this.form = response.data[0]
                        console.log(this.form)
                    })},

            filterTag(value, row) {
                return row.libStatus === value;
            },
            uploadnotice(){
                console.log(this.form)
                teacher.addNotice(this.form)
                    .then(response => {//添加成功
                        //提示信息
                        this.$message.success('提交成功！');
                        console.log(response);
                    })
            },
            //获取
            getList(page =1) {
                this.page = page
                this.$axios.get('/sector/notice/findSelfNotice/' +this.page+'/' + this.limit).then(res=>{
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.total = res.data.data.total;
                    this.cardData = res.data.data.list;
                    console.log(this.total);

                }, function(err) {
                    console.log(err);
                })
            },


            // cardExport() {
            //     this.$axios.get('/sector/card/export').then(res=>{
            //         // this.cardData = res.data
            //         console.log(res.data)
            //     });
            // },
            //搜索
            doSearch(title){
                this.$axios.get('/sector/notice/searchNoticeByTitle/' +this.page+'/' + this.limit+'?title='+title).then(res=>{
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.total = res.data.data.total;
                    this.code = res.data.code;
                    this.cardData = res.data.data.list;
                    console.log(this.total);
                    console.log(this.code)
                    if (res.data.code===20000){
                        this.$message({
                            type: 'success',
                            message:res.data.message
                        })}
                    else {this.$message({
                        type: 'error',
                        message:res.data.message
                    })}

                },)
            },
            //重置
            handleReset() {
                this.search = {
                    noticeID: ''
                }
                this.getList()
            },

            // logisticsReview(id){
            //     this.$axios.put('/sector/logistics/checklogistics/'+id).then(res=>{
            //         console.log(res.data)
            //         this.getList()
            //     })
            // },
            handleSizeChange(val) {
                this.limit = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.page = val;
                console.log(`当前页: ${val}`);
            },

            removeReview(id){
                window.sessionStorage.setItem("libnoticeID",id);
                this.$router.push('/sector/library/review_library')
            }

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
</style>

<style>
    .tools-bar{
        margin-bottom:20px;
    }
    .el-tooltip__popper{
        max-width:20%;
    }
    .el-tooltip__popper,.el-tooltip__popper.is-dark{
        background: rgba(28, 30, 7, 0.82) !important;
        color: #fff !important;
        line-height: 24px;
    }
</style>


