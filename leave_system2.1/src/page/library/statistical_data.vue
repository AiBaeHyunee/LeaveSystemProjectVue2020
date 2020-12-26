<template>
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >图书馆</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/sector/library/statistical_data' }">统计数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-row>
                <el-col :span="10" offset="1">
                    <ebook></ebook>
                </el-col>
                <el-col :span="13" >
                    <el-card>
                        <elib></elib>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="13" offset="1">
                    <el-card shadow="hover" style="width:700px;height:500px;">
                        <div class="schart-box">
                            <div class="content-title">借还情况</div>
                            <schart class="schart" canvasId="bar" :options="options1"></schart>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="4">
                    <el-card shadow="hover" style="width:700px;height:500px;">
                        <div class="schart-box">
                            <div class="content-title">借阅趋势</div>
                            <schart class="schart" canvasId="line" :options="options2"></schart>
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
