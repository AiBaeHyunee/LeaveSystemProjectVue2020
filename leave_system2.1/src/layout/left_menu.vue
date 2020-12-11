<template>
    <div class="sidebar">
            <el-menu
                     unique-opened
                     class="el-menu-vertical"
                     :collapse="collapse"
                     :collapse-transition="false"
                     router
                     :default-active="activePath"
                     background-color="#324157"
                     text-color="#bfcbd9"
                     active-text-color="#20a0ff"
                     >
                <!-- 一级菜单  -->
                <template v-for="item in List">
                    <el-menu-item v-if="(item.children==0)&&!item.hidden" :index="item.url" :key="item.id" @click="saveNavState('/' + item.url)">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{ item.name}}</span>
                        </template>
                    </el-menu-item>
                <el-submenu v-if="(item.children!=0)&&!item.hidden" :index="item.id+''" :key="item.id" >
                    <!-- 一级菜单的模板区域 -->
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{ item.name}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item :index="subItem.url" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' +subItem.url)">
                        <!-- 导航开启路由模式：
                          将index值作为导航路由 -->
                        <!-- 二级菜单的模板区域 -->
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{ subItem.name}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>

                </template>
            </el-menu>
    </div>

</template>
<script>
    import bus from '../components/common/bus';
    import menu from '@/api/edu/menu';
    // import {routes} from '../router';
    export default {
        data(){
            return{
                collapse: false,
                List:[],
                // 被激活导航地址
                activePath: '',
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
            this.getMenuList();
            this.activePath = window.sessionStorage.getItem('activePath');
        },
        methods:{
            getMenuList(){
                menu.getMenu().then(response =>{//请求成功
                    //response接口返回的数据
                    this.List = response.data
                    console.log(this.List)
                })
                // console.log("gotmenu")
                // this.$axios.get('/common/menu').then(res=>{
                //     this.List = res.data.data
                //     console.log(this.List)
                // })
            },
            // 保存连接的激活地址
            saveNavState (activePath) {
                window.sessionStorage.setItem('activePath', activePath)
            }
        }
    }
</script>
<style scoped>
    .el-menu-vertical a{
        text-decoration: none;
    }

    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .el-menu-vertical:not(.el-menu--collapse) {
        /*width: 250px;*/
        width: 200px;
    }
    .sidebar > ul {
        height: 100%;
    }
</style>

