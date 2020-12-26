<template>
    <div>
        <div>
            <div class="bh-col-md-12 bh-form-groupname borderLeft bh-mb-24" style="text-align: left;margin-top: 20px;margin-bottom: 15px">离校进度</div>
            <el-steps :space="200"  finish-status="success" style="width: 70%;margin: 0 auto">
                <el-step title="一卡通" description="审核已通过" v-if="show21" status="success"></el-step>
                <el-step title="一卡通" description="审核未通过" v-if="show22" status="warning" style="color: red"></el-step>

                <el-step title="图书馆" description="审核已通过" v-if="show11" status="success"></el-step>
                <el-step title="图书馆" description="审核未通过" v-if="show12" statsus="warning" style="color: red"></el-step>

                <el-step title="后勤处" description="审核已通过" v-if="show41" status="success"></el-step>
                <el-step title="后勤处" description="审核未通过" v-if="show42" status="warning" style="color: red"></el-step>

                <el-step title="财务处" description="审核已通过" v-if="show31" status="success"></el-step>
                <el-step title="财务处" description="审核未通过" v-if="show32" status="warning" style="color: red"></el-step>

                <el-step title="教务处" description="审核已通过" v-if="show51" status="success"></el-step>
                <el-step title="教务处" description="审核未通过"  v-if="show52" status="warning" style="color: red"></el-step>
            </el-steps>
        </div>
        <div style="height: 60px"></div>

        <div>
            <div class="bh-col-md-12 bh-form-groupname borderLeft bh-mb-24" style="text-align: left;margin-top: 20px;margin-bottom: 15px">离校表单</div>
            <table class="infoTable bh-mb-36" style="width: 70%;margin: 0 auto;text-align: center;">
                <tr>
                    <td class="column bh-mb-24">一卡通</td>
                    <td style="color: green" v-if="show21">通过</td>
                    <td style="color: red" v-if="show22">未通过</td>
                </tr>
                <tr>
                    <td class="column bh-mb-24">图书馆</td>
                    <td style="color: green" v-if="show11">通过</td>
                    <td style="color: red" v-if="show12">未通过</td>
                </tr>
                <tr>
                    <td class="column bh-mb-24">后勤处</td>
                    <td style="color: green" v-if="show41">通过</td>
                    <td style="color: red" v-if="show42">未通过</td>
                </tr>
                <tr>
                    <td class="column bh-mb-24">财务处</td>
                    <td style="color: green" v-if="show31">通过</td>
                    <td style="color: red" v-if="show32">未通过</td>
                </tr>
                <tr>
                    <td class="column bh-mb-24">教务处</td>
                    <td style="color: green" v-if="show51">通过</td>
                    <td style="color: red" v-if="show52">未通过</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "send_message",
        data() {
            return {
                // show11:false,
                // show12:true,
                show11:false,
                show12:false,

                show21:false,
                show22:false,

                show31:false,
                show32:false,

                show41:false,
                show42:false,

                show51:false,
                show52:false,
                // len:'',
                //0 审核不通过；1 通过
                num1: '',// libStatus:'',
                num2: '',// cardStatus:'',
                num3: '',// dormStatus:'',
                num4: '',// financeStatus:'',
                num5: '',// eduStatus:'',
                tableData:[]
            }
        },
        created() {
            this.getData();
            // this.count();
        },

        methods: {
            // 给后端发送用户发送给管理员的消息[{title:'',content:''}]，并从后端拿用户已发布消息的数据渲染到 tableData[]中
            getData() {
                //get方法
                axios.get('student/process')
                    .then(res => {
                        console.log(res.data);
                        if (res.data.code === 20000) {
                            // this.num = 0; //通过总数
                            this.tableData = res.data.data;
                            console.log('test')
                            console.log(this.tableData[0].libStatus)
                            console.log(this.tableData[0].cardStatus)
                            console.log(this.tableData[0].dormStatus)
                            console.log(this.tableData[0].financeStatus)
                            console.log(this.tableData[0].eduStatus)

                            this.num1 = this.tableData[0].libStatus;
                            this.num2 = this.tableData[0].cardStatus;
                            this.num3 = this.tableData[0].dormStatus;
                            this.num4 = this.tableData[0].financeStatus;
                            this.num5 = this.tableData[0].eduStatus;

                            if(this.num1 == '1') {
                                this.show11 = true
                                this.show12 = false
                            }
                            if(this.num1 == '0') {
                                this.show11 = false
                                this.show12 = true
                            }

                            if(this.num2 == '1') {
                                this.show21 = true
                                this.show22 = false
                            }
                            if(this.num2 == '0') {
                                this.show21 = false
                                this.show22 = true
                            }

                            if(this.num3 == '1') {
                                this.show31 = true
                                this.show32 = false
                            }
                            if(this.num3 == '0') {
                                this.show31 = false
                                this.show32 = true
                            }

                            if(this.num4 == '1') {
                                this.show41 = true
                                this.show42 = false
                            }
                            if(this.num4 == '0') {
                                this.show41 = false
                                this.show42 = true
                            }

                            if(this.num5 == '1') {
                                this.show51 = true
                                this.show52 = false
                            }
                            if(this.num5 == '0') {
                                this.show51 = false
                                this.show52 = true
                            }
                        }
                    })
            },
            // count() {
            //     this.tableData[0].forEach(item=> {
            //         if (item.libStatus == 0) {
            //             console.log('+++')
            //             this.num++;
            //             // this.num1 = 0;
            //         }
            //         if (item.cardStatus == 0) {
            //             console.log('+++')
            //             this.num++;
            //             // this.num2 = 0;
            //         }
            //         if (item.dormStatus == 0) {
            //             console.log('+++')
            //             this.num++;
            //             // this.num3 = 0;
            //         }
            //         if (item.financeStatus == 0) {
            //             console.log('+++')
            //             this.num++;
            //             // this.num4 = 0;
            //         }
            //         if (this.tableData[0].eduStatus == 0) {
            //             console.log('+++')
            //             this.num++;
            //             // this.num5 = 0;
            //         }
            //         // console.log('num:'+this.num)
            //     })
            // }
        }
    }
</script>

<style scoped>
    .msgForm {
        width: 95%;
        margin:0 auto;
        margin-top: 10px;
        border:1px solid #ddd;
        border-radius: 2px
    }

    .bh-form-groupname {
        font-size: 16px;
        font-weight: 700;
        border-left: 4px solid #009688;
        padding-left: 8px;
        line-height: 16px;
        min-height: 0!important;
        margin-bottom: 8px;
        float: none!important;
    }

    /*查看回复按钮*/
    /*.transition-box {*/
    /*    margin-bottom: 10px;*/
    /*    width: 200px;*/
    /*    height: 100px;*/
    /*    border-radius: 4px;*/
    /*    background-color: #409EFF;*/
    /*    text-align: center;*/
    /*    color: #fff;*/
    /*    padding: 40px 20px;*/
    /*    box-sizing: border-box;*/
    /*    margin-right: 20px;*/
    /*}*/

    /*表格扩展框*/
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .bh-form-groupname {
        font-size: 16px;
        font-weight: 700;
        border-left: 4px solid #009688;
        padding-left: 8px;
        line-height: 16px;
        min-height: 0!important;
        margin-bottom: 8px;
        float: none!important;
    }
    .borderLeft {
        margin-left: 12px;
    }

    .bh-form-readonly.bh-form-horizontal .bh-form-label {
        padding: 4px 4px 4px 12px;
        line-height: 24px;
    }
    .bh-form-readonly .bh-form-label {
        padding: 6px 4px;
        border-right: none;
    }
    [bh-form-role=bhForm] .bh-form-label {
        padding: 4px 0 4px 16px;
        line-height: 20px;
    }
    .bh-form-readonly-label {
        width: 124px;
        float: left;
        word-break: break-all;
    }
    .bh-form-label {
        display: inline-block;
        max-width: 100%;
        font-weight: 700;
        font-size: 12px;
        padding: 4px 0 4px 4px;
        text-align: left;
        color: #444;
    }

    .bh-form-readonly .bh-form-block {
        border-left: #CCEAE7 solid 1px;
        border-top: #CCEAE7 solid 1px;
        clear: both;
        margin-bottom: 16px;
    }
    .bh-form-readonly .bh-form-group {
        background: #F5FBFA;
        border-right: #CCEAE7 solid 1px;
        border-bottom: #CCEAE7 solid 1px;
        margin-bottom: 0;
        padding-left: 0;
        padding-right: 0;
    }
    /*.imgdiv {*/
    /*    margin-left: 115px;*/
    /*    margin-top: 10px;*/
    /*}*/

    /*.trtable {*/
    /*    margin-top: 20px;*/
    /*    margin-left: 0px;*/
    /*}*/

    .imgclass {
        width: 100px;
        height: 135px;
        margin-top: 15px;
    }

    .infoTable{
        /*FILTER: Alpha(opacity=50);*/
        border:1px solid #E6EAEE;
        width: 100%;
        margin-top: 0px;
        margin-left: 0px;
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
        /*font-weight: 500;*/
        /*font-size: 15px;*/
        /*color: #393C3E;*/
    }

    /*.el-header, .el-footer {*/
    /*    !*background-color: #B3C0D1;*!*/
    /*    background-color: #e6e6e6;*/
    /*    color: #333;*/
    /*    !*text-align: center;*!*/
    /*    !*height: 10px;*!*/
    /*    line-height: 60px;*/
    /*}*/

    .el-aside {
        /*background-color: #D3DCE6;*/
        background-color: #f0f0f0;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
