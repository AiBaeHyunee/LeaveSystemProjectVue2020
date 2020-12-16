<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >一卡通</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/card/search_card' }">一卡通查询</el-breadcrumb-item>
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
            <div class="search-bar" >
                <el-form :inline="true" class="fl">
                    <el-input style="display: none;"></el-input>
                    <el-form-item label="学院："></el-form-item>
                    <el-select v-model="search.Dept" filterable clearable placeholder="请选择学院">
                        <el-option
                                v-for="item in Deptoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-form-item label="学历："></el-form-item>
                    <el-select v-model="search.Type" filterable clearable placeholder="请选择学历">
                        <el-option
                                v-for="item in Typeoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-form-item label="状态："></el-form-item>
                    <el-select v-model="search.Status" filterable clearable placeholder="请选择状态">
                        <el-option
                                v-for="item in Statusoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form>
                <div class="f1">
                    <el-button type="text" @click="handleReset">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="doTypeSearch">查询</el-button>
                </div>
            </div>

            <div>
                <el-table
                        ref="singleTable"
                        :data="cardData"
                        border
                        highlight-current-row
                        style="width: 100%">

                    <el-table-column label="序号" type="index" width="60" sortable></el-table-column>
                    <el-table-column prop="stuNumber" label="学号" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="stuName"  label="学生姓名" min-width="120"  sortable></el-table-column>
                    <el-table-column prop="stuDept" label="学生院系" min-width="120" sortable></el-table-column>
                    <el-table-column prop="stuType" label="学历" min-width="120" ></el-table-column>
                    <el-table-column prop="cardBalance" label="一卡通余额" min-width="120" sortable></el-table-column>

<!--                    :type="scope.row.cardStatus === '1' ? 'danger' : 'success'"-->
                    <el-table-column label="一卡通状态" min-width="120"  style="position: center"
                                     :filters="[{ text: '已通过', value: '1' }, { text: '未通过', value: '0' }]"
                                     :filter-method="filterTag"
                                     filter-placement="bottom-end">
                        <template slot-scope="scope" >
                            <el-tag :type="scope.row.cardStatus === '1' ? 'success' : 'danger'" disable-transitions>
                                {{scope.row.cardStatus === "1" ?'已通过':'未通过'}}
                            </el-tag>

                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="200">
                        <template slot-scope="scope">
                            <div>
                                <el-button type="primary" size="mini" icon ="el-icon-edit" @click="cardReview(scope.row.stuNumber)" v-if="scope.row.cardStatus==='0'">审核</el-button>
                                <el-button type="success" size="mini" icon ="el-icon-edit" @click="getInfo(scope.row.stuNumber),dialogVisible = true,dialogTitle='用户详情'" v-if="scope.row.cardStatus==='1'">详情</el-button>
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
                    <el-form ref="cardData"  :model="cardData" label-width="80px" class="f2">
                        <el-form-item label="学号:" prop="stuNumber" >
                            <span>{{cardData.stuNumber}}</span>
                            <!--                            <el-input v-model="financeData.stuNumber" placeholder="学号"></el-input>-->
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="姓名:" prop="stuName">
                            <span>{{cardData.stuName}}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="院系:" prop="stuDept">
                            <span>{{cardData.stuDept}}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="学历:" prop="stuType">
                            <span>{{cardData.stuType}}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="余额:" prop="expense" >
                            <span>{{cardData.cardBalance}}</span>
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
                Deptoptions: [
                    {value: '商学院', label: '商学院'},
                    {value: '计算机科学学院', label: '计算机科学学院'},
                ],
                Typeoptions: [
                    {value: '本科生', label: '本科生'},
                    {value: '研究生', label: '研究生'},
                ],
                Statusoptions: [
                    {value: '1', label: '已审核'},
                    {value: '0', label: '未审核'},
                ],
                search:{
                    stuNumber:'',
                    Type: '',
                    Dept: '',
                    Status: '',
                },
                total: 0,//总记录数
                page:1,//当前页
                limit:10,//每页记录数
                dialogVisible:false,
                cardData: [],
                excelobj: 'card',
                extp: this.exportExceltype,
            }
        },
        props: ["exportExceltype"],
        created() {
            // this.initList()
            this.getList()
        },
        methods: {
            cardReview(id) {
                    this.$confirm('是否通过审核', '提示', {
                            confirmButtonText: '确认审核',
                            cancelButtonText: '取消审核',
                            type: 'warning'
                        }).then(() => {
                        this.$axios.post('/sector/card/checkCard/'+id).then(res=>{
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
            ``});
            },
            getInfo(id) {
                teacher.getCardInfo(id)
                    .then(response => {
                        this.cardData = response.data[0]
                        console.log(this.cardData)
                    })
            },
            filterTag(value, row) {
                return row.cardStatus === value;
            },
            //获取
            getList(page =1) {
                this.page = page
                this.$axios.get('/sector/card/findAllByPage?start=' +this.page+'&size=' + this.limit).then(res=>{
                    //得到一个PageInfo对象
                    //将PageInfo中的total赋值给当前的total
                    this.total = res.data.data.total;
                    // this.page = res.data.data.pages;
                    this.cardData = res.data.data.list;

                    console.log(this.total);

                }, function(err) {
                    console.log(err);
                })
            },

            //多条件搜索
            doTypeSearch(){
                // /sector/card/selectAllByPageAndType/1/10?cardStatus=1&stuDept=%E5%95%86%E5%AD%A6%E9%99%A2&stuType=%E6%9C%AC%E7%A7%91%E7%94%9F
                if(this.search.Type!=null&&this.search.Status!=null&&this.search.Dept!=null){
                    this.$axios.get('/sector/card/selectAllByPageAndType/' +this.page+'/'+ this.limit+'?cardStatus='+this.search.Status+'&stuDept='+this.search.Dept+'&stuType='+this.search.Type).then(res=>{
                        this.total = res.data.data.total;
                        // this.page = res.data.data.pages;
                        this.cardData = res.data.data.list;
                        if (this.cardData!=null){
                            this.$message({
                                type: 'success',
                                message:res.data.message
                            })}
                        else {this.$message({
                            type: 'error',
                            message:res.data.message
                        })}
                        console.log(res.data.message)

                        console.log(this.cardData)
                    })
                }else{
                    this.getList()
                }
            },
            //搜索
            doSearch(){
                if(this.search.stuNumber!=null){
                    this.$axios.get('/sector/card/studentId/'+this.search.stuNumber).then(res=>{
                        this.cardData = res.data.data
                        if (this.cardData!=null){
                            this.$message({
                                type: 'success',
                                message:res.data.message
                            })}
                        else {this.$message({
                            type: 'error',
                            message:res.data.message
                        })}
                        console.log(res.data.message)

                        console.log(this.cardData)
                    })
                }else{
                    this.getList()
                }
            },
            //重置
            handleReset() {
                this.search = {
                    stuNumber: '',
                    Type: '',
                    Dept: '',
                    Status: '',
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
            onDialogClose() {
                this.$refs.cardData.resetFields()
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
    .search-bar{
        overflow: hidden;
    }
    .f2{
        font-size: 20px;
        text-align:center;
        font-weight:bold;

        border: 1px solid #dcdfe6 !important;
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


