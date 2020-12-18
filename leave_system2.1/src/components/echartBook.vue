<template>
    <div id="app">
        <div id="ebook" style="width: 600px;height:400px;"></div>
    </div>
</template>
<script>
    export default {
        name: "echartbook",
        methods: {
            drawChart() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("ebook"));
                var option = {
                    /*  grid: {
                        top: "20%",
                        bottom: "12%"
                      },*/
                    backgroundColor:"#0f375f",
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                            label: {
                                show: true
                            }
                        }
                    },
                    legend: {
                        data: ["占比", "借阅", "归还"],
                        top: "2%",
                        right:'10',
                        textStyle: {
                            color: "rgba(250,250,250,0.6)",
                            fontSize: 16
                        }
                    },
                    xAxis: {
                        data: [
                            "一月",
                            "二月",
                            "三月",
                            "四月",
                            "五月",
                            "六月",
                            "七月",
                            "八月"
                        ],
                        axisLine: {
                            show: true, //隐藏X轴轴线
                            lineStyle: {
                                color: '#26D9FF',
                                width:2
                            }
                        },
                        axisTick: {
                            show: true //隐藏X轴刻度
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "rgba(250,250,250,0.6)", //X轴文字颜色
                                fontSize: 16
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ["rgba(250,250,250,0.1)", "rgba(250,250,250,0)"]
                            }
                        }
                    },
                    yAxis: [{
                        type: "value",
                        /*name: "亿元",*/
                        nameTextStyle: {
                            color: "#ebf8ac",
                            fontSize: 16
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#26D9FF',
                                width:2
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "rgba(250,250,250,0.6)",
                                fontSize: 16
                            }
                        },

                    },
                        {
                            type: "value",
                            /*name: "同比",*/
                            nameTextStyle: {
                                color: "#ebf8ac",
                                fontSize: 16
                            },
                            position: "right",
                            splitLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                formatter: "{value} %", //右侧Y轴文字显示
                                textStyle: {
                                    color: "rgba(250,250,250,0.6)",
                                    fontSize: 16
                                }
                            }
                        }
                    ],
                    series: [{
                        name: "占比",
                        type: "line",
                        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                        smooth: true, //平滑曲线显示
                        showAllSymbol: true, //显示所有图形。
                        symbol: "circle", //标记的图形为实心圆
                        symbolSize: 8, //标记的大小
                        itemStyle: {
                            //折线拐点标志的样式
                            color: "#1045A0",
                            borderColor: "#3D7EEB",
                            width: 2,
                            shadowColor: "#3D7EEB",
                            shadowBlur: 4
                        },
                        lineStyle: {
                            color: "#3D7EEB",
                            width:2,
                            shadowColor: "#3D7EEB",
                            shadowBlur: 4
                        },
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "rgba(61,126,235, 0.5)"
                            },
                                {
                                    offset: 1,
                                    color: "rgba(61,126,235, 0)"
                                }
                            ])
                        },
                        data: [4.2, 3.5, 2.9, 3.8, 5, 3,6.9,2.0]
                    },
                        {
                            name: "借阅",
                            type: "bar",
                            barWidth: 15,
                            itemStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(61,126,235, 1)"
                                    },
                                        {
                                            offset: 1,
                                            color: "rgba(61,126,235, 0)"
                                        }
                                    ]),
                                    borderColor:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: "rgba(160,196,225, 1)"
                                    },
                                        {
                                            offset: 1,
                                            color: "rgba(61,126,235, 1)"
                                        }
                                    ]),
                                    borderWidth: 2
                                }
                            },
                            data: [40, 30, 20, 80, 30, 50,10,10]
                        },
                        {
                            name: "归还",
                            type: "bar",
                            barWidth: 15,
                            itemStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(15,197,243,1)'}, {offset: 1, color: 'rgba(15,197,243,0)'}]),
                                    borderColor:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(180,240,255,1)'}, {offset: 1, color: 'rgba(15,197,243,1)'}]),
                                    borderWidth: 2
                                }
                            },
                            data: [30, 20, 30, 50, 40, 30,130,10]
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
