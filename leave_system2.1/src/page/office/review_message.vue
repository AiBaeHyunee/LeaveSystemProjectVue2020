<template>
        <div id="app">
            <div id="main" style="width: 600px;height:400px;"></div>
        </div>
</template>
<script>
    import "../../utils/china.js";
    export default {
        name: "app",
        methods: {
        drawChart() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById("main"));

            var geoCoordMap = {
                '黑龙江': [127.9688, 45.368,15],
                '内蒙古': [110.3467, 41.4899,16],
                "吉林": [125.8154, 44.2584,17],
                '北京': [116.4551, 40.2539,100],
                "辽宁": [123.1238, 42.1216,19],
                "河北": [114.4995, 38.1006,20],
                "天津": [117.4219, 39.4189,14],
                "山西": [112.3352, 37.9413,13],
                "陕西": [109.1162, 34.2004,12],
                "甘肃": [103.5901, 36.3043,11],
                "宁夏": [106.3586, 38.1775,10],
                "青海": [101.4038, 36.8207,9],
                "新疆": [87.9236, 43.5883,8],
                "西藏": [91.11, 29.97,7],
                "四川": [103.9526, 30.7617,666],
                "重庆": [108.3843, 30.4397,56],
                "山东": [117.1582, 36.8701,21],
                "河南": [113.4668, 34.6234,6],
                "江苏": [118.8062, 31.9208,22],
                "安徽": [117.29, 32.0581,5],
                "湖北": [114.3896, 30.6628,23],
                "浙江": [119.5313, 29.8773,24],
                "福建": [119.4543, 25.9222,25],
                "江西": [116.0046, 28.6633,4],
                "湖南": [113.0823, 28.2568,26],
                "贵州": [106.6992, 26.7682,27],
                "云南": [102.9199, 25.4663,28],
                "广东": [113.1224, 23.0095,29],
                "广西": [108.479, 23.1152,3],
                "海南": [110.3893, 19.8516,30],
                '上海': [121.4648, 31.2891,200],
                '台湾': [121.5651, 25.0377,2],
                '香港': [114.1466, 22.2701,1],
                '澳门': [113.5495, 22.1918,0]
            };

            var BJData = [
                [{
                    name: '四川'
                }, {
                    name: '四川',
                    value: 0
                }],
                [{
                    name: '四川'
                }, {
                    name: '上海',
                    value: 8
                }],
                [{
                    name: '四川'
                }, {
                    name: '重庆',
                    value: 5
                }],
                [{
                    name: '四川'
                }, {
                    name: '黑龙江',
                    value: 1
                }],
                [{
                    name: '四川'
                }, {
                    name: '内蒙古',
                    value: 1
                }],
                [{
                    name: '四川'
                }, {
                    name: '吉林',
                    value: 2
                }],
                [{
                    name: '四川'
                }, {
                    name: '陕西',
                    value: 2
                }],
                [{
                    name: '四川'
                }, {
                    name: '宁夏',
                    value: 2
                }],
                [{
                    name: '四川'
                }, {
                    name: '辽宁',
                    value: 1
                }],
                [{
                    name: '四川'
                }, {
                    name: '山西',
                    value: 1
                }],
                [{
                    name: '四川'
                }, {
                    name: '青海',
                    value: 2
                }],
                [{
                    name: '四川'
                }, {
                    name: '新疆',
                    value: 1
                }],
                [{
                    name: '四川'
                }, {
                    name: '西藏',
                    value: 1
                }],

                [{
                    name: '四川'
                }, {
                    name: '山东',
                    value: 3
                }],
                [{
                    name: '四川'
                }, {
                    name: '河南',
                    value: 3
                }],
                [{
                    name: '四川'
                }, {
                    name: '江苏',
                    value: 3
                }],
                [{
                    name: '四川'
                }, {
                    name: '安徽',
                    value: 3
                }],
                [{
                    name: '四川'
                }, {
                    name: '湖北',
                    value: 3
                }],
                [{
                    name: '四川'
                }, {
                    name: '浙江',
                    value: 4
                }],
                [{
                    name: '四川'
                }, {
                    name: '福建',
                    value: 4
                }],
                [{
                    name: '四川'
                }, {
                    name: '江西',
                    value: 3
                }],
                [{
                    name: '四川'
                }, {
                    name: '湖南',
                    value: 3
                }],
                [{
                    name: '四川'
                }, {
                    name: '贵州',
                    value: 2
                }],
                [{
                    name: '四川'
                }, {
                    name: '云南',
                    value: 2
                }],
                [{
                    name: '四川'
                }, {
                    name: '广东',
                    value: 4
                }],
                [{
                    name: '四川'
                }, {
                    name: '广西',
                    value: 2
                }],
                [{
                    name: '四川'
                }, {
                    name: '海南',
                    value: 2
                }],
                [{
                    name: '四川'
                }, {
                    name: '台湾',
                    value: 1
                }],
                [{
                    name: '四川'
                }, {
                    name: '香港',
                    value: 1
                }],
                [{
                    name: '四川'
                }, {
                    name: '澳门',
                    value: 1
                }],
                [{
                    name: '四川'
                }, {
                    name: '天津',
                    value: 5
                }],
                [{
                    name: '四川'
                }, {
                    name: '河北',
                    value: 1
                }],
                [{
                    name: '四川'
                }, {
                    name: '甘肃',
                    value: 2
                }],
                [{
                    name: '四川'
                }, {
                    name: '北京',
                    value: 8
                }]
            ];



            var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

            var convertData2 = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoCoordMap[dataItem[0].name];
                    var toCoord = geoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord,
                            value: dataItem[1].value
                        }, {
                            coord: toCoord
                        }]);
                    }
                }
                return res;
            };

            var color = ['#a6c84c', ];
            var series = [];
            [
                ['四川', BJData]
            ].forEach(function(item, i) {
                series.push({
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath,
                        symbolSize: 10
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            opacity: 0.3,
                            curveness: 0.3
                        }
                    },
                    data: convertData2(item[1])
                }, {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        period: 5, //动画时间，值越小速度越快
                        brushType: 'stroke', //波纹绘制方式 stroke, fill
                        scale: 3 //波纹圆环最大限制，值越大波纹越大
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right', //显示位置
                            offset: [5, 0], //偏移设置
                            formatter: function(params) { //圆环显示文字
                                return params.data.name;
                            },
                            fontSize: 13
                        }
                    },
                    symbol: 'circle',
                    // eslint-disable-next-line no-unused-vars
                    symbolSize: function(val) {
                        return 10;
                    },
                    itemStyle: {
                        normal: {
                            show: true,
                            color: color[i]
                        }
                    },
                    data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                        };
                    })
                }, {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        period: 4,
                        brushType: 'stroke',
                        scale: 4
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            //offset:[5, 0],
                            color: '#0f0',
                            formatter: '{b}',
                            textStyle: {
                                color: '#f00'
                            }
                        },
                        emphasis: {
                            show: true,
                            color: "#f60"
                        }
                    },
                    symbol: 'pin',
                    symbolSize: 50,
                    data: [{
                        name: item[0],
                        value: geoCoordMap[item[0]].concat([83]),
                    }],
                });
            });


            var option = {
                backgroundColor: '#ffffff',
                title: {
                    text: '离校人员去向',
                    left: '1%',
                    top: '6%',
                    textStyle: {
                        color: '#102657'
                    }
                },
                tooltip: {
                    // trigger: 'item'
                    trigger: 'item',
                    backgroundColor: 'rgba(166, 200, 76, 0.82)',
                    borderColor: '#FFFFCC',
                    showDelay: 0,
                    hideDelay: 0,
                    enterable: true,
                    transitionDuration: 0,
                    extraCssText: 'z-index:100',
                    // eslint-disable-next-line no-unused-vars
                    formatter: function (params, ticket, callback) {
                        //根据业务自己拓展要显示的内容
                        if (params.seriesType == "effectScatter") {
                            return "地点：" + params.data.name +
                                '<br/>' + "离校总人数：" + params.data.value[2];
                        } else if (params.seriesType == "lines") {
                            return "当前目的地离校占比：" + params.data.value;
                        }
                        var res = "";
                        // var name = params.name;
                        var name = "四川师范大学";
                        var number = "461";
                        // eslint-disable-next-line no-unused-vars
                        const value = params.value[params.seriesIndex + 1];
                        res = "<span style='color:#fff;'> 出发地:" + name + "</span><br/>当前未离校人数:" + number;
                        return res;
                    }
                },
                legend: {
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    textStyle: {
                        color: '#47b9f2'
                    },
                    selectedMode: 'single'
                },
                visualMap: { //图例值控制
                    min: 0,
                    max: 10,
                    calculable: true,
                    show: true,
                    color: ['#f44336', '#fc9700', '#ffde00', '#3cfc01', '#00eaff'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: false, //是否允许缩放
                    itemStyle: {
                        normal: {
                            color: 'rgba(46, 63, 81, 127)', //地图背景色
                            borderColor: '#516a89', //省市边界线00fcff 516a89
                            borderWidth: 1
                        },
                        emphasis: {
                            color: 'rgba(37, 43, 61, .5)'//悬浮背景
                        }
                    }
                },
                series: series,
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            }
        },
        mounted() {
            this.drawChart();
        }
    };
</script>
<style scoped>

</style>
