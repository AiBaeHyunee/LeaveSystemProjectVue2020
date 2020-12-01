<template>
    <div>
        <!--显示我们的内容-->
<!--        <div class="content-title-box">-->
<!--            <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
<!--                <el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
<!--                <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
<!--                <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
<!--            </el-breadcrumb>-->
<!--        </div>-->
        <div class="content-container-box">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

</script>
<style>
    .content-title-box{
        padding: 10px;
        border-bottom: solid 1px #e6e6e6;
    }
    .content-container-box{
        padding: 10px;
    }
</style>
