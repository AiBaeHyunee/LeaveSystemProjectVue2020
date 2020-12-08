<template>
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>

        <table class="infoTable" :style="styleObject" v-if="table_show" >

            <div>
                <el-row style="font-size: 18px">
                    <el-col class="imgdiv" :span="4">
                        <td><img class="imgclass" :src=tableData.stuPhoto></td>
                    </el-col>
                    <el-col :span="8" style="margin-top: 10px;margin-left: 7px">
                        <td style="text-align: left;width: 100px">学号</td>
                        <td style="text-align: right;width: 150px">{{ tableData.stuNumber }}</td>
                    </el-col>
                    <el-col :span="8" style="margin-top: 10px">
                        <td style="text-align: left;width: 100px">姓名</td>
                        <td style="text-align: right;width: 150px">{{ tableData.stuName }}</td>
                    </el-col>
                    <el-col :span="8" style="margin-top: 10px;margin-left: 7px">
                        <td style="text-align: left;width: 100px">学院</td>
                        <td style="text-align: right;width: 150px">{{ tableData.stuDept }}</td>
                    </el-col>
                    <el-col :span="8" style="margin-top: 10px">
                        <td style="text-align: left;width: 100px">班级</td>
                        <td style="text-align: right;width: 150px">{{ tableData.stuClass }}</td>
                    </el-col>
                    <el-col :span="8" style="margin-top: 10px;margin-left: 7px">
                        <td style="text-align: left;width: 100px">家庭住址</td>
                        <td style="text-align: right;width: 150px">{{ tableData.stuAddress }}</td>
                    </el-col>
                    <el-col :span="8" style="margin-top: 10px">
                        <td style="text-align: left;width: 100px">专业</td>
                        <td style="text-align: right;width: 150px">{{ tableData.stuSpecialty }}</td>
                    </el-col>
                    <el-col :span="8" style="margin-top: 10px;margin-left: 7px">
                        <td style="text-align: left;width: 100px">民族</td>
                        <td style="text-align: right;width: 150px">{{ tableData.stuNation }}</td>
                    </el-col>
                    <el-col :span="8" style="margin-top: 10px">
                        <td style="text-align: left;width: 100px">政治面貌</td>
                        <td style="text-align: right;width: 150px">{{ tableData.stuFeature }}</td>
                    </el-col>
                </el-row>
            </div>

            <!--            <td class="column">邮箱</td>-->
            <!--            <td>{{ tableData.stuContact }}</td>-->
            <!--            <td class="column">入学时间</td>-->
            <!--            <td>{{ tableData.stuInDate }}</td>-->
            <!--        </tr>-->
            <!--        <tr>-->
            <!--            <td class="column">家庭住址</td>-->
            <!--            <td>{{ tableData.stuAddress }}</td>-->
            <!--            <td class="column">专业</td>-->
            <!--            <td>{{ tableData.stuSpecialty }}</td>-->
            <!--        </tr>-->
            <!--        <tr>-->
            <!--            <td class="column">民族</td>-->
            <!--            <td>{{ tableData.stuNation }}</td>-->
            <!--            <td class="column">政治面貌</td>-->
            <!--            <td>{{ tableData.stuFeature }}</td>-->
            <!--        </tr>-->
        </table>

        <table class="infoTable" :gutter="20" :style="styleObject" v-else>
            <el-col class="imgdiv" :span="4">
                <td><img class="imgclass" :src=tableData.clerkPhoto></td>
            </el-col>
            <el-col class="trtable" :span="14">
                <tr>
                    <td class="column">部门</td>
                    <td>{{ tableData.department }}</td>
                </tr>
                <tr>
                    <td class="column">用户名</td>
                    <td>{{ tableData.username }}</td>
                </tr>
                <tr>
                    <td class="column">邮箱</td>
                    <td>{{ tableData.clerkEmail }}</td>
                </tr>
            </el-col>

        </table>
        </el-card>
    </div>
</template>

<script>
    //引入axios
    import axios from 'axios'

    export default{
        data() {
            return {
                len: '',
                // tableD: ['学号','姓名','学院','班级','联系方式','入学时间',
                // '家庭住址','专业','民族','政治面貌','公寓号','宿舍号'],
                // tableData: [{
                //     "stuNumber": 1,
                //     "stuName": "AB",
                //     "stuDept":"学院",
                //     "stuClass":"班级",
                //     "stuContact":"联系方式",
                //     "stuInDate":"入学时间",
                //     "stuAddress": "家庭住址",
                //     "stuSpecialty": "专业",
                //     "stuNation": "民族",
                //     "stuFeature": "政治面貌",
                //     "apartmentNum": "公寓号",
                //     "dormNum": "宿舍号"
                // }]
                tableData: []
            };
        },
        // props: ['tableStyle','showByRow'],
        computed: {
            rowCount: function () {
                return Math.ceil(this.tableD.length/3)
            }
        },
        created() {
            // this.styleObject = this.tableStyle;
            this.getData();
        },
        methods: {
            // 2 获取到数据
            getData() {
                axios.get('common/info').then(res => {
                    // console.log(res.data);
                    if (res.data.code === 20000){
                        this.tableData = res.data.data
                        console.log(this.tableData);
                        console.log(typeof this.tableData.clerkPhoto);
                        this.len = Object.keys(this.tableData).length;
                        console.log(this.len);
                        //27----学生，16----管理员
                        if (this.len == 27) {
                            this.table_show = true;
                            console.log(this.table_show);
                        } else {
                            this.table_show = false;
                        }
                    }
                });
            },
            tran() {
                this.tableData.clerkPhoto = require(this.tableData.clerkPhoto)
            }
        }
    }
</script>

<style>
    .imgdiv {
        margin-left: 115px;
        margin-top: 10px;
    }

    .trtable {
        margin-top: 20px;
        margin-left: 0px;
    }

    .imgclass {
        width: 110px;
        height: 140px;
    }

    .infoTable{
        /*FILTER: Alpha(opacity=50);*/
        border:1px solid #E6EAEE;
        width: 80%;
        margin-top: 80px;
        margin-left: 120px;
        background-color: #e6e6e6;
    }
    .infoTable tr, .infoTable tr td{
        border:0px solid #E6EAEE;
    }
    .infoTable{
        font-size: 12px;
        color: #222d7e;
        /*color: #71787E;*/
    }
    .infoTable tr td{
        border:0px solid #E6EAEE;
        width: 150px;
        height: 50px;
        font-size: 15px;
        line-height: 35px;
        box-sizing: border-box;
        padding: 0 10px;
    }
    .infoTable tr td.column {
        background-color: #EFF3F6;
        color: #2a353e;
        /*color: #393C3E;*/
    }
</style>
