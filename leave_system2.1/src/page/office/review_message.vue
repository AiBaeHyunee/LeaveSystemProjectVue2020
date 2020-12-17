<template>
    <div class="DemoMap">
        <div class="search">
            <el-input
                    v-model="searchData"
                    placeholder="请输入要查询地区"
                    style="width: 20rem"
            >
            </el-input>
            <el-button
                    circle
                    icon="el-icon-search"
                    type="primary"
                    @click="getData"
            ></el-button>
            <el-button type="primary" round @click="toTestMap">实战</el-button>
        </div>
        <div class="map">
            <div class="china-Map" id="chinaMap"></div>
        </div>
    </div>
</template>


<script>
    // import "../static/js/china";

    import "../../utils/china.js"
    export default {
        mounted() {
            this.drawMap();
        },
        data() {
            return {
                searchData: "",
                token: "XrYRC2llGdVVkr0ZvRmjzvy0N9tEcCU1",
                local: {},
                addressData: [],
            };
        },
        methods: {
            getData() {
                var url =
                    "/v3/?address=" + this.searchData + "&output=json&ak=" + this.token;
                this.$axios
                    .get(url)
                    .then((response) => {
                        console.log(response);
                        this.$message.success("获取信息成功");
                        this.local = response.data.result.location;
                        this.addressData.push({
                            name: this.searchData,
                            value: [this.local.lng, this.local.lat],
                        });
                        this.drawMap();
                    })
                    .catch((error) => {
                        this.$message.error("接口出错");
                        console.log(error);
                    });
            },
            drawMap() {
                var myChart = this.$echarts.init(document.getElementById("chinaMap"));
                var options = {
                    backgroundColor: "#404a59",
                    //标题组件
                    title: {
                        text: "样例地址搜索",
                        left: "center",
                        top: "4%",
                        textStyle: {
                            color: "#fff",
                        },
                    },
                    //工具箱组件
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                show: true,
                            },
                        },
                    },
                    //提示框组件
                    tooltip: {
                        //触发类型
                        trigger: "item",
                    },
                    //地理坐标系组件
                    geo: {
                        //地图类型
                        map: "china",
                        //图形上的文本标签，可用于说明图形的一些数据信息，比如值、名称
                        label: {
                            emphasis: {
                                //是否在高亮状态下显示标签。
                                show: false,
                            },
                        },
                        //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                        roam: true,
                        //地图区域的多边形 图形样式
                        itemStyle: {
                            normal: {
                                areaColor: "#fff",
                                borderColor: "#111",
                            },
                            emphasis: {
                                areaColor: "#E6A23C",
                            },
                        },
                    },
                    //系列列表
                    series: [
                        {
                            //系列名称，用于tooltip的显示
                            name: "地址",
                            //散点（气泡）图
                            type: "scatter",
                            //该系列使用的坐标系
                            coordinateSystem: "geo",
                            //系列中的数据内容数组。数组项通常为具体的数据项
                            data: this.addressData,
                            //标记图形的大小
                            // symbolSize: function (val) {
                            //     return 10;
                            // },
                        },
                    ],
                };
                myChart.setOption(options);
            },
            toTestMap(){
                this.$router.push('/testmap');
            }
        },
    };
</script>

<!--<style lang = "less" scoped>-->
<!--    .DemoMap {-->
<!--        display: flex;-->
<!--        flex-direction: column;-->
<!--        justify-content: center;-->
<!--        width: 70rem;-->
<!--        border-radius: 0.5rem;-->
<!--        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, 0.04);-->
<!--        .search {-->
<!--            display: flex;-->
<!--            justify-content: center;-->
<!--            width: 100%;-->
<!--            margin-top: 2rem;-->
<!--            /deep/.el-button {-->
<!--                margin-left: 2rem;-->
<!--            }-->
<!--        }-->
<!--        .map {-->
<!--            width: 100%;-->
<!--            height: 30rem;-->
<!--            display: flex;-->
<!--            justify-content: center;-->
<!--            align-items: center;-->
<!--            .china-Map {-->
<!--                width: 95%;-->
<!--                height: 95%;-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</style>-->
