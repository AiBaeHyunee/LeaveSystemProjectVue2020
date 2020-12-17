<template>
    <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>
            <i class="el-icon-lx-calendar"></i> 管理员界面
        </el-breadcrumb-item>
        <el-breadcrumb-item>新建公告</el-breadcrumb-item>
    </el-breadcrumb>
        <el-card>
        <div class="crumbs">

        </div>
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="公告标题">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>


                    <el-form-item label="公告内容">
                        <el-input type="textarea" rows="5" v-model="form.content"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="是否置顶">-->
<!--                        <el-radio-group v-model="form.resource">-->
<!--                            <el-radio label="是"></el-radio>-->
<!--                            <el-radio label="否"></el-radio>-->
<!--                        </el-radio-group>-->
<!--                    </el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-divider></el-divider>
        <span class="f4">添加附件</span>
        <el-card>
            <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文件类型">
                <el-select v-model="form.region" placeholder="请选择文件类型">
                    <el-option key="bbk" label="文档文件" value="bbk"></el-option>
                    <el-option key="xtc" label="压缩文件" value="xtc"></el-option>
                    <el-option key="imoo" label="图片文件" value="imoo"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传文件">
                <el-upload
                        class="upload-demo"
                        drag
                        action="http://jsonplaceholder.typicode.com/api/posts/"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import teacher from "../api/edu/teacher";
    export default {
        name: 'baseform',
        data() {
            return {
                form: {
                }
            };
        },
        methods: {
            onSubmit() {
                console.log(this.form)
                teacher.addNotice(this.form)
                    .then(response => {//添加成功
                        //提示信息
                        this.$message.success('提交成功！');
                        console.log(response);
                    })


            }
        }
    };
</script>
<style>
    .f4{
        font-size:20px;
    }
</style>
