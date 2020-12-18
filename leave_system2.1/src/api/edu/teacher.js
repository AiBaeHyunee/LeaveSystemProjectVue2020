import request from '@/utils/request'
export default {
    //1 讲师列表（条件查询分页）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getTeacherListPage(params) {
        return request({
            //url: '/eduservice/teacher/pageTeacherCondition/'+current+"/"+limit,
            url: '/admin/user',
            method: 'get',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            params
            //data表示把对象转换json进行传递到接口里面
          })
    },
    //删除讲师
    deleteTeacherId(id) {
        return request({
            url: '/admin/user/delete/'+id,
            method: 'post'
          })
    },
    //添加讲师
    addTeacher(teacher) {
        return request({
            url: '/admin/user/join_in',
            method: 'post',
            data: teacher
          })
    },
    //根据id查询讲师
    getTeacherInfo(id,List) {
        return request({
            url: '/admin/user/'+id,
            method: 'get',
            data:List
          })
    },
    //获取财务处详情
    getFinanceInfo(id,List) {
        return request({
            url: '/sector/finance/'+id,
            method: 'get',
            data:List
        })
    },
    //获取一卡通详情
    getCardInfo(id,List) {
        return request({
            url: '/sector/card/studentId/'+id,
            method: 'get',
            data:List
        })
    },
    //获取后勤部详情
    getLogisticsInfo(id,List) {
        return request({
            url: '/sector/dorm/stuNumber/'+id,
            method: 'get',
            data:List
        })
    },
    //修改讲师
    updateTeacherInfo(id,List) {
        return request({
            url: '/admin/user/update/'+id,
            method: 'post',
            data:List
          })
    },
    //搜索
    doUserSearch(clerkAccount,List){
        return request({
            url:'/admin/user/account/'+clerkAccount,
            method:'get',
            data:List
        })
    },
    //发布/编辑公告
    addNotice(data) {
        return request({
            url: '/sector/notice/upload',
            method: 'post',
            data:data
            // params
        })
    },
//获取公告详情
    getNotice(id,List) {
        return request({
            url: '/sector/notice/viewNoticeDetails/'+id,
            method: 'get',
            data:List
        })
    },
//根据id删除公告
    removeById(id){
        return request({
            url: '/admin/notice/deleteNotice/'+id,
            method: 'post'
        })
    },
    //搜索日志
    searchLog(log) {
        return request({
            url: '/common/logs',
            method: 'post',
            data: log
        })
    },
    //后勤部
    postLetter(id,list) {
        return request({
            url: '/sector/dorm/checkDormStatus?stuNumber='+id,
            method: 'post',
            data: list
        })
    },
}
