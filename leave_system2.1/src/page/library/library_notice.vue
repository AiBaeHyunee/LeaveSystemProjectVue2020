<template>

    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >图书馆</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/library/library_notice' }">公告详情</el-breadcrumb-item>
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

