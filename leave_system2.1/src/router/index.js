import Vue from 'vue'
import  VueRouter from 'vue-router'
import SIdentify from '../identify'
SIdentify.install = function (Vue) {
    Vue.component(SIdentify.name, SIdentify)
};

Vue.use(VueRouter);

const notfound =()=>import("@/components/notfound");
const nopermission =()=>import("@/components/nopermission");
// const permissiontest =()=>import("@/components/permissiontest");
const logmanage =()=>import("@/components/logmanage");
// /*登录页面*/
const login = () =>import("@/components/login");
// const reg =()=>import("@/components/reg");

/*一卡通*/
// const card = () =>import("@/page/card/card");
const review_card = () =>import("@/page/card/review_card");
const search_card = () =>import("@/page/card/search_card");

/*财务处*/
// const finance = () =>import("@/page/finance/finance");
const review_finance = () =>import("@/page/finance/review_finance");
const search_finance = () =>import("@/page/finance/search_finance");

// /*首页*/
// const notice_detail = () =>import("@/page/home/notice_detail");

/*图书馆*/
// const library = () =>import("@/page/library/library");
const review_library = () =>import("@/page/library/review_library");
const search_library = () =>import("@/page/library/search_library");
const statistical_data = () =>import("@/page/library/statistical_data");

/*后勤部*/
// const logistics = () =>import("@/page/logistics/logistics");
const review_logistics = () =>import("@/page/logistics/review_logistics");
const search_logistics = () =>import("@/page/logistics/search_logistics");

/*教务处*/
// const office = () =>import("@/page/office/office");
const review_progress = () =>import("@/page/office/review_progress");
const search_progress = () =>import("@/page/office/search_progress");

/*管理员功能*/
// const manager = () =>import("@/page/manager/manager");
const create_notice = () =>import("@/page/manager/create_notice");
const review_notice = () =>import("@/page/manager/review_notice");
const search_notice = () =>import("@/page/manager/search_notice");
const user_manage = () =>import("@/page/manager/user_manage");

const create_manager = () =>import("@/page/manager/user_manage/create_manager");
const grant_manager = () =>import("@/page/manager/user_manage/grant_manager");
const edit_manager = () =>import("@/page/manager/user_manage/edit_manager");
// const update_manager = () =>import("@/page/manager/user_manage/update_manager");
const manager_detail = () =>import("@/page/manager/user_manage/manager_detail");

// const process_manage = () =>import("@/page/manager/process_manage");
// const answer = () =>import("@/page/manager/answer");
//
// /*侧边栏*/
// const sidebar = () =>import("@/page/sidebar/sidebar");
const notice_msg = () =>import("@/page/sidebar/system_msg/notice_msg");
const answer_msg = () =>import("@/page/sidebar/system_msg/answer_msg");
const modify_password = () =>import("@/page/sidebar/user/modify_password");
const user_info = () =>import("@/page/sidebar/user/user_info");
//
/*学生功能*/
// const student = () =>import("@/page/student/student");
const leave_progress = () =>import("@/page/student/leave_progress");
const leave_table = () =>import("@/page/student/leave_table");
const review_submit = () =>import("@/page/student/review_submit");
const feedback = () =>import("@/page/student/feedback");

// // /*内容部分*/
const home = () =>import("@/components/home");
const announcement =()=>import("@/components/announcement");

const base_view = ()=>import("@/layout/base_view");
const right_content = ()=>import("@/layout/right_content");

//路由器
export const  routes =[
    {
        // collapse: false,
        path:'',
        component:base_view,
        redirect:'/login',
        children:[
            {
                path:'/home',
                // name:'首页',
                meta: { title: '首页' },
                hidden:false,
                icon:'el-icon-s-home',
                component:home,
            },
            {
                path:'/student',
                hidden:false,
                // name:'学生功能',
                meta: { title: '学生功能' },
                icon:'el-icon-user',
                component:right_content,
                children:[
                    {
                        path: 'leave_progress',
                        hidden:false,
                        // name:'离校进度',
                        meta: { title: '离校进度' },
                        icon:'el-icon-date',
                        component:leave_progress
                    },
                    {
                        path: 'leave_table',
                        hidden:false,
                        // name:'离校表单',
                        meta: { title: '离校表单' },
                        icon:'el-icon-document',
                        component:leave_table
                    },
                    {
                        path: 'review_submit',
                        hidden:false,
                        // name:'审核提交',
                        meta: { title: '审核提交'},
                        icon:'el-icon-document-checked',
                        component:review_submit
                    },
                    {
                        path: 'feedback',
                        hidden:false,
                        // name:'问题反馈',
                        meta: { title: '问题反馈'},
                        icon:'el-icon-edit',
                        component:feedback
                    }
                ]
            },
            {
                path:'/manage',
                hidden:false,
                // name:'管理员功能',
                meta: { title: '管理员功能'},
                icon:'el-icon-s-custom',
                component:right_content,
                children:[
                    {
                        path: 'create_notice',
                        hidden:false,
                        // name:'新建公告',
                        meta: { title: '新建公告'},
                        icon:'el-icon-edit-outline',
                        component:create_notice
                    },
                    {
                        path: 'review_notice',
                        hidden:false,
                        // name:'审核公告',
                        meta: { title: '审核公告'},
                        icon:'el-icon-document-checked',
                        component:review_notice
                    },
                    {
                        path: 'search_notice',
                        hidden:false,
                        // name:'搜索公告',
                        meta: { title: '搜索公告'},
                        icon:'el-icon-search',
                        component:search_notice
                    },
                ]
            },
            {
                path: '/manager',
                hidden:false,
                // name:'用户管理',
                meta: { title: '用户管理'},
                icon:'el-icon-pie-chart',
                component:user_manage,
                children:[
                    {
                        path: 'create_manager',
                        hidden:false,
                        // name:'创建管理员',
                        meta: { title: '创建用户'},
                        icon:'el-icon-edit-outline',
                        component:create_manager
                    },
                    {
                        path: 'grant_manager',
                        hidden:false,
                        // name:'管理员授权',
                        meta: { title: '菜单授权'},
                        icon:'el-icon-document-checked',
                        component:grant_manager
                    },
                    {
                        path: 'edit_manager',
                        hidden:false,
                        // name:'编辑管理员',
                        meta: { title: '编辑角色'},
                        icon:'el-icon-search',
                        component:edit_manager
                    },
                    {
                        path: 'manager_detail',
                        hidden:false,
                        // name:'资料详情',
                        meta: { title: '资料详情'},
                        icon:'el-icon-edit-outline',
                        component:manager_detail
                    },
                ]
            },
            {
                path:'/sector/logistics',
                hidden:false,
                // name:'后勤部',
                meta: { title: '后勤部'},
                icon:'el-icon-s-shop',
                component:right_content,
                children:[
                    {
                        path: 'announcement',
                        hidden:false,
                        // name:'发布公告',
                        meta: { title: '发布公告'},
                        icon:'el-icon-edit-outline',
                        component:announcement
                    },
                    {
                        path: 'review_logistics',
                        hidden:false,
                        // name:'宿舍审核',
                        meta: { title: '宿舍审核'},
                        icon:'el-icon-document-checked',
                        component:review_logistics
                    },
                    {
                        path: 'search_logistics',
                        hidden:false,
                        // name:'宿舍查询',
                        meta: { title: '宿舍查询'},
                        icon:'el-icon-search',
                        component:search_logistics
                    },
                ]
            },
            {
                path:'/sector/finance',
                hidden:false,
                // name:'财务处',
                meta: { title: '财务处'},
                icon:'el-icon-s-finance',
                component:right_content,
                children:[
                    {
                        path: 'announcement',
                        hidden:false,
                        // name:'发布公告',
                        meta: { title: '发布公告'},
                        icon:'el-icon-edit-outline',
                        component:announcement
                    },
                    {
                        path: 'review_finance',
                        hidden:false,
                        // name:'财务审核',
                        meta: { title: '财务审核'},
                        icon:'el-icon-document-checked',
                        component:review_finance
                    },
                    {
                        path: 'search_finance',
                        hidden:false,
                        // name:'财务查询',
                        meta: { title: '财务查询'},
                        icon:'el-icon-search',
                        component:search_finance
                    },
                ]
            },
            {
                path:'/sector/library',
                hidden:false,
                // name:'图书馆',
                meta: { title: '图书馆'},
                icon:'el-icon-s-goods',
                component:right_content,
                children:[
                    {
                        path: 'announcement',
                        hidden:false,
                        // name:'发布公告',
                        meta: { title: '发布公告'},
                        icon:'el-icon-edit-outline',
                        component:announcement
                    },
                    {
                        path: 'review_library',
                        hidden:false,
                        // name:'图书审核',
                        meta: { title: '图书审核'},
                        icon:'el-icon-document-checked',
                        component:review_library
                    },
                    {
                        path: 'search_library',
                        hidden:false,
                        // name:'图书查询',
                        meta: { title: '图书查询'},
                        icon:'el-icon-search',
                        component:search_library,
                    },
                    {
                        path: 'statistical_data',
                        hidden:false,
                        // name:'统计数据',
                        meta: { title: '统计数据'},
                        icon:'el-icon-coin',
                        component:statistical_data
                    },
                ]
            },
            {
                path:'/sector/card',
                hidden:false,
                // name:'一卡通',
                meta: { title: '一卡通'},
                icon:'el-icon-s-order',
                component:right_content,
                children:[
                    {
                        path: 'announcement',
                        hidden:false,
                        // name:'发布公告',
                        meta: { title: '发布公告'},
                        icon:'el-icon-edit-outline',
                        component:announcement
                    },
                    {
                        path: 'review_card',
                        hidden:false,
                        // name:'一卡通审核',
                        meta: { title: '一卡通审核'},
                        icon:'el-icon-document-checked',
                        component:review_card
                    },
                    {
                        path: 'search_card',
                        hidden:false,
                        // name:'一卡通查询',
                        meta: { title: '一卡通查询'},
                        icon:'el-icon-search',
                        component:search_card
                    },
                ]
            },
            {
                path:'/sector/office',
                hidden:false,
                // name:'教务处',
                meta: { title: '教务处'},
                icon:'el-icon-s-platform',
                component:right_content,
                children:[
                    {
                        path: 'announcement',
                        hidden:false,
                        // name:'发布公告',
                        meta: { title: '发布公告'},
                        icon:'el-icon-edit-outline',
                        component:announcement
                    },
                    {
                        path: 'review_progress',
                        hidden:false,
                        // name:'进度审核',
                        meta: { title: '进度审核'},
                        icon:'el-icon-document-checked',
                        component:review_progress
                    },
                    {
                        path: 'search_progress',
                        hidden:false,
                        // name:'进度查询',
                        meta: { title: '进度查询'},
                        icon:'el-icon-search',
                        component:search_progress
                    },
                ]
            },
            {
                path:'/system_msg',
                hidden:false,
                icon:'el-icon-office-building',
                // name:'消息中心',
                meta: { title: '消息中心'},
                component:right_content,
                children:[
                    {
                        path: 'notice_msg',
                        hidden:false,
                        // name:'公告消息',
                        meta: { title: '公告消息'},
                        icon:'el-icon-edit-outline',
                        component:notice_msg
                    },
                    {
                        path: 'answer_msg',
                        hidden:false,
                        // name:'答复消息',
                        meta: { title: '答复消息'},
                        icon:'el-icon-edit-outline',
                        component:answer_msg
                    }]
            },

            {
                path: '/logmanage',
                hidden:false,
                // name:'权限测试',
                meta: { title: '日志管理'},
                icon:'el-icon-warning',
                component:logmanage,
            },
            {
                path: '#',
                hidden: false,
                name: '头部',
                component: right_content,
                children: [
                    {
                        path: '/user_info',
                        hidden: false,
                        // name: '个人信息',
                        meta: { title: '个人信息'},
                        component: user_info
                    },
                    {
                        path: '/modify_password',
                        hidden: false,
                        // name: '修改密码',
                        meta: { title: '修改密码'},
                        component: modify_password
                    },
                ]
            }
        ]
    },
    {
        path: '/login',
        hidden:false,
        name:'登录',
        icon:'el-icon-chat-line-round',
        component:login,
    },
    {
        path: '/notfound',
        hidden:false,
        name:'404',
        component:notfound,
    },
    {
        path: '/nopermission',
        hidden:false,
        name:'403',
        component:nopermission,
    },

];

const router = new VueRouter({
    routes
});

export default router;

