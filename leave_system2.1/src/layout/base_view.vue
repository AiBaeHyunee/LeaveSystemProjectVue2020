<template>
    <div class="wrapper">
        <el-container>
            <el-header id = "admin-header-box">
                <top-header></top-header>
            </el-header>
            <el-container>
                <el-aside id = "left-menu-list-box"  width="250px">
                    <left-menu></left-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <div class="content-box" :class="{'content-collapse':collapse}">
                            <tags></tags>
                            <div class="content">
                                <transition name="'move'" mode="out-in">
                                    <keep-alive :include="tagsList">
                                        <router-view></router-view>
                                    </keep-alive>
                                </transition>
                                <el-backtop target=".content"></el-backtop>
                            </div>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import topHeader from './top_header.vue';
    import leftMenu from './left_menu.vue';
    import tags from './tags.vue';
    // import cookie from 'js-cookie';
    // import {routes} from '../router';
    import bus from '../components/common/bus';
    export default {
        data() {
            return {
                tagsList: [],
                collapse: false
            };
        },
        components: {
            topHeader,
            leftMenu,
            tags
        },
        created() {
            bus.$on('collapse-content', msg => {
                this.collapse = msg;
            });

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            });
        },

    };
</script>
<style>
    #left-menu-list-box.leftMenu{
        border-right: none;
    }

    .el-header,.el-footer{
        background-color:#102657;
        color:#ffff;
        line-height: 70px;
        height: 70px !important;
    }
    .el-aside{
        /*border-right: solid 1px #102657;*/
        background-color:#324157;
        line-height: 200px;
        height: 100%;
    }
    .el-main{
        padding: 0;
    }
</style>
