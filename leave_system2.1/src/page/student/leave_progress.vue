<template>
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >学生功能</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '#/student/leave_progress' }">离校进度</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <span></span>
            </div>
            <div class="content-table">
                <mail :tableData="tableData" :tableStyle="{ width:'600px' }"></mail>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return{
                tableData: [
                    {key: '图书馆图书借阅', value: '已审核'},
                    {key: '财务处缴费', value: '已审核'},
                    {key: '一卡通注销', value: '已审核'},
                    {key: '宿舍迁出', value: '已审核'},
                    {key: '毕业证审核', value: '已审核'},
                ]
            }
        },
    }
</script>

<style scoped>
    .content-table{
        margin-left: 450px;
    }
</style>
