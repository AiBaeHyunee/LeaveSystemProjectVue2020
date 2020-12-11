<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >图书馆</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/library/review_library' }">图书审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-card class="box-card">
            <el-row style="font-size: 20px">图书归还详情</el-row>

            <div class="search-bar">
                <el-form :inline="true" class="fl">
                    <el-form-item label="学生学号:">
                        {{stuInfo.stuNumber}}
                    </el-form-item>
                    <el-form-item label="学生姓名:">
                        {{stuInfo.stuName}}
                    </el-form-item>
                </el-form>
            </div>

            <div>
                <el-table
                        ref="singleTable"
                        :data="booksData"
                        border
                        highlight-current-row
                        style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" type="index" width="60" sortable></el-table-column>
                    <el-table-column prop="bookID" label="书籍ID" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="bookNum" label="书籍编号" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="bookName"  label="书籍名" min-width="120"  sortable></el-table-column>

                    <!--                    :type="scope.row.cardStatus === '1' ? 'danger' : 'success'"-->
                    <el-table-column label="状态" min-width="120"  style="position: center"
                                     :filters="[{ text: '已归还', value: '1' }, { text: '未归还', value: '0' }]"
                                     :filter-method="filterTag"
                                     filter-placement="bottom-end">
                        <template slot-scope="scope" >
                            <el-tag :type="scope.row.returnStatus === '1' ? 'success' : 'danger'" disable-transitions>
                                {{scope.row.returnStatus === "1" ?'已归还':'未归还'}}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="200" >
                        <template slot-scope="scope">
                            <div>
                                <el-tag type="success" min-width="120" disable-transitions v-if="scope.row.returnStatus==='1'">已审核</el-tag>
                                <el-button type="primary" size="mini" icon ="el-icon-edit" @click="bookReview(stuInfo.stuNumber,scope.row.bookID)" v-if="scope.row.returnStatus==='0'">审核</el-button>
                            </div>
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
                <div>
                    <el-link href="/sector/dorm/export" target="_blank" type="primary">导出</el-link>
                </div>
            </div>

        </el-card>

    </div>
</template>
<script>
    export default {
        data(){
            return{
                booksData: [],
                stuInfo:{},
            }
        },
        created() {
            this.searchBooks()
        },
        methods:{
            searchBooks(){
                this.$axios.get('/sector/library/getStuBookDetail/' + window.sessionStorage.getItem("libstuNumber")).then(res => {
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.booksData = res.data.data.list;
                    this.stuInfo = res.data.data.stuInfo;
                    console.log(this.stuInfo);
                    console.log(this.booksData);

                }, function (err) {
                    console.log(err);
                })
            },
            bookReview(stuNumber,bookID){
                this.$confirm('是否通过审核', '提示', {
                    confirmButtonText: '确认审核',
                    cancelButtonText: '取消审核',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/sector/library/checkLibrary/' + stuNumber + '/' + bookID).then(res => {
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
                    this.searchBooks()
                });
            },
            filterTag(value, row) {
                return row.returnStatus === value;
            },
        },
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
</style>

