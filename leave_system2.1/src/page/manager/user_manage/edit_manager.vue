<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >用户管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/manager/edit_manager' }">角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="box-card">
        <div class="app-container">
            <!-- 查询表单 -->
            <div class="search-bar">
                <el-form :inline="true" class="fl">
                    <el-input style="display: none;"></el-input>
                    <el-form-item label="角色ID">
                        <el-input v-model="search.id" placeholder="角色ID" ></el-input>
                    </el-form-item>
                </el-form>
                <div class="fl">
                    <el-button type="text" @click="handleReset">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
                </div>
            </div>

            <!-- 工具条 -->
            <div>
                <el-button type="danger" size="mini" @click="addUser()">添加</el-button>
                <el-button type="danger" size="mini" @click="removeRows()" >批量删除</el-button>
            </div>
            <!-- 讲师列表 -->
            <el-table
                    v-loading="listLoading"
                    :data="list"
                    stripe
                    style="width: 100%"
                    @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="55" />

                <el-table-column label="序号" width="70" align="center">
                    <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column prop="id" label="角色ID" min-width="170"  sortable/>
                <el-table-column prop="name" label="角色名称"  min-width="170" sortable/>
                <el-table-column prop="index" label="角色权重" min-width="100" sortable/>

                <el-table-column label="操作" fixed="right" min-width="180" >
                    <template slot-scope="scope">
                        <router-link :to="'/manager/role'">
                            <el-button type="success" size="mini" icon="el-icon-info" @click="removeReview(scope.row.id)">查看权限</el-button>
                        </router-link>
                        <router-link :to="'/manager/edit_rolefrom'">
                            <el-button type="primary" size="mini" icon="el-icon-edit" >编辑角色</el-button>
                        </router-link>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除角色</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination
                    :current-page="page"
                    :total="total"
                    :page-size="limit"
                    :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
                    style="padding: 30px 0; text-align: center;"
                    layout="sizes, prev, pager, next, jumper, ->, total, slot"
                    @current-change="fetchData"
                    @size-change="changeSize"
            />
        </div>
        </el-card>
    </div>
</template>

<script>
    import roleApi from '@/api/edu/role'

    export default {
        data() {
            return {
                listLoading: true, // 数据是否正在加载
                list: null, // 讲师列表
                total: 0, // 数据库中的总记录数
                page: 1, // 默认页码
                limit: 10, // 每页记录数
                searchObj: {}, // 查询表单对象
                search:{
                    id:'',
                },
                multipleSelection: [] // 批量选择中选择的记录列表
            }
        },

        // 生命周期函数：内存准备完毕，页面尚未渲染
        created() {
            console.log('list created......')
            this.fetchData()
        },

        // 生命周期函数：内存准备完毕，页面渲染成功
        mounted() {
            console.log('list mounted......')
        },

        methods: {
            // 当页码发生改变的时候
            changeSize(size) {
                console.log(size)
                this.limit = size
                this.fetchData(1)
            },

            addUser(){
                this.$router.push({ path: '/acl/role/add' })
            },

            // 加载讲师列表数据
            fetchData(page = 1) {
                // 异步获取远程数据（ajax）
                this.page = page

                roleApi.getPageList(this.searchObj).then(
                    response => {
                        this.list = response.data
                        console.log(this.list)
                        // 数据加载并绑定成功
                        this.listLoading = false
                    }
                )
            },

            //搜索菜单
            doSearch(){
                if(this.search.id!=null){
                    roleApi.doRoleSearch(this.search.id).then(response => {
                        this.list = response.data
                        console.log(this.list)
                        // 数据加载并绑定成功
                        this.listLoading = false
                    });
                }else{
                    this.fetchData()
                }
            },
            //重置
            handleReset() {
                this.search = {
                    id: ''
                }
                // this.doSearch()
                this.fetchData()
            },

            // 根据id删除数据
            removeDataById(id) {
                // debugger
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { // promise
                    // 点击确定，远程调用ajax
                    return roleApi.removeById(id)
                }).then((response) => {
                    this.fetchData(this.page)
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },

            // 当表格复选框选项发生变化的时候触发
            handleSelectionChange(selection) {
                console.log('handleSelectionChange......')
                console.log(selection)
                this.multipleSelection = selection
            },

            // 批量删除
            removeRows() {
                console.log('removeRows......')

                if (this.multipleSelection.length === 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要删除的记录!'
                    })
                    return
                }

                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { // promise
                    // 点击确定，远程调用ajax
                    // 遍历selection，将id取出放入id列表
                    var idList = []
                    this.multipleSelection.forEach(item => {
                        idList.push(item.id)
                        // console.log(idList)
                    })
                    // 调用api
                    return roleApi.removeRows(idList)
                }).then((response) => {
                    this.fetchData(this.page)
                    if (response.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },

            //保存点击id
            removeReview(id){
                window.sessionStorage.setItem("roleNumber",id);
                // this.$router.push('/sector/library/review_library')
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

