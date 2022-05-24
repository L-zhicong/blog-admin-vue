import request from '@/utils/request'
const prefix = '/adminapi/system'

export function getAdminList() {
  return request({
    url: `${prefix}/lst`,
    method: 'get'
  })
}

export function getRoleList() {
  return request({
    url: `${prefix}/roleForm`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: `${prefix}/create`,
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `${prefix}/info/${id}`,
    method: 'get'
  })
}

export function update(id, data) {
  return request({
    url: `${prefix}/update/${id}`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `${prefix}/delete/${id}`,
    method: 'delete'
  })
}

export function updatePwd(id, data) {
  return request({
    url: `${prefix}/password/${id}`,
    method: 'post',
    data
  })
}

export function changeStatus(id, type) {
  return request({
    url: `${prefix}/status/${id}`,
    method: 'post',
    data: { 'type': type }
  })
}

export function getLog(id, data) {
  return request({
    url: `${prefix}/log`,
    method: 'get',
    data
  })
}
