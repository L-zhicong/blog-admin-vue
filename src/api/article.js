import request from '@/utils/request'
const prefix = '/adminapi/article'
const category = '/category'

export function getList(query) {
  return request({
    url: `${prefix}/lst`,
    method: 'get',
    query: query
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
    url: `${prefix}/updateForm/${id}`,
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

export function getCategoryList() {
  return request({
    url: `${prefix}${category}/lst`,
    method: 'get'
  })
}

export function categoryCreate(data) {
  return request({
    url: `${prefix}${category}/create`,
    method: 'post',
    data
  })
}

export function getCategoryInfo(id) {
  return request({
    url: `${prefix}${category}/updateForm/${id}`,
    method: 'get'
  })
}

export function categoryUpdate(id, data) {
  return request({
    url: `${prefix}${category}/update/${id}`,
    method: 'post',
    data
  })
}

export function changeCategoryStatus(id, type) {
  return request({
    url: `${prefix}${category}/status/${id}`,
    method: 'post',
    data: { 'type': type }
  })
}

export function categoryDel(id) {
  return request({
    url: `${prefix}${category}/delete/${id}`,
    method: 'delete'
  })
}
