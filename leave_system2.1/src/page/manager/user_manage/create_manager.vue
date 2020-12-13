<template lang="html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/manager' }">管理员功能</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/manager/user_manage' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/manager/user_manage/create_manager' }">编辑用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

    <el-card class="box-card">
        <div class="search-bar">
            <el-form :inline="true" class="fl">
                <el-input style="display: none;"></el-input>
                <el-form-item label="用户ID">
                    <el-input v-model="search.clerkId" placeholder="用户ID" ></el-input>
                </el-form-item>
            </el-form>
            <div class="fl">
                <el-button type="text" @click="handleReset">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="doSearch">查询</el-button>
            </div>
        </div>

        <div  class="tools-bar">
            <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisible = true,dialogTitle='新增用户'">新增用户</el-button>
        </div>

        <div>
            <el-table
                    v-loading="tableLoading"
                    ref="singleTable"
                    :data="tableData"
                    border
                    highlight-current-row
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        type="index"
                        width="60"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="clerkStatus"
                        label="停用/启用"
                        align="center"
                        min-width="100">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.status"
                                :active-value="1"
                                :inactive-value="0"
                                active-text=""
                                inactive-text=""
                                @change="handleStatus(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="clerkID" label="ID" min-width="120" sortable></el-table-column>
                <el-table-column prop="clerkName" label="真实姓名" min-width="120"  sortable></el-table-column>
                <el-table-column prop="department"  min-width="210" label="所属部门"></el-table-column>
                <el-table-column prop="clerkAccount" label="用户账号" min-width="120" sortable></el-table-column>
                <el-table-column label="用户状态" min-width="120" sortable>
                    <template slot-scope="scope">
                        {{scope.row.clerkStatus===1?'离校':'在校'}}
                    </template>
                </el-table-column>
                <el-table-column prop="clerkEmail" label="电子邮箱" width="170"></el-table-column>
                <el-table-column label="操作" fixed="right" width="250">
                    <template slot-scope="scope">
                        <div>
                            <el-button type="text" size="small" @click="getInfo(scope.row.clerkID),dialogVisible = true,dialogTitle='修改用户'">修改</el-button>
                            <el-button type="text" size="small" @click="handleResetPwd(scope.$index, scope.row)">重置密码</el-button>
                            <el-button type="danger" size="mini" icon ="el-icon-delete" @click="removeDataById(scope.row.clerkID)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>

            </el-table>
            <div class="pagination-bar">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 25, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalRecord">
                </el-pagination>
            </div>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()">
            <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="80px">
                <el-form-item label="用户账号" prop="clerkAccount">
<!--                    <template v-if="dialogTitle=='修改用户'">{{dataForm.clerkAccount}}</template>-->
<!--                    <el-input v-else v-model="dataForm.clerkAccount" placeholder="clerkAccount"></el-input>-->
                    <el-input v-model="dataForm.clerkAccount" placeholder="用户账号"></el-input>
                </el-form-item>
                <!--                    multiple-->
                <el-form-item label="用户角色" prop="roleIds">
                    <el-select v-model="dataForm.department" placeholder="请选择" style="width: 100%;"  multiple>
                        <el-option
                                v-for="item in roles"
                                :key="item.index"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
<!--                <el-form-item label="用户角色" prop="clerkName">-->
<!--                    <el-input v-model="dataForm.department" placeholder="用户角色"></el-input>-->
<!--                </el-form-item>-->

                <el-form-item label="真实姓名" prop="clerkName">
                    <el-input v-model="dataForm.clerkName" placeholder="真实姓名"></el-input>
                </el-form-item>

                <el-form-item label="电子邮箱" prop="clerkEmail">
                    <el-input v-model="dataForm.clerkEmail" placeholder="电子邮箱"></el-input>
                </el-form-item>

                <el-form-item label="用户密码" prop="clerkPwd">
                    <el-input v-model="dataForm.clerkPwd" placeholder="密码"></el-input>
                </el-form-item>
<!--                <el-form-item label="用户状态" prop="clerkStatus">-->
<!--                    <el-select v-model="dataForm.clerkStatus" placeholder="请选择" style="width: 100%;">-->
<!--                        <el-option :value="0" label="离校"/>-->
<!--                        <el-option :value="1" label="在校"/>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="info" @click="saveOrUpdate" v-if="dialogTitle=='修改用户'">保存</el-button>
                <el-button type="primary" @click="saveOrUpdate" v-else>立即创建</el-button>
            </div>
        </el-dialog>

    </el-card>

    </div>
</template>

<script>
    // import { getUserList } from '@/api/permission'
    import teacher from '@/api/edu/teacher'
    import moment from 'moment'
    export default {
        data() {
            return {
                search:{
                    clerkId:'',
                },
                totalRecord: 0,
                page:1,//当前页
                pageSize: 10,
                tableLoading: true,
                dialogVisible: false,
                dialogTitle: '新增用户',
                roles: [
                    {
                        index: 0,
                        name: '管理员'
                    },
                    {
                        index: 1,
                        name: '教务处'
                    },
                    {
                        index: 2,
                        name: '图书馆'
                    },
                    {
                        index: 3,
                        name: '后勤部'
                    },
                    {
                        index: 4,
                        name: '财务处'
                    },
                    {
                        index: 5,
                        name: '一卡通'
                    }
                ],
                defaultTreeProps: {
                    children: 'childPermList',
                    label: 'permissionName'
                },
                rules: {
                    clerkAccount: [
                        {
                            required: true,
                            message: '职工账号不能为空',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 50,
                            message: '职工账号长度在 1 到 50 个字符',
                            trigger: 'blur'
                        }
                    ],
                    clerkName: [
                        {
                            required: true,
                            message: '真实姓名不能为空',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 20,
                            message: '真实姓名长度在 1 到 20 个字符',
                            trigger: 'blur'
                        }
                    ],

                    clerkEmail: [
                        {
                            required: true,
                            message: '请输入邮箱地址',
                            trigger: 'blur'
                        },
                        {
                            type: 'email',
                            message: '邮箱格式不正确',
                            trigger: 'blur, change'
                        }
                    ]
                },
                searchData: {
                    clerkId: ''
                },
                dataForm: {

                },
                tableData: []
            }
        },
        created() {
            // this.initList()
            this.getList()
        },
        methods: {
            //获取
            getList() {
                teacher.getTeacherListPage().then(response =>{//请求成功
                        //response接口返回的数据
                        this.tableData = response.data
                        this.totalRecord = response.data.length
                        console.log(this.tableData)
                        console.log(this.totalRecord)
                    })
                this.tableLoading=false
                // this.$axios.get('/admin/user').then(res=>{
                //     this.tableData = res.data
                //     this.totalRecord = res.data.length
                //     console.log(this.tableData)
                //     console.log(this.totalRecord)
                // })
            },
            //搜索
            doSearch(){
                if(this.search.clerkId!=null){
                    teacher.doUserSearch(this.search.clerkId).then(response => {
                        this.tableData = response.data
                        console.log(this.tableData)
                    });
                }else{
                    this.getList()
                }
            },
            //删除
            removeDataById(id) {
                this.$confirm('此操作将永久删除管理员身份, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {  //点击确定，执行then方法
                    //调用删除的方法
                    teacher.deleteTeacherId(id)
                        .then(response =>{//删除成功
                            //提示信息
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //回到列表页面
                            this.getList()
                            console.log(response)
                        })
                }) //点击取消，执行catch方法
            },

            // 根据讲师id查询的方法
            getInfo(id) {
                teacher.getTeacherInfo(id)
                    .then(response => {
                        this.dataForm = response.data[0]
                        console.log(this.dataForm)
                    })
            },
            //重置
            handleReset() {
                this.search = {
                    clerkID: ''
                }
                this.doSearch()
            },

            saveOrUpdate() {
                //判断修改还是添加
                this.dialogVisible = true
                //根据teacher是否有id
                if(!this.dataForm.clerkID) {
                    //添加
                    this.saveTeacher()
                } else {
                    //修改
                    this.updateTeacher(this.dataForm.clerkID)
                }

            },
            //修改讲师的方法
            updateTeacher(id) {
                teacher.updateTeacherInfo(id,this.dataForm)
                    .then(response => {
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        //回到列表页面 路由跳转
                        this.dialogVisible = false
                        this.getList()
                        console.log(response)
                    })
            },
            //添加讲师的方法
            saveTeacher() {
                teacher.addTeacher(this.dataForm)
                    .then(response => {//添加成功
                        //提示信息
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        //回到列表页面 路由跳转
                        this.dialogVisible = false
                        this.getList()
                        console.log(response);
                    })
            },

            // eslint-disable-next-line no-unused-vars
            handleStatus(row) {},
            statusFormat(row, column, cellValue) {
                return { '0': '停用', '1': '启用' }[cellValue] || ''
            },
            onDialogClose() {
                this.dataForm.department = []
                this.$refs.dataForm.resetFields()
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.onSearch()
            },
            handleCurrentChange(val) {
                this.onSearch({ pageNumber: val })
            },

            // eslint-disable-next-line no-unused-vars
            // onSearch({ pageNumber = 1 } = {}) {},
            toDateTime(row, column, cellValue) {
                return cellValue
                    ? moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
                    : ''
            },
            // eslint-disable-next-line no-unused-vars
            roleFormatter(row, column, cellValue) {
                let result = []
                if (typeof row.erpMemberRoles === 'object' && row.erpMemberRoles.length > 0) {
                    for (let item of row.erpMemberRoles) {
                        result.push(item.name)
                    }
                }
                return result.join('，')
            },
            // eslint-disable-next-line no-unused-vars
            handleChangeStatus(index, row) {},
            // eslint-disable-next-line no-unused-vars
            handleResetPwd(index, row) {
                this.$confirm('确认重置该用户的登录密码？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {})
            },
            //@click="handleEdit(scope.$index, scope.row)
            handleEdit(index, row) {
                this.dialogVisible = true
                this.dialogTitle = '修改用户信息'
                this.dataForm.department = []
                for (let x of Object.keys(this.dataForm)) {
                    if (
                        x === 'department' &&
                        typeof row.department === 'object' &&
                        row.department.length > 0
                    ) {
                        for (let item of row.department) {
                            this.dataForm.department.push(item.index)
                        }
                    } else {
                        this.dataForm[x] = row[x]
                    }
                }
            },
            onDialogSubmit() {}
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



