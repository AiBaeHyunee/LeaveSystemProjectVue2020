<template>
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/manage' }">管理员功能</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/manage/search_notice' }">公告管理</el-breadcrumb-item>
<!--                <el-breadcrumb-item :to="{ path: '/manager/user_manage/create_manager' }">编辑用户</el-breadcrumb-item>-->
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="search-bar" >
                <el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="search.Dept" placeholder="发布部门" class="handle-select mr10">
                    <el-option key="1" label="管理员" value="管理员"></el-option>
                    <el-option key="1" label="教务处" value="教务处"></el-option>
                    <el-option key="2" label="图书馆" value="图书馆"></el-option>
                    <el-option key="3" label="财务处" value="财务处"></el-option>
                    <el-option key="4" label="后勤部" value="后勤部"></el-option>
                    <el-option key="5" label="一卡通" value="一卡通"></el-option>
                </el-select>
<!--                <el-input v-model="query.content" placeholder="公告ID" class="handle-input mr10"></el-input>-->
                <el-button type="primary" icon="el-icon-search" @click="doTypeSearch">搜索</el-button>
                <el-button type="text" @click="handleReset">重置</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="noticeID" label="编号" width="200" align="center"></el-table-column>
                <el-table-column style="color: blue" prop="title" label="公告标题" align="center" width="200" :show-overflow-tooltip='true'></el-table-column>

                <el-table-column prop="noticeType" label="发布者" width="80" align="center"></el-table-column>
                <el-table-column prop="content" label="内容" align="center" width="150" :show-overflow-tooltip='true'></el-table-column>
                <el-table-column prop="checkStatus" label="状态" width="150" align="center">

                    <template slot-scope="scope">
<!--                        <el-tag :type="scope.row.checkStatus === '1' ? 'success' : 'danger'" disable-transitions>-->
<!--                            {{scope.row.checkStatus === "1" ?'已通过':'未通过'}}-->
<!--                        </el-tag>-->
                        <el-tag :type="(scope.row.checkStatus == '1' ? '' : (scope.row.checkStatus == '1' ? 'success' : (scope.row.checkStatus == '2' ? 'danger' : (scope.row.checkStatus == '0' ? 'warning' : 'danger'))))" size="mini">
                            {{ scope.row.checkStatus == '3' ? '草稿' : (scope.row.checkStatus == '1' ? '审核通过' : (scope.row.checkStatus == '2' ? '审核未通过' : (scope.row.checkStatus == '0' ? '待审核' : '待审核'))) }}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="publishTime" label="发布时间" align="center"></el-table-column>
                <el-table-column label="操作" width="430" >
                    <template slot-scope="scope">
                        <el-button
                                type="primary" size="mini"
                                icon="el-icon-edit"
                                @click="getInfo(scope.row.noticeID),dialogVisible=true"
                        >编辑</el-button>

                        <el-button
                                type="danger" size="mini"
                                icon="el-icon-delete"
                                class="blue"
                                @click="removeDataById(scope.row.noticeID)"
                        >删除</el-button>
                        <el-button
                                type="primary" size="mini"
                                icon="el-icon-top"
                                class="blue"
                                v-if="scope.row.isTop==='0'"
                                @click="setTop(scope.row.noticeID)"
                        >置顶</el-button>
                        <el-button
                                type="primary" size="mini"
                                icon="el-icon-bottom"
                                class="blue"
                                v-if="scope.row.isTop==='1'"
                                @click="setUnTop(scope.row.noticeID)"
                        >取消置顶</el-button>
                        <el-button
                                type="success" size="mini"
                                icon="el-icon-s-check"
                                v-if="scope.row.checkStatus==='0'"
                                @click="noticeReviewpass(scope.row.noticeID)"
                        >审核</el-button>
                        <el-button
                                type="warning" size="mini"
                                icon="el-icon-close"
                                class="blue"
                                v-if="scope.row.checkStatus==='0'"
                                @click="noticeReviewreject(scope.row.noticeID)"
                        >拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" @close="onDialogClose()">
            <template slot-scope="scope">
            <el-form ref="tableData" :model="tableData" label-width="70px">
                <el-form-item label="标题" prop="title">
                <el-input v-model="tableData.title"></el-input>
            </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" rows="5" v-model="tableData.content"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="tableData.remark"></el-input>
                </el-form-item>
            </el-form>
<!--            <span slot="footer" class="dialog-footer">-->
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click="uploadnotice(scope.row.noticeID),dialogVisible = false">确 定</el-button>
<!--            </span>-->
            </template>
        </el-dialog>

    </div>

</template>

<script>
    import teacher from "../../api/edu/teacher";

    export default {
        name: 'basetable',
        data() {
            return {
                query: {
                    address: '',
                    content: '',
                    // pageIndex: 1,
                    // pageSize: 10
                },
                search:{
                    Dept: '',
                    // Status: '',
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                dialogVisible: false,
                pageTotal: 0,
                form: {},
                // idx: -1,
                // id: -1,
                total: 0,//总记录数
                page: 1,//当前页
                limit: 10,//每页记录数
            };
        },
        created() {
            this.getList();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getList(page = 1) {
                this.page = page
                this.$axios.get('/admin/notice/findAllNotice/' + this.page + '/' + this.limit).then(res => {
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.total = res.data.data.total;
                    this.tableData = res.data.data.list;
                    console.log(this.total);

                }, function (err) {
                    console.log(err);
                })
            },
            //修改公告

            //条件查询
            doTypeSearch(){
                if(this.search.Dept!=null){
                    this.$axios.get('/admin/notice/searchNotice/' +this.page+'/'+ this.limit+'?department='+this.search.Dept).then(res=>{
                        this.total = res.data.data.total;
                        // this.page = res.data.data.pages;
                        this.tableData = res.data.data.list;
                        if (this.tableData!=null){
                            this.$message({
                                type: 'success',
                                message:res.data.message
                            })}
                        else {this.$message({
                            type: 'error',
                            message:res.data.message
                        })}
                        console.log(res.data.message)
                        console.log(this.tableData)
                    })
                }else{
                    this.getList()
                }
            },
            getInfo(id) {
                teacher.getNotice(id)
                    .then(response => {
                        this.tableData = response.data[0]
                        console.log(this.tableData)
                    })},
            // 删除操作
            // eslint-disable-next-line no-unused-vars
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
            setTop(id){
                // if(this.tableData.noticeID!=null){
                    this.$axios.post('/admin/notice/setTop/'+id).then(res=>{
                        this.total = res.data.data.total;
                        // this.page = res.data.data.pages;
                        this.tableData = res.data.data.list;
                        if (this.tableData!=null){
                            this.$message({
                                type: 'success',
                                message:res.data.message
                            })}
                        else {this.$message({
                            type: 'error',
                            message:res.data.message
                        })}
                        console.log(res.data.message)
                        console.log(this.tableData)
                    })
                // }else{
                    this.getList()
                // }
            },
            //取消置顶
            setUnTop(id){
                // if(this.tableData.noticeID!=null){
                this.$axios.post('/admin/notice/setUnTop/'+id).then(res=>{
                    this.total = res.data.data.total;
                    // this.page = res.data.data.pages;
                    this.tableData = res.data.data.list;
                    if (this.tableData!=null){
                        this.$message({
                            type: 'success',
                            message:res.data.message
                        })}
                    else {this.$message({
                        type: 'error',
                        message:res.data.message
                    })}
                    console.log(res.data.message)
                    console.log(this.tableData)
                })
                // }else{
                this.getList()
                // }
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //重置
            handleReset() {
                this.search = {
                    Dept: ''
                }
                this.getList()
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 审核公告
            noticeReviewpass(id) {
                this.$confirm('审核成功后将消息展示到首页, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/admin/notice/checkNotice/'+id+'/1').then(res => {
                        console.log(res.data.data)
                        this.getList()
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
                })},
            noticeReviewreject(id) {
                this.$confirm('此操作将拒绝发布公告, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                this.$axios.post('/admin/notice/checkNotice/' + id + '/0').then(res => {
                    console.log(res.data.data)
                    this.getList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            })},
            // 分页导航
            handleSizeChange(val) {
                this.limit = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.page = val;
                console.log(`当前页: ${val}`);
            },
            onDialogClose() {
                this.$refs.notice.resetFields()
            },
        }
    };
</script>


<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
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
