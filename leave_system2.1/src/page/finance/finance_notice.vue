<template>

    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >财务处</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/finance/finance_notice' }">公告详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-card class="box-card">
            <el-row style="font-size: 20px">公告详情</el-row>

<!--            <div class="search-bar">-->
<!--                <el-form :inline="true" class="fl">-->
<!--                    <el-form-item label="公告标题:">-->
<!--                        {{booksData.title}}-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="公告内容:">-->
<!--                        <div class="ql-editor content-detail" v-html="booksData.content"/>-->

<!--                    </el-form-item>-->

<!--                </el-form>-->
<!--            </div>-->
            <el-form ref="booksData" :model="booksData" label-width="80px">
                <el-form-item label="公告标题">
                    <el-input v-model="booksData.title"></el-input>
                </el-form-item>


                <!--                    <el-form-item label="公告内容">-->
                <!--                        <el-input type="textarea" rows="5" v-model="form.content"></el-input>-->
                <!--                    </el-form-item>-->
                <!--                        <span style="font-size: 15px;margin: 10px;color: rgba(23,31,41,0.5)">正文内容</span>-->
                <el-form-item label="正文内容">
                    <!--                            <el-input v-model="form.title"></el-input>-->
                    <div class="mavonEditor">
                        <no-ssr>
                            <mavon-editor :toolbars="markdownOption" v-model="booksData.content"/>
                        </no-ssr>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="uploadnotice()">重新提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>

<!--            <div>-->
<!--                <el-table-->
<!--                        ref="singleTable"-->
<!--                        :data="booksData"-->
<!--                        border-->
<!--                        highlight-current-row-->
<!--                        style="width: 100%">-->
<!--                    <el-table-column type="selection" width="55"></el-table-column>-->
<!--                    <el-table-column label="序号" type="index" width="60" sortable></el-table-column>-->
<!--                    <el-table-column prop="bookID" label="书籍ID" min-width="120"  sortable></el-table-column>-->
<!--                    <el-table-column prop="bookNum" label="书籍编号" min-width="120"  sortable></el-table-column>-->
<!--                    <el-table-column prop="bookName"  label="书籍名" min-width="120"  sortable></el-table-column>-->

<!--                    &lt;!&ndash;                    :type="scope.row.cardStatus === '1' ? 'danger' : 'success'"&ndash;&gt;-->
<!--                    <el-table-column label="状态" min-width="120"  style="position: center"-->
<!--                                     :filters="[{ text: '已归还', value: '1' }, { text: '未归还', value: '0' }]"-->
<!--                                     :filter-method="filterTag"-->
<!--                                     filter-placement="bottom-end">-->
<!--                        <template slot-scope="scope" >-->
<!--                            <el-tag :type="scope.row.returnStatus === '1' ? 'success' : 'danger'" disable-transitions>-->
<!--                                {{scope.row.returnStatus === "1" ?'已归还':'未归还'}}-->
<!--                            </el-tag>-->
<!--                        </template>-->
<!--                    </el-table-column>-->

<!--                    <el-table-column label="操作" fixed="right" width="200" >-->
<!--                        <template slot-scope="scope">-->
<!--                            <div>-->
<!--                                <el-tag type="success" min-width="120" disable-transitions v-if="scope.row.returnStatus==='1'">已审核</el-tag>-->
<!--                                <el-button type="primary" size="mini" icon ="el-icon-edit" @click="bookReview(stuInfo.stuNumber,scope.row.bookID)" v-if="scope.row.returnStatus==='0'">审核</el-button>-->
<!--                            </div>-->
<!--                        </template>-->
<!--                    </el-table-column>-->

<!--                </el-table>-->
<!--                <div class="pagination-bar">-->
<!--                    <el-pagination-->
<!--                            @size-change="handleSizeChange"-->
<!--                            :page-sizes="[5, 10, 15, 20]"-->
<!--                            @current-change="getList"-->
<!--                            :current-page="page"-->
<!--                            :page-size="limit"-->
<!--                            layout="total, sizes, prev, pager, next, jumper"-->
<!--                            :total="total">-->
<!--                    </el-pagination>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <el-link href="/sector/dorm/export" target="_blank" type="primary">导出</el-link>-->
<!--                </div>-->
<!--            </div>-->

<!--        </el-card>-->

        </el-card>
    </div>
</template>
<script>
    import teacher from "../../api/edu/teacher";

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
                this.$axios.get('/sector/notice/viewNoticeDetails/' + window.sessionStorage.getItem("noticeID")).then(res => {
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.booksData = res.data.data[0]
                    this.title = res.data.data[0].title;
                    this.content = res.data.data[0].content;
                    console.log(this.title);
                    console.log(this.content);

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
            uploadnotice(){
                console.log(this.booksData)
                teacher.addNotice(this.booksData)
                    .then(response => {//添加成功
                        //提示信息
                        this.$message.success('提交成功！');
                        console.log(response);
                    })
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

