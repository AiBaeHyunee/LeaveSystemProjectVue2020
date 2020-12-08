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
                        v-loading.body="tableLoading"
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

                    <el-table-column label="财务处状态" min-width="120" sortable style="position: center"
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
                            <div>
                                <el-button type="primary" size="mini" icon ="el-icon-edit" @click="financeReview(scope.row.stuNumber)" v-if="scope.row.financeStatus==='0'">审核</el-button>
                                <el-button type="danger" size="mini" icon ="el-icon-delete" @click="removeReview(scope.row.stuNumber)" v-if="scope.row.financeStatus==='1'">详情</el-button>
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
<!--                    <el-button type="text" size="small" @click="cardExport">导出</el-button>-->
                </div>
            </div>

        </el-card>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                search:{
                    stuNumber:'',
                },
                total: 0,//总记录数
                page:1,//当前页
                limit:5,//每页记录数

                financeData: [],
            }
        },
        created() {
            // this.initList()
            this.getList()
        },
        methods: {
            //获取
            getList(page =1) {
                this.page = page
                this.$axios.get('/sector/finance/findAllByPage?start=' +this.page+'&size=' + this.limit).then(res=>{
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.total = res.data.data.total;
                    this.page = res.data.data.pages;
                    this.financeData = res.data.data.list;

                    console(this.page);
                    console(this.total);

                }, function(err) {
                    console.log(err);
                })
            },

            filterTag(value, row) {
                return row.cardStatus === value;
            },

            // cardExport() {
            //     this.$axios.get('/sector/finance/export').then(res=>{
            //         this.financeData = res.data
            //         console.log(this.financeData)
            //     });
            // },
            //搜索
            doSearch(){
                if(this.search.stuNumber!=null){
                    this.$axios.get('/sector/finance/'+this.search.stuNumber).then(response=>{
                        this.financeData = response.data.data
                        console.log(this.financeData)
                    })
                    // teacher.doFinanceSearch(this.search.stuNumber).then(response => {
                    //     this.financeData = response.data
                    //     console.log(this.financeData)
                    // });
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
            // eslint-disable-next-line no-unused-vars
            handleSizeChange(val) {
                this.limit = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.page = val;
                console.log(`当前页: ${val}`);
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
</style>


