import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    })
}

export const testData = query => {
    return request({
        url: './testmanager.json',
        method: 'get',
        params: query
    })
}

export function curd(url, method, params) {
    const methods = ['get', 'delete']
    const key = methods.includes(method) ? 'params' : 'data'
    return request({
        url: url,
        method: method,
        [key]: params
    })
}

export function fetch(url, query) {
    return request({
        url: url,
        method: 'get',
        params: query
    })
}

/**
 * 根据Id 获取详细信息 url/{id}
 * @param {*} url
 * @param {*} id
 */
export function fetchInfo(url, id) {
    return request({
        url: url + '/' + id,
        method: 'get'
    })
}

/**
 * 根据Id删除信息 url/{id}
 * @param {*} url
 * @param {*} id
 */
export function deleteId(url, id) {
    return request({
        url: url + '/' + id,
        method: 'delete'
    })
}

export function checkIsExist(url, params) {
    return request({
        url: url,
        method: 'get',
        params: params
    })
}
