<template>
<div>
<!-- 这里只演示导出，导入也差不多 -->
<!-- <el-button class="el-icon-upload" type="success">导入</el-button> -->
    <el-button class="el-icon-download" type="success" @click="exportExcel()">导出</el-button>
    </div>
    </template>
    <script>
export default {
    name: "importandexport",
    data() {
        return {
            extp: this.exportExceltype,
        };
    },
    props: ["exportExceltype"],//父组件向子传递过来的值，用于判断是那个组件过来的
    methods: {
        exportExcel() {
            // eslint-disable-next-line no-unused-vars
            const extpurl = ""; //导出请求地址
            //这里就是判断来自哪个父组件，从而发送不同的请求路径
            if (this.extp == "finance") {
                this.extpurl = "/sector/finance/export";
            } else if (this.extp == "card") {
                this.extpurl = "/sector/card/export";
            }else if (this.extp == "dorm") {
                this.extpurl = "/sector/dorm/export";
            }else if (this.extp == "library") {
                this.extpurl = "/sector/library/export";
            }else if (this.extp == "office") {
                this.extpurl = "/sector/edu/export";
            }

            this.$axios
                .get(this.extpurl, { responseType: "blob" })
                .then((res) => {
                    const blob = new Blob([res.data], { //取响应回来的数据
                        type: "application/vnd.ms-excel;charset=utf-8",
                    });
                    const href = window.URL.createObjectURL(blob); // 创建下载的链接
                    const downloadElement = document.createElement("a");
                    downloadElement.href = href;
                    downloadElement.download = decodeURI(res.headers["filename"]);
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); // 点击下载
                    document.body.removeChild(downloadElement); // 下载完成移除元素
                    window.URL.revokeObjectURL(href); // 释放掉blob对象
                })
                .catch((fail) => {
                    console.error(fail);
                });
        },
    },
};
</script>
<style scoped>
</style>
