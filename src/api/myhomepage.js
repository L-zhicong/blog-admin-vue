import request from '@/utils/request'

const prefix = '/adminapi/myhomepage'

// 获取主页数据列表
export function getList(query) {
  return request({
    url: `${prefix}/lst`,
    method: 'get',
    query: query
  })
}
