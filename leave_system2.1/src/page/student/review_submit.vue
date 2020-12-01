<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/student' }">学生功能</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/student/review_submit' }">审核提交</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    <div class="container">
        <router-view></router-view>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="审核类型">
                <el-select v-model="form.region" placeholder="请选择提交类型">
                    <el-option label="后勤部" value="logistics"></el-option>
                    <el-option label="财务处" value="finance"></el-option>
                    <el-option label="图书馆" value="library"></el-option>
                    <el-option label="一卡通" value="card"></el-option>
                    <el-option label="教务处" value="office"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名">
                <el-col :span="5">
                <el-input v-model="form.name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="学号">
                <el-col :span="5">
                    <el-input v-model="form.num"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-col :span="5">
                    <el-input v-model="form.number" placeholder="xxx-xxxxxxxx"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-col :span="3">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="申请理由">
                <el-input type="textarea" :autosize="{ minRows: 11, maxRows: 30}" v-model="form.desc" height="300"></el-input>
            </el-form-item>
            <el-form-item>
                <el-popover
                        trigger="click"
                        content="提交成功">
                    <el-button slot="reference" type="primary" @click="onSubmit">确认提交</el-button>
                </el-popover>

                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    title:'',
                    name:'',
                    num:'',
                    number:'',
                    date1:'',
                    date2:'',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>
