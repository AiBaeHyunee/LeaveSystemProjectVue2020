<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >图书馆</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/library/search_library' }">图书查询</el-breadcrumb-item>
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
                                <el-tag type="success" min-width="120" disable-transitions v-if="scope.row.returnStatus==='1'">已检书</el-tag>
                                <el-button type="primary" size="mini" icon ="el-icon-edit" @click="bookDetail(scope.row.bookID),dialogVisible=true" v-if="scope.row.returnStatus==='0'">检书</el-button>
                            </div>
                        </template>
                    </el-table-column>

                </el-table>

                <el-dialog title="检书信息" :visible.sync="dialogVisible" @close="onDialogClose()">
                    <el-form ref="bookDetailForm" :model="bookDetailForm" label-width="80px">
                        <el-form-item label="书籍号" prop="bookNum">
                            <span>{{bookDetailForm.bookNum}}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="书籍名:" prop="bookName">
                            <span>{{bookDetailForm.bookName}}</span>
                        </el-form-item>
                        <el-form-item label="价格:" prop="price">
                            <span>{{bookDetailForm.price}}</span>
                        </el-form-item>
                        <el-form-item label="书籍状态:" prop="returnStatus">
                            <span>{{bookDetailForm.returnStatus}}</span>
                        </el-form-item>
                        <el-form-item label="是否破损" prop="bookValue">
                            <el-select v-model="dataPosunForm.bookValue" placeholder="请选择破损程度" style="width: 100%;" >
                                <el-option
                                        v-for="item in bookFailForm"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="bookReview(bookDetailForm.stuNumber,bookDetailForm.bookID,dataPosunForm.bookValue)">确定</el-button>
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

    </div>
</template>
<script>
    export default {
        data(){
            return{
                bookDetailForm:[],
                dataPosunForm:{},
                booksData: [],
                stuInfo:{},
                dialogVisible:false,
                bookFailForm: [
                    {value: '未破损', label: '未破损'},
                    {value: '一般破损', label: '一般破损'},
                    {value: '严重损坏', label: '严重损坏'},
                    {value: '图书丢失', label: '图书丢失'},
                 ],
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
            //查看图书详情
            bookDetail(bookID){
                this.$axios.get('/sector/library/detailBook?bookId=' + bookID).then(res => {
                    this.bookDetailForm = res.data.data[0];
                    console.log(this.bookDetailForm);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '读取详情失败'
                    });
                });
            },
            bookReview(stuNumber,bookID,bookValue){
                    this.$axios.post('/sector/library/checkLibrary/'+ stuNumber + '/' + bookID +'?degree=' + bookValue ).then(res => {
                        console.log(res.data);
                        this.$message({
                            type: 'success',
                            message: '检书成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消检书'
                        });
                    });
                this.dialogVisible=false
                this.searchBooks()
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

