<template>

    <div>
        <el-container ref="print">
            <el-aside width="140px;">
                <el-row style="height: 85px">
                    <img class="imgclass" :src=tableData[0].stuPhoto>
                </el-row>
                <el-row style="height: 25px;font-size: 14px">{{ tableData[0].stuName }}</el-row>
                <el-row style="height: 35px;font-size: 14px">{{ tableData[0].stuNumber }}</el-row>


                <el-row style="height: 40px">
                    <div>

                        <div style="margin-top: 0px; height: 200px;">
                            <el-button type="text" @click="show3 = !show3" style="color: #3a8ee6;font-weight: 700">审核详情</el-button>
                            <el-collapse-transition style="height: 20px">
                                <div v-show="show3">
                                    <div class="transition-box">

                                        <div class="block">
                                            <el-timeline :reverse="reverse">
                                                <el-timeline-item
                                                        v-for="(activity, index) in activities"
                                                        :key="index"
                                                        style="height: 70px;margin-top: 0px"
                                                        :timestamp="activity.timestamp">
                                                    {{activity.content}}
                                                </el-timeline-item>
                                            </el-timeline>
                                        </div>

                                    </div>
                                </div>
                            </el-collapse-transition>
                        </div>
                    </div>
                </el-row>

                <!--                </div>-->
                <el-row style="font-size: 14px;height: 0px;">
                    <button @click.self="exportCharts" style="color: #3a8ee6;font-weight: 700;border: white;font-size: 16px">导出为word</button>
                    <vue-line :data="chartData"
                              :extend="chartExtend"
                              :after-set-option="afterSetOption">
                    </vue-line>
                </el-row>

            </el-aside>
            <el-container>
                <el-main>
                    <!--                    <div style="font-size: 14px;height: 0px;">-->
                    <!--                        <vue-line :data="chartData"-->
                    <!--                                  :extend="chartExtend"-->
                    <!--                                  :after-set-option="afterSetOption">-->
                    <!--                        </vue-line>-->
                    <!--                        <button @click.self="exportCharts" style="color: #3a8ee6;font-weight: 700;border: white;margin-right: 7800px">导出为word</button>-->
                    <!--                    </div>-->

                    <!--                    个人信息-->
                    <div class="bh-col-md-12 bh-form-groupname borderLeft bh-mb-24" style="text-align: left;" title="基本信息">基本信息</div>
                    <table class="infoTable bh-mb-36" v-if="answer_show" >
                        <!--                        <table class="bh-form-block bh-mb-36" bh-role-form-outline = "container" style="margin-left: 12px;margin-bottom: 36px" v-if="table_show" >-->
                        <!--                            <div class="bh-form-group bh-col-md-4">-->
                        <!--                                <label class="bh-form-label bh-mb-36">学号</label>-->
                        <!--                                <div class="bh-form-readonly-input">-->
                        <!--                                    <p class="bh-form-static bh-ph-8">-->
                        <!--                                        {{ tableData[0].stuNumber }}-->
                        <!--                                    </p>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <tr>
                            <td class="column bh-mb-36">学号</td>
                            <td style="color: #606266">{{ tableData[0].stuNumber }}</td>
                            <td class="column bh-mb-36">姓名</td>
                            <td style="color: #606266">{{ tableData[0].stuName }}</td>
                        </tr>
                        <tr>
                            <td class="column bh-mb-36">性别</td>
                            <td style="color: #606266">{{ tableData[0].stuSex }}</td>
                            <td class="column bh-mb-36">家庭住址</td>
                            <td style="color: #606266">{{ tableData[0].stuAddress }}</td>
                        </tr>
                        <tr>
                            <td class="column bh-mb-36">民族</td>
                            <td style="color: #606266">{{ tableData[0].stuNation }}</td>
                            <td class="column bh-mb-36">政治面貌</td>
                            <td style="color: #606266">{{ tableData[0].stuFeature }}</td>
                        </tr>
                    </table>
                    <!--                    </div>-->
                    <div style="height: 35px"></div>

                    <!--                    学籍信息-->
                    <div class="bh-col-md-12 bh-form-groupname borderLeft bh-mb-24" style="text-align: left;" title="学籍信息">学籍信息</div>
                    <table class="infoTable" v-if="table_show">
                        <tr>
                            <td class="column bh-mb-36">入学时间</td>
                            <td style="color: #606266">{{ tableData[0].stuInDate }}</td>
                            <td class="column bh-mb-36">预计离校时间</td>
                            <td style="color: #606266">{{ tableData[0].stuOutDate }}</td>
                        </tr>
                        <tr>
                            <td class="column bh-mb-36">学生类型</td>
                            <td style="color: #606266">{{ tableData[0].stuType }}</td>
                            <td class="column bh-mb-36">总学分</td>
                            <td style="color: #606266">{{ tableData[0].stuCredit }}</td>
                        </tr>
                        <tr>
                            <td class="column bh-mb-36">学籍状态</td>
                            <td v-if="tableData[0].stuStatus = 1" style="color: #606266">正常</td>
                            <td v-if="tableData[0].stuStatus = 0" style="color: #606266">异常</td>
                            <td class="column bh-mb-36" style="color: #606266">学院</td>
                            <td style="color: #606266">{{ tableData[0].stuDept }}</td>
                        </tr>
                        <tr>
                            <td class="column bh-mb-36">班级</td>
                            <td style="color: #606266">{{ tableData[0].stuClass }}</td>
                            <td class="column bh-mb-36">专业</td>
                            <td style="color: #606266">{{ tableData[0].stuSpecialty }}</td>
                        </tr>
                    </table>
                    <div style="height: 35px"></div>

                    <!--                    联系信息-->
                    <div class="bh-col-md-12 bh-form-groupname borderLeft bh-mb-24" style="text-align: left;" title="联系信息">联系信息</div>
                    <table class="infoTable" v-if="table_show">
                        <tr>
                            <td class="column bh-mb-36">邮箱</td>
                            <td style="color: #606266">{{ tableData[0].stuContact }}</td>
                            <td class="column bh-mb-36">电话号码</td>
                            <td style="color: #606266">{{ tableData[0].stuPhoneNumber }}</td>
                        </tr>
                    </table>
                </el-main>
            </el-container>

        </el-container>

    </div>
    <!--    </div>-->
</template>

<script>
    //引入axios
    import axios from 'axios'

    //引入打印
    // import printJS from 'print-js'

    import { saveAs } from 'file-saver'//
    import PizZip from 'pizzip'//
    import PizZipUtils from "pizzip/utils"//
    import docxtemplater from "docxtemplater"//
    // let ImageModule = require('docxtemplater-image-module-free');
    import ImageModule from "docxtemplater-image-module-free"
    // import echarts from "echarts"
    // import VCharts from "v-charts"
    import VeLine from 'v-charts/lib/line.common'

    export default{
        name: "user_info",
        data() {
            return {
                show3: true,

                reverse: true,
                activities: [{
                    content: '',
                }, {
                    content: '',
                }, {
                    content: '',
                }, {
                    content: '',
                }, {
                    content: '',
                }],

                chartData: {
                    columns: ['月份', '工作量'],
                    rows: [
                        { '月份': '4月', '工作量': 2 },
                    ]
                },

                reportData: {
                    "stuName":"",
                    "stuNumber":"",
                    "stuSex":"",
                    "stuNation":"",
                    "stuDept":"",
                    "stuSpecialty":"",
                    "stuClass":"",
                    "stuStatus":"",
                    "stuFeature":"",
                    "stuAddress":"",
                    "stuType":"",
                    "stuCredit":"",
                    "stuInDate":"",
                    "stuOutDate":"",
                    "stuContact":"",
                    "stuPhoneNumber":"",

                    "libStatus":"",
                    "cardStatus":"",
                    "financeStatus":"",
                    "dormStatus":"",
                    "eduStatus":"",
                },

                base64DataURL: "",
                chartExtend: {
                    animation: false
                },


                answer_show: true,
                len: '',
                tableData: [],
                tableData2: [],
                // tableData: [],

                dialogFormVisible: false,
                formLabelWidth: '120px',
                messageForm: {},//在表单中填写的数据会存放在这个对象中
            };
        },

        components: {
            "vue-line": VeLine
        },

        computed: {
            // rowCount: function () {
            //     return Math.ceil(this.tableD.length/3)
            // }
        },
        created() {
            // this.styleObject = this.tableStyle;
            this.getData1();
            this.getData2();
        },

        methods: {
            afterSetOption: function (chartObj) {
                this.base64DataURL = chartObj.getDataURL();
            },

            base64DataURLToArrayBuffer: function (dataURL) {
                const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
                if (!base64Regex.test(dataURL)) {
                    return false;
                }
                const stringBase64 = dataURL.replace(base64Regex, "");
                let binaryString;
                if (typeof window !== "undefined") {
                    binaryString = window.atob(stringBase64);
                } else {
                    binaryString = new Buffer(stringBase64, "base64").toString("binary");
                }
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    const ascii = binaryString.charCodeAt(i);
                    bytes[i] = ascii;
                }
                return bytes.buffer;
            },
            exportCharts: function () {
                const ___this = this;
                PizZipUtils.getBinaryContent("离校表单.docx", function (error, content) {
                    if (error) {
                        throw error;
                    }
                    let opts = {}
                    opts.centered = true;
                    opts.getImage = function (chartURL) {
                        return ___this.base64DataURLToArrayBuffer(chartURL);
                    }

                    opts.getSize = function () {
                        return [600, 300];
                    }
                    let imageModule = new ImageModule(opts);
                    let zip = new PizZip(content);
                    let doc = new docxtemplater();
                    doc.attachModule(imageModule);
                    doc.loadZip(zip);

                    doc.setData({
                        "chart-pic": ___this.base64DataURL, // v-chart图表数据
                        ...___this.reportData
                    });

                    try {
                        doc.render(); // 渲染文档
                    } catch (error) {
                        console.log(error);
                    }
                    let out = doc.getZip().generate({
                        type: "blob",
                        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    saveAs(out, "离校表单.docx"); // 导出文件，给定文件名
                });
            },


            getData1() {
                axios.get('student/details').then(res => {
                    // console.log(res.data);
                    if (res.data.code === 20000){
                        this.tableData = res.data.data
                        this.reportData.stuName = this.tableData[0].stuName
                        this.reportData.stuNumber = this.tableData[0].stuNumber
                        this.reportData.stuSex = this.tableData[0].stuSex
                        this.reportData.stuNation = this.tableData[0].stuNation
                        this.reportData.stuDept = this.tableData[0].stuDept
                        this.reportData.stuSpecialty = this.tableData[0].stuSpecialty
                        this.reportData.stuClass = this.tableData[0].stuClass
                        // this.reportData.stuStatus = this.tableData[0].stuStatus
                        if (this.tableData[0].stuStatus == '1') {
                            this.reportData.stuStatus = "正常"
                        }
                        if (this.tableData[0].stuStatus == '0') {
                            this.reportData.stuStatus = "异常"
                        }
                        this.reportData.stuFeature = this.tableData[0].stuFeature
                        this.reportData.stuAddress = this.tableData[0].stuAddress
                        this.reportData.stuType = this.tableData[0].stuType
                        this.reportData.stuCredit = this.tableData[0].stuCredit
                        this.reportData.stuInDate = this.tableData[0].stuInDate
                        this.reportData.stuOutDate = this.tableData[0].stuOutDate
                        this.reportData.stuContact = this.tableData[0].stuContact
                        this.reportData.stuPhoneNumber = this.tableData[0].stuPhoneNumber

                        console.log(this.tableData);
                        this.len = Object.keys(this.tableData[0]).length;
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

            getData2() {
                //get方法
                axios.get('student/process')
                    .then(res => {
                        console.log('2')
                        console.log(res.data);
                        if (res.data.code === 20000) {
                            // this.num = 0; //通过总数
                            this.tableData2 = res.data.data;

                            if (this.tableData2[0].libStatus == '1') {
                                this.reportData.libStatus = "已通过"
                                this.activities[0].content = '图书馆审核已通过'
                            }
                            if (this.tableData2[0].libStatus == '0') {
                                this.reportData.libStatus = "未通过"
                                this.activities[0].content = '图书馆审核未通过'
                            }//

                            if (this.tableData2[0].cardStatus == '1') {
                                this.reportData.cardStatus = "已通过"
                                this.activities[1].content = '一卡通审核已通过'
                            }
                            if (this.tableData2[0].cardStatus == '0') {
                                this.reportData.cardStatus = "未通过"
                                this.activities[1].content = '一卡通审核未通过'
                            }//

                            if (this.tableData2[0].dormStatus == '1') {
                                this.reportData.dormStatus = "已通过"
                                this.activities[2].content = '后勤处审核已通过'
                            }
                            if (this.tableData2[0].dormStatus == '0') {
                                this.reportData.dormStatus = "未通过"
                                this.activities[2].content = '后勤处审核未通过'
                            }//

                            if (this.tableData2[0].financeStatus == '1') {
                                this.reportData.financeStatus = "已通过"
                                this.activities[3].content = '财务处审核已通过'
                            }
                            if (this.tableData2[0].financeStatus == '0') {
                                this.reportData.financeStatus = "未通过"
                                this.activities[3].content = '财务处审核未通过'
                            }//

                            if (this.tableData2[0].eduStatus == '1') {
                                this.reportData.eduStatus = "已通过"
                                this.activities[4].content = '教务处审核已通过'
                            }
                            if (this.tableData2[0].eduStatus == '0') {
                                this.reportData.eduStatus = "未通过"
                                this.activities[4].content = '教务处审核未通过'
                            }//

                        }
                    })
            },
        }
    }
</script>

<style>
    /*点击扩展*/
    .transition-box {
        margin-bottom: 200px;
        margin-left: 0px;
        /*margin-top: 0px;*/
        width: 180px;
        height: 550px;
        border-radius: 4px;
        /*background-color: #409EFF;*/
        background-color: white;
        text-align: left;
        color: #fff;
        padding: 30px 20px;
        box-sizing: border-box;
        /*margin-right: 20px;*/
    }

    .el-timeline {
        margin-top: 20px;
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
        width: 180px;
        height: 1000px;
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
