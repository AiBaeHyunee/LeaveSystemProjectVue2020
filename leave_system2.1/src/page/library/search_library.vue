<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >图书馆</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/library/search_library' }">图书查询</el-breadcrumb-item>
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
                        :data="libData"
                        border
                        highlight-current-row
                        style="width: 100%">

                    <el-table-column label="序号" type="index" width="60" sortable></el-table-column>
                    <el-table-column prop="stuNumber" label="学号" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="stuName"  label="学生姓名" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="stuDept" label="学生院系" min-width="120" sortable></el-table-column>
                    <el-table-column prop="stuType" label="学历" min-width="120" ></el-table-column>
                    <el-table-column prop="allBook" label="已借书本" min-width="120" sortable></el-table-column>

                    <!--                    :type="scope.row.cardStatus === '1' ? 'danger' : 'success'"-->
                    <el-table-column label="状态" min-width="120"  style="position: center"
                                     :filters="[{ text: '已通过', value: '1' }, { text: '未通过', value: '0' }]"
                                     :filter-method="filterTag"
                                     filter-placement="bottom-end">
                        <template slot-scope="scope" >
                            <el-tag :type="scope.row.libStatus === '1' ? 'success' : 'danger'" disable-transitions>
                                {{scope.row.libStatus === "1" ?'已通过':'未通过'}}
                            </el-tag>

                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="200">
                        <template slot-scope="scope">
                            <div>
                                <el-button type="success" size="mini" icon ="el-icon-edit" @click="removeReview(scope.row.stuNumber)">详情</el-button>
<!--                                <el-button type="primary" size="mini" icon ="el-icon-edit" @click="cardReview(scope.row.stuNumber)" v-if="scope.row.libStatus==='0'">审核</el-button>-->
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
                limit:10,//每页记录数

                libData: [],
                excelobj: 'library',
                extp: this.exportExceltype,
            }
        },
        props: ["exportExceltype"],
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

            filterTag(value, row) {
                return row.libStatus === value;
            },
            //获取
            getList(page =1) {
                this.page = page
                this.$axios.get('/sector/library/findAllByPage?start=' +this.page+'&size=' + this.limit).then(res=>{
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.total = res.data.data.total;
                    this.libData = res.data.data.list;
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
            doSearch(){
                if(this.search.stuNumber!=null){
                    this.$axios.get('/sector/dorm/stuNumber/'+this.search.stuNumber).then(res=>{
                        this.libData = res.data.data
                        if (this.libData!=null){
                            this.$message({
                                type: 'success',
                                message:res.data.message
                            })}
                        else {this.$message({
                            type: 'error',
                            message:res.data.message
                        })}
                        console.log(res.data.message)
                        console.log(this.libData)
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
                window.sessionStorage.setItem("libstuNumber",id);
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
    .tools-bar{
        margin-bottom:20px;
    }
</style>



