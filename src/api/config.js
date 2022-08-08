import request from '@/utils/request'

// 上传图片 需要token
export function uploadImg(formData) {
  return request({
    url: `adminapi/Picture/upload`,
    method: 'post',
    data: formData
  })
}
