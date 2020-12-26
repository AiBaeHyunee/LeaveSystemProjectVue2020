<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-card class="box-card">
            <div class="search-bar">
                <el-form :inline="true" class="fl">
                    <el-input style="display: none;"></el-input>
                    <el-form-item label="操作时间">
                        <el-input v-model="search.logDate" placeholder="请输入时间" ></el-input>
                    </el-form-item>

                    <el-form-item label="日志等级："></el-form-item>
                    <el-select v-model="search.logClass" filterable clearable placeholder="请输入日志等级">
                        <el-option
                                v-for="item in logOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-form-item label="操作日志">
                        <el-input v-model="search.option" placeholder="请输入操作日志" ></el-input>
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
                    <el-table-column prop="logDate" label="操作时间" min-width="120"  sortable></el-table-column>
                    <el-table-column label="日志等级" min-width="120"  style="position: center"
                                     :filters="[{ text: 'info', value: 'INFO' }, { text: 'debug', value: 'DEBUG' }]"
                                     :filter-method="filterTag"
                                     filter-placement="bottom-end">
                        <template slot-scope="scope" >
                            <el-tag :type="scope.row.logClass === 'DEBUG' ? 'danger' : 'success'" disable-transitions>
                                {{scope.row.logClass === 'DEBUG' ?'debug':'info'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="option" label="操作日志" min-width="120" sortable></el-table-column>

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
<!--        <ImportAndExport :exportExceltype="excelobj"></ImportAndExport>-->

    </div>
</template>

<script>
    // import ImportAndExport from '@/components/common/ImportAndExport'
    import teacher from "../api/edu/teacher";

    export default {
        // components: { ImportAndExport },
        data() {
            return {
                logOptions:[
                    {value: 'info', label: 'info'},
                    {value: 'debug', label: 'debug'},
                    {value: 'error', label: 'error'},
                ],
                search:{
                    logDate:'',
                    logClass:'',
                    option:'',
                    pageSize:10,
                    startPage:1
                },
                total: 0,//总记录数
                page:1,//当前页
                limit:10,//每页记录数

                libData: [],
                excelobj: 'library',
                extp: this.exportExceltype,
                logForm:{
                    pageSize:10,
                    startPage:1,
                    logClass:'info',
                },
            }
        },
        props: ["exportExceltype"],
        created() {
            // this.initList()
            this.getList()
        },
        methods: {
            filterTag(value, row) {
                return row.logClass === value;
            },
            //获取
            getList(page =1) {
                this.page = page
                teacher.searchLog(this.logForm).then(response =>{//请求成功
                    //response接口返回的数据
                    this.libData = response.data
                    this.total = response.data.length
                    console.log(this.libData)
                    console.log(this.total)
                }, function(err) {
                    console.log(err);
                })
            },

            //搜索
            doSearch(){
                teacher.searchLog(this.search).then(response =>{//请求成功
                    //response接口返回的数据
                    this.libData = response.data
                    this.total = response.data.length
                    console.log(this.libData)
                    console.log(this.total)
                }, function(err) {
                    console.log(err);
                })
            },
            //重置
            handleReset() {
                this.search = {
                    logDate:'',
                    logClass:'',
                    option:'',
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

            removeReview(id){
                window.sessionStorage.setItem("libstuNumber",id);
                this.$router.push('/sector/library/review_library')
            }

        }

    }
</script>

<style scoped>
h1{
    text-align: center;
    margin: 30px 0;
}
p{
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout{
    color: #409EFF;
}
</style>
