import request from '@/utils/request'
export default {
    //1 讲师列表（条件查询分页）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getMenu(params) {
        return request({
            url: '/common/menu',
            method: 'get',
            params
          })
    },
    login(username, password) {
        return request({
            url: '/login?username='+username+'&password='+password,
            method: 'post',
        })
    },
    getNestedTreeList() {
        return request({
            url: '/admin/authority',
            method: 'get'
        })
    },
    //搜索
    doMenuSearch(name,List){
        return request({
            url:'/admin/authority/name'+name,
            method:'get',
            data:List
        })
    },
    removeById(id) {
        return request({
            url: '/admin/authority/delete/'+id,
            method:'post'
        })
    },
    saveLevelOne(menu) {
        return request({
            url: '/admin/authority',
            method:'post',
            data:menu,
        })
    },
    update(id,menu) {
        return request({
            url: '/admin/authority/update/'+id,
            method:'post',
            data:menu,
        })
    },
    toAssign(roleId) {
        return request({
            url: '/admin/role/authority/'+roleId,
            method:'get'
        })
    },
    doAssign(roleId,data) {
        return request({
            url: '/admin/authority/update/'+roleId,
            method:'post',
            // params: {roleId}
            data:data
        })
    },
    SendMessage(id,data) {
        return request({
            url: '/sector/edu/checkRefuse/'+id,
            method:'post',
            data:data
        })
    }

}
