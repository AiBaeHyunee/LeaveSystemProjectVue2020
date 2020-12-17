import request from '@/utils/request'

const api_name = '/admin/acl/role'

export default {

    getPageList(searchObj) {
        return request({
            url: '/admin/role/getAllRoles',
            method: 'get',
            params: searchObj // url查询字符串或表单键值对
        })
    },
    getById(id) {
        return request({
          url: `${api_name}/get/${id}`,
          method: 'get'
        })
      },
    getInfo(id,List) {
        return request({
            url: '/admin/role/authority/'+id,
            method: 'get',
            data:List
        })
    },
    addRole(data) {
        return request({
            url: '/admin/role',
            method: 'post',
            data:data
            // params
        })
    },
      save(role) {
        return request({
          url: `${api_name}/save`,
          method: 'post',
          data: role
        })
      },
    //搜索
    doRoleSearch(name,List){
        return request({
            url:'/admin/role/name/'+name,
            method:'get',
            data:List
        })
    },

      updateById(role) {
        return request({
          url: `${api_name}/update`,
          method: 'put',
          data: role
        })
      },
      getAssign(roleId){
        return request({
          url: `${api_name}/toAssign/${roleId}`,
          method: 'get'
        })
      },
      removeById(id){
        return request({
          url: '/admin/role/delete/'+id,
          method: 'post'
        })
      },
      removeRows(idList){
        return request({
          url: `${api_name}/batchRemove`,
          method: 'delete',
          data:idList
        })
      }

}
