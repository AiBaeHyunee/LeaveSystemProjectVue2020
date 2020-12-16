<template>
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >图书馆</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/library/statistical_data' }">统计数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div >
            <el-row :gutter="45">
                <el-col span="5" offset="1">
                    <el-card style="width:250px; height: 140px;">
                        <p slot="title">今日访客</p>
                        <p><span class="card-big-font">2,803</span></p>
                        <p style="font-size: 14px;padding-top: 10px;">
                            总访客
                            <span class="card-span-color"><span>2万</span>
                        <icon type="ios-flag" /></span>
                        </p>
                    </el-card>
                </el-col>

                <el-col :span="13" offset="1">
                    <el-card shadow="hover" style="width:700px;height:500px;">
                        <div class="schart-box">
                            <div class="content-title">借还情况</div>
                            <schart class="schart" canvasId="bar" :options="options1"></schart>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="5">
                    <el-card shadow="hover" style="width:700px;height:500px;">
                   <div class="schart-box">
                       <div class="content-title">借阅趋势</div>
                       <schart class="schart" canvasId="line" :options="options2"></schart>
                   </div>
                    </el-card>
                </el-col>

                <el-col :span="1" offset="8">
                    <el-card shadow="hover" style="width:700px;height:500px;">
                    <div class="schart-box">
                        <div class="content-title">借阅种类</div>
                        <schart class="schart" canvasId="pie" :options="options3"></schart>
                    </div>
                </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        name: 'basecharts',
        components: {
            Schart
        },
        data() {
            return {
                options1: {
                    type: 'bar',
                    title: {
                        text: '最近一周书籍借还情况'
                    },
                    bgColor: '#fbfbfb',
                    labels: ['周一', '周二', '周三', '周四', '周五'],
                    datasets: [
                        {
                            label: '已借',
                            fillColor: 'rgba(241, 49, 74, 0.5)',
                            data: [234, 278, 270, 190, 230]
                        },
                        {
                            label: '已还',
                            data: [164, 178, 190, 135, 160]
                        },
                    ]
                },
                options2: {
                    type: 'line',
                    title: {
                        text: '最近几个月书籍借阅趋势图'
                    },
                    bgColor: '#fbfbfb',
                    labels: ['6月', '7月', '8月', '9月', '10月'],
                    datasets: [
                        {
                            label: '已借',
                            data: [234, 278, 270, 190, 230]
                        },
                        {
                            label: '已还',
                            data: [164, 178, 150, 135, 160]
                        },
                    ]
                },
                options3: {
                    type: 'pie',
                    title: {
                        text: '书籍借阅种类'
                    },
                    legend: {
                        position: 'left'
                    },
                    bgColor: '#fbfbfb',
                    labels: ['外国文学', '中国文学', '漫画类', '艺术类', '历史类', '时政类', '其他'],
                    datasets: [
                        {
                            data: [334, 278, 190, 235, 260, 200, 141]
                        }
                    ]
                },
            };
        }
    };
</script>

<style scoped>
    .schart-box {
        display: inline-block;
        margin-left:10px;
    }
    .schart {
        width: 600px;
        height: 400px;
    }
    .content-title {
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }

</style>
