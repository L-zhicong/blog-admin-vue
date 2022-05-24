import request from '@/utils/request'
const prefix = '/adminapi/role'

export function getList(query) {
  return request({
    url: `${prefix}/lst`,
    method: 'get',
    query
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

export function getTree() {
  return request({
    url: `${prefix}/getTree`,
    method: 'get'
  })
}

export function changeStatus(id, type) {
  return request({
    url: `${prefix}/status/${id}`,
    method: 'post',
    data: { 'type': type }
  })
}
