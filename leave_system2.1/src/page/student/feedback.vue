<template xmlns:div="http://www.w3.org/1999/html">
    <div>
        <div class="content-title-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/student' }">学生功能</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/student/feedback' }">问题反馈</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

        <el-table
                ref="filterTable"
                :data="tableData"
                style="width: 100%">
            <el-table-column width="100"><el-checkbox v-model="checked"></el-checkbox></el-table-column>
            <el-table-column
                    prop="response"
                    label="回复"
                    align="center"
                    sortable
                    width="180"
                    column-key="response"
                    :filters="[{text: '已回复', value: '已回复'}, {text: '未回复', value: '未回复'}]"
                    :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="标题"
                    align="center"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="内容"
                    align="center"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="num"
                    label="回复条数"
                    align="center"
                    width="100"
                    :formatter="formatter">
            </el-table-column>
            <el-table-column
                    prop="massage"
                    label="最新消息"
                    align="center"
                    :formatter="formatter">
            </el-table-column>

            <el-table-column
                prop="button"
                label="操作"
                align="center"
                :formatter="formatter">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <a>新增问题：</a>
        <div class="container">

        <el-form ref="form1" :model="form1" label-width="80px">
            <el-form-item label="标题">
            <el-input type="text"
                      placeholder="请输入内容"
                      v-model="form1.name"
                      maxlength="10"
                      show-word-limit></el-input>
        </el-form-item>
            <el-form-item label="内容">
            <el-input type="textarea" :autosize="{ minRows: 8.5}" v-model="form1.desc"></el-input>
            </el-form-item>
            <el-form-item>
            <el-popover
                    trigger="click"
                    content="提交成功">
            <el-button  slot="reference" type="primary" @click="onSubmit" >提交</el-button>
            </el-popover>
            <el-button type="info" >取消</el-button>
            </el-form-item>
        </el-form>
        </div>
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" :autosize="{ minRows: 4.5}" v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        </div>
</template>

<script>
    export default {
        data() {
            return{
                tableData: [{
                    response: '已回复',
                    name: '一卡通注销步骤',
                    content:'111',
                    num: '2',
                    massage: '管理员1【2022-07-04 12:00:00】'
                }, {
                    response: '已回复',
                    name: '一卡通注销步骤',
                    content:'111',
                    num: '2',
                    massage: '管理员2【2022-07-04 12:00:00】'
                }, {
                    response: '未回复',
                    name: '一卡通注销步骤',
                    content:'111',
                    num: '0',
                    massage: ''
                }, {
                    response: '未回复',
                    name: '一卡通注销步骤',
                    content:'111',
                    num: '0',
                    massage: ''
                }],
                form:{},
                form1:{}
            }
        },
        methods: {
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            // formatter(row, column) {
            //     return row.address;
            // },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
                // eslint-disable-next-line no-unused-vars
            }, handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
        }
    }
</script>

<style scoped>
    .content-table{
        position: center;
    }
    .red {
        color: #ff0000;
    }
    .blue{
        color: #3e9af0;
    }
</style>
