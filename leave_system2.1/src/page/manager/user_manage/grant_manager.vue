<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >用户管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/manager/grant_manager' }">菜单授权</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card class="box-card">
            <div class="search-bar">
                <el-form :inline="true" class="fl">
                    <el-input style="display: none;"></el-input>
                    <el-form-item label="菜单名称">
                        <el-input v-model="search.name" placeholder="菜单名称" ></el-input>
                    </el-form-item>
                </el-form>
                <div class="fl">
                    <el-button type="text" @click="handleReset">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
                </div>
            </div>

            <div  class="tools-bar">
                <el-button type="success" icon="el-icon-plus" size="small"  @click="() => { dialogFormVisible = true }">新增菜单</el-button>
            </div>

            <el-table
                    v-loading="listLoading"
                    :data="menuList"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    border
                    default-expand-all
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                   >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="name" label="菜单名称" sortable width="180"></el-table-column>
                <el-table-column prop="id" label="菜单ID" sortable width="180"></el-table-column>
                <el-table-column prop="url" label="访问路径" sortable width="180"></el-table-column>
                <el-table-column label="是否可用" min-width="120"  style="position: center"
                                 :filters="[{ text: '可用', value: 1 }, { text: '不可用', value: 0 }]"
                                 :filter-method="filterTag"
                                 filter-placement="bottom-end">
                    <template slot-scope="scope" >
                        <el-tag :type="scope.row.available === 1 ? 'success' : 'danger'" disable-transitions>
                            {{scope.row.available === 1 ?'可用':'不可用'}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column  prop="index"  label="权重值" width="110"></el-table-column>
                <el-table-column  label="操作" fixed="right" width="200">
                <template slot-scope="scope">
                    <el-button type="text"  size="mini" @click="() => {dialogPermissionVisible = true, permission.pid = scope.row.id}">添加功能</el-button>
                    <el-button type="text" size="mini" @click="() => getById(scope.row)">修改</el-button>
                    <el-button type="danger"  size="mini" @click="() => remove(scope.row)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogFormVisible" :title="dialogFormValue">
            <el-form ref="menu" :model="menu" :rules="menuValidateRules" label-width="120px">
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="menu.name"/>
                </el-form-item>
                <el-form-item label="访问路径" prop="path">
                    <el-input v-model="menu.path"/>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="restData()">取 消</el-button>
                <el-button type="primary" @click="append()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加功能的窗口 -->
        <el-dialog :visible.sync="dialogPermissionVisible" title="添加功能">
            <el-form ref="permission" :model="permission" :rules="permissionValidateRules" label-width="120px">
                <el-form-item label="功能名称" prop="name">
                    <el-input v-model="permission.name"/>
                </el-form-item>
                <el-form-item label="访问路径">
                    <el-input v-model="permission.path"/>
                </el-form-item>
                <el-form-item label="功能权重值" prop="permissionValue">
                    <el-input v-model="permission.permissionValue"/>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="restData()">取 消</el-button>
                <el-button type="primary" @click="appendPermission()">确 定</el-button>
            </div>
        </el-dialog>
        </el-card>
    </div>

</template>

<script>
    import menu from '@/api/edu/menu';

    const menuForm = {
        name: '',
        pid: 0,
        path: '',
        component: '',
        type: '1'
    }
    const perForm = {
        permissionValue: '',
        type: '2',
        name: '',
        path: '',
        component: '',
        pid: 0
    }

    export default {
        data() {
            return {
                listLoading: true,
                search:{
                    name:'',
                },
                filterText: '',
                menuList: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dialogFormValue: '添加菜单',
                dialogFormVisible: false,
                dialogPermissionVisible: false,
                menu: menuForm,
                permission: perForm,
                menuValidateRules: {
                    name: [{required: true, trigger: 'blur', message: '菜单名必须输入'}],
                    path: [{required: true, trigger: 'blur', message: '菜单路径必须输入'}],
                    component: [{required: true, trigger: 'blur', message: '组件名称必须输入'}]
                },
                permissionValidateRules: {
                    name: [{required: true, trigger: 'blur', message: '功能名称必须输入'}],
                    permissionValue: [{required: true, trigger: 'blur', message: '功能权限值必须输入'}]
                }
            }
        },
        // 监听上面文本框搜索
        watch: {
            filterText(val) {
                this.$refs.menuTree.filter(val)
            }
        },

        created() {
            this.fetchNodeList()
        },

        methods: {
            filterTag(value, row) {
                return row.available === value;
            },
            //获取菜单列表
            fetchNodeList() {
                menu.getNestedTreeList().then(response =>{//请求成功
                    //response接口返回的数据
                    if (response.success === true) {
                        this.menuList = response.data
                        console.log(this.menuList)
                    }
                    this.listLoading = false
                })
            },
            //搜索菜单
            doSearch(){
                if(this.search.name!=null){
                    menu.doMenuSearch(this.search.name).then(response => {
                        this.menuList = response.data
                        console.log(this.menuList)
                    });
                }else{
                    this.fetchNodeList()
                }
            },
            //重置
            handleReset() {
                this.search = {
                    name: ''
                }
                this.doSearch()
            },
            filterNode(value, data) {
                if (!value) return true
                return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
            },
            remove(data) {
                console.log(data)

                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    return menu.removeById(data.id)
                }).then(() => {
                    this.fetchNodeList()// 刷新列表
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch((response) => { // 失败
                    if (response === 'cancel') {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败'
                        })
                    }
                })
            },
            appendPermission() {
                this.$refs.permission.validate(valid => {
                    if (valid) {
                        if (this.permission.id) {
                            this.update(this.permission)
                        } else {
                            menu.saveLevelOne(this.permission).then(response => {
                                this.dialogPermissionVisible = false
                                this.$message({
                                    type: 'success',
                                    message: '添加功能成功'
                                })
                                // 刷新页面
                                this.fetchNodeList()
                                this.menu = {...menuForm}
                                this.permission = {...perForm}
                                console.log(response)
                            })
                        }
                    }
                })
            },
            appendLevelOne() {
                menu.saveLevelOne(this.menu)
                    .then(response => {
                        this.dialogFormVisible = false
                        this.$message({
                            type: 'success',
                            message: '添加一级菜单成功'
                        })
                        // 刷新页面
                        this.fetchNodeList()
                        this.menu = {...menuForm}
                        this.permission = {...perForm}
                        console.log(response)
                    })
                    .catch(response => {
                        // 你们写：判断点击取消清空一下
                        this.dialogFormVisible = false
                        this.$message({
                            type: 'error',
                            message: '添加一级菜单失败'
                        })
                        this.menu = {...menuForm}
                        this.permission = {...perForm}
                        console.log(response)
                    })
            },

            append() {
                this.$refs.menu.validate(valid => {
                    if (valid) {
                        if (!this.menu.id) { // 添加
                            if (this.menu.pid == 0) {
                                this.appendLevelOne() // 一级分类的添加
                            } else {
                                this.appendLevelTwo() // 二级分类的添加
                            }
                        } else { // 修改
                            this.update(this.menu)
                        }
                    }
                })
            },

            update(obj) {
                menu.update(obj).then(response => {
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    // 刷新页面
                    this.fetchNodeList()
                    this.restData()
                    console.log(response)
                })
            },
            appendLevelTwo() {
                menu.saveLevelOne(this.menu)
                    .then(response => {
                        // 1、把文本框关
                        this.dialogFormVisible = false
                        // 2、提示成功
                        this.$message({
                            type: 'success',
                            message: "添加二级分类成功"
                        })
                        // 3、刷新页面
                        this.fetchNodeList()
                        // 4、把menu清空
                        this.menu = {...menuForm}
                        this.permission = {...perForm}
                        console.log(response)
                    })
                    .catch(response => {
                        // 1、把文本框关
                        this.dialogFormVisible = false
                        // 2、提示成功
                        this.$message({
                            type: 'error',
                            message: "添加二级分类失败"
                        })
                        // 3、把menu清空
                        this.menu = {...menuForm}
                        this.permission = {...perForm}
                        console.log(response)
                    })
            },
            getById(data) {
                this.dialogFormVisible = true
                this.menu = data
            },
            updateFunction(data) {
                this.dialogPermissionVisible = true
                this.permission = data
            },
            restData() {
                this.dialogPermissionVisible = false
                this.dialogFormVisible = false
                this.menu = {...menuForm}
                this.permission = {...perForm}
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
