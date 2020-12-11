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
    }

}
