<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="新建公告" name="first"><div>
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


                        <!--                    <el-form-item label="公告内容">-->
                        <!--                        <el-input type="textarea" rows="5" v-model="form.content"></el-input>-->
                        <!--                    </el-form-item>-->
                        <!--                        <span style="font-size: 15px;margin: 10px;color: rgba(23,31,41,0.5)">正文内容</span>-->
                        <el-form-item label="正文内容">
                            <!--                            <el-input v-model="form.title"></el-input>-->
                            <div class="mavonEditor">
                                <no-ssr>
                                    <mavon-editor :toolbars="markdownOption"
                                                  @imgAdd="imgAdd"
                                                  @imgDel="handleEditorImgDel"
                                                  v-model="form.content"/>
                                </no-ssr>
                            </div>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div></el-tab-pane>
        <el-tab-pane label="添加备注" name="third">
            <el-card>
                <el-form ref="form" :model="form">
                    <el-form-item label="">
                        <!--                <el-input v-model="form.remark"></el-input>-->

                        <div class="mavonEditor">
                            <no-ssr>
                                <mavon-editor :toolbars="markdownOption" v-model="form.remark"/>
                            </no-ssr>
                        </div>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="添加附件" name="second"><div>
            <!--            <el-divider></el-divider>-->
            <!--            <span class="f4">添加附件</span>-->
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
        </el-tab-pane>

        <!--        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
    </el-tabs>

</template>

<script>
    import teacher from "../../api/edu/teacher";
    export default {
        name: 'baseform',
        data() {
            return {
                form: {
                },
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: false, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
                activeName: 'first'
                // markdownOption: {
                //     bold: true, // 粗体
                //     // 更多配置
                // },

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
    .mavonEditor {
        width: 100%;
        height: 100%;
    }
</style>
