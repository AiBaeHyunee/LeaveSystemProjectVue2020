<template>
    <div id="app">
        <div id="ecard" style="width: 600px;height:400px;"></div>
    </div>
</template>
<script>
    export default {
        name: "echartcard",
        methods: {
            drawChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("ecard"));
                var option = {
                    title: {
                        text: '一卡通消费'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['食堂', '超市']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '食堂',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [300, 260, 400, 390, 560, 400, 460]
                        },

                        {
                            name: '超市',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {},
                            data: [100, 200, 150, 30, 90, 80, 62]
                        }
                    ]
                };
                myChart.setOption(option);
            },
        },
        mounted(){
            this.drawChart();
        }
    };

</script>

<style scoped>

</style>
