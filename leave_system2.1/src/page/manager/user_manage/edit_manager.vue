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
                <el-button type="danger" size="mini" @click="dialogFormVisible = true">添加</el-button>
                <el-button type="danger" size="mini" @click="removeRows()" >批量删除</el-button>
            </div>
            <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
                <el-form ref="dataForm" :model="dataForm" label-width="80px">
                    <el-form-item label="角色名称" label-width="120px">
                        <el-input v-model="dataForm.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="角色代码" label-width="120px">
                        <el-input v-model="dataForm.code" ></el-input>
                    </el-form-item>
                    <el-form-item label="角色权重" label-width="120px">
                        <el-input v-model="dataForm.index" ></el-input>
                    </el-form-item>
<!--                    <el-form-item label="状态" label-width="120px">-->
<!--                        <el-select v-model="form.status" placeholder="请选择状态">-->
<!--                            <el-option label="停用" value="0"></el-option>-->
<!--                            <el-option label="启用" value="1"></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser()">确 定</el-button>
                </div>
            </el-dialog>
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
<!--                        <router-link :to="'/manager/edit_rolefrom'">-->
                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="getInfo(scope.row.id),dialogVisible = true">编辑角色</el-button>
<!--                        // </router-link>-->
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除角色</el-button>
                        <el-dialog title="编辑角色" :visible.sync="dialogVisible" @close="onDialogClose()" append-to-body>
                            <el-form ref="dataForm" :model="dataForm" label-width="80px">
                                <el-form-item label="角色名称" prop="name">
                                    <!--                    <template v-if="dialogTitle=='修改用户'">{{dataForm.clerkAccount}}</template>-->
                                    <!--                    <el-input v-else v-model="dataForm.clerkAccount" placeholder="clerkAccount"></el-input>-->
                                    <el-input v-model="dataForm.name" placeholder="角色名称"></el-input>
<!--                                    <span>{{dataForm.name}}</span>-->
                                </el-form-item>
                                <el-form-item label="角色权重" prop="index">
                                    <el-input v-model="dataForm.index" placeholder="角色权重"></el-input>
<!--                                    <span>{{dataForm.index}}</span>-->
                                </el-form-item>
                                <el-form-item label="菜单" prop="defaultProps">

                                    <el-tree
                                            :data="data"
                                            show-checkbox
                                            default-expand-all
                                            node-key="id"
                                            ref="tree"
                                            highlight-current
                                            :props="defaultProps">
                                    </el-tree>
                                </el-form-item>
<!--                                <el-form-item label="更新菜单" prop="multipleSelection">-->
<!--                                    <el-input v-model="dataForm.multipleSelection" placeholder="更新菜单"></el-input>-->
<!--                                    &lt;!&ndash;                                    <span>{{dataForm.index}}</span>&ndash;&gt;-->
<!--                                </el-form-item>-->
                                <el-button :disabled="saveBtnDisabled" type="primary" size="mini" icon="el-icon-edit" @click="save(scope.row.id)">保存</el-button>
                                <el-button @click="dialogVisible = false" type="info" size="mini" icon="el-icon-refresh-left">取 消</el-button>
                            </el-form>
                        </el-dialog>
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
    import menu from '@/api/edu/menu'
    export default {
        data() {
            return {
                saveBtnDisabled:false,
                dialogFormVisible: false,
                dialogVisible: false,
                data: [],
                dataForm:{},
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                roleId:'',
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
        // watch: {
        //     $route(to, from) {
        //         console.log('路由变化......')
        //         console.log(to)
        //         console.log(from)
        //         this.init()
        //     }
        // },
        // 生命周期函数：内存准备完毕，页面尚未渲染
        created() {
            console.log('list created......')
            this.fetchData()
            this.roleId = window.sessionStorage.getItem("roleNumber")
        },

        // 生命周期函数：内存准备完毕，页面渲染成功
        mounted() {
            console.log('list mounted......')
        },

        methods: {
            init(){
                this.roleId = window.sessionStorage.getItem("roleNumber")
                // this.getrolealist()
            },
            getrolealist(){
                this.$axios.get('/admin/authority').then(res=>{
                    this.data = res.data.data
                    console.log(this.data)
                    var jsonList = JSON.parse(JSON.stringify(this.data))
                    var list = []
                    this.getJsonToList(list, jsonList[0]['children'])
                    console.log("最终集合")
                    console.log(list)
                    // this.setCheckedKeys(list)
                // }, function(err) {
                    // console.log(err);
                })
            },

            //把json数据转成string再转成对象，根据Key获取value数据
            getJsonToList(list, jsonList){
                //遍历这个集合对象，获取key的值
                for(var i = 0; i < jsonList.length; i++){
                    if(jsonList[i]['select'] == true && jsonList[i]['level'] == 4){
                        list.push(jsonList[i]['id'])
                    }
                    if(jsonList[i]['children'] != null){
                        this.getJsonToList(list, jsonList[i]['children'])
                    }
                }

            },

            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },

            setCheckedKeys(list) {
                this.$refs.tree.setCheckedKeys(list);
            },

            save(id){
                this.saveBtnDisabled = true
                menu.doAssign(id,this.data).then(response => {
                    this.data = response.data.data
                    console.log(this.data)
                    if(response.success){
                        this.$message({
                            type:'success',
                            message:'保存成功'
                        })
                        this.$router.push({ path: '/manager/grant_manager' })
                    }
                })
            },
            // 当页码发生改变的时候
            changeSize(size) {
                console.log(size)
                this.limit = size
                this.fetchData(1)
            },

            addUser(){

                console.log(this.dataForm)
                roleApi.addRole(this.dataForm)
                    .then(response => {//添加成功
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        //回到列表页面 路由跳转
                        this.dialogFormVisible = false
                        this.fetchData(this.page)
                        console.log(response);
                    })

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
            getInfo(id) {
                this.$axios.get('/admin/role/'+id,this.dataForm).then(res=> {
                    this.dataForm.name = res.data.data[0].name
                    this.dataForm.index = res.data.data[0].index
                    // console.log(this.dataForm)
                    // console.log(this.dataForm.name)
                    // this.dataForm = res.data[0]
                }),

                this.$axios.get('/admin/authority').then(res=>{
                // this.$axios.get('/admin/role/authority/'+id).then(res=>{
                    this.data = res.data.data
                    console.log(this.data)
                    var jsonList = JSON.parse(JSON.stringify(this.data))
                    var list = []
                    this.getJsonToList(list, jsonList[0]['children'])
                    console.log("最终集合")
                    console.log(list)
                    this.setCheckedKeys(list)
                }, function(err) {
                    console.log(err);
                })
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
            onDialogClose() {
                this.dataForm.department = []
                this.$refs.dataForm.resetFields()
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

