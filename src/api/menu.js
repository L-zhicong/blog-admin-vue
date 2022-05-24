import request from '@/utils/request'

/**
 * 菜单列表
 * @param {*} data
 * @returns
 */
export function getList() {
  return request({
    url: '/adminapi/menu/lst',
    method: 'get'
  })
}

/**
 * 菜单树
 * @param {*} data
 * @returns
 */
export function getTree() {
  return request({
    url: '/adminapi/menu/getTree',
    method: 'get'
  })
}

/**
 * 添加菜单
 * @param {*} data
 * @returns
 */
export function add(data) {
  return request({
    url: '/adminapi/menu/create',
    method: 'post',
    data
  })
}
/**
 * 菜单顶级分类列表
 * @param {*} data
 * @returns
 */
export function createForm(query) {
  return request({
    url: '/adminapi/create/form',
    method: 'get',
    query: query
  })
}
/**
 * 菜单详情
 * @param {*} data
 * @returns
 */
export function getInfo(id) {
  return request({
    url: `/adminapi/menu/update/${id}`,
    method: 'get'
  })
}
/**
 * 更新菜单
 * @param {*} data
 * @returns
 */
export function update(id, data) {
  return request({
    url: `/adminapi/menu/update/${id}`,
    method: 'post',
    data
  })
}
/**
 * 删除菜单
 * @param {*} data
 * @returns
 */
export function del(id) {
  return request({
    url: `/adminapi/menu/delete/${id}`,
    method: 'delete'
  })
}
