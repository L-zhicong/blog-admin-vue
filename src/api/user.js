import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/adminapi/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/adminapi/user/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/adminapi/logout',
    method: 'post'
  })
}
