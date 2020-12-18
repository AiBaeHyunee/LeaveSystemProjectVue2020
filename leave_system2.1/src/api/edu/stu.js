import request from '@/utils/request'
export default {
    removeById(id) {
        return request({
            url: '/admin/authority/delete/'+id,
            method:'post'
        })
    },

    SendMessage(list) {
        return request({
            url: '/student/ResendMessage',
            method:'post',
            data:list
        })
    }

}
