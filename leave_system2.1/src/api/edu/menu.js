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
    doMenuSearch(ID,List){
        return request({
            url:'/admin/authority/'+ID,
            method:'get',
            data:List
        })
    },
    removeById(id) {
        return request({
            url: '/common/menu'+id,
            method:'post'
        })
    },
    saveLevelOne(menu) {
        return request({
            url: '/common/menu'+menu,
            method:'post'
        })
    },
    update(menu) {
        return request({
            url: '/common/menu'+menu,
            method:'post'
        })
    },
    toAssign(roleId) {
        return request({
            url: '/admin/role/authority/'+roleId,
            method:'get'
        })
    },
    doAssign(roleId) {
        return request({
            url: '/admin/role/authority/',
            method:'post',
            params: {roleId}
        })
    }

}
