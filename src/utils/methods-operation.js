/*
 * @Date: 2021-06-05 14:14:35
 * @UpdateEditors:
 * @LastEditTime: 2021-07-03 10:27:40
 * @Description: 表格中操作栏的方法
 */

// 删除最后一页的唯一一条后，返回上一页-适用于有删除的表单
// this.queryParams.page = delLastData(this.queryParams.page, this.queryParams.limit, this.queryParams.page)
export function delLastData(page, limit, total) {
  const totalPage = Math.ceil((total - 1) / limit)
  const Page = page > totalPage ? totalPage : page
  return Page < 1 ? 1 : Page
}

/**
 * @description:  删除某一条数据
 * @param {Array} data 数据
 * @param {int} id
 * @param {String} idText 需要修改的数据属性
 * @return {*}
 */
export function delOneData(data, id, idText) {
  data.some((item, i) => {
    if (item[idText] === id) {
      data.splice(i, 1)
      return true
    }
  })
}

/**
 * @description:修改状态
 * @param {array} data 数据
 * @param {int} id
 * @param {String} stateText 数据中的id
 * @param {String} statusText 需要更改的状态属性
 * @param {int} status 修改后的状态
 * @return {*}
 */
export function changOneState(data, id, idText, statusText, status) {
  data.some((item, i) => {
    if (item[idText] === id) {
      data[i][statusText] = status
      return true
    }
  })
}

/**
 * @description:限制上传图片的格式和大小
 * @param {*} file
 * @return {*}
 */
import Vue from 'vue'
export function beforeImgUpload(file) {
  const types = ['image/jpeg', 'image/jpg', 'image/png']
  const isImage = types.includes(file.type)
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isImage) Vue.prototype.$toast.show('只能上传jpg/png类型的图片', 'error')
  if (!isLt2M) Vue.prototype.$toast.show('添加的图片大小不能超过 2MB!', 'error')
  return isImage && isLt2M
}

/**
 * @description:删除嵌套数组
 * @param {*} data
 * @param {*} id
 * @param {*} idText
 * @return {*}
 */
export function delNesting(data, id, idText) {
  data.some((item, i) => {
    if (item[idText] === id) {
      data.splice(i, 1)
      return true
    } else {
      if (item.children) {
        item.children.some((son, sons) => {
          if (son[idText] === id) {
            item.children.splice(sons, 1)
            return true
          } else {
            if (son.children) {
              son.children.some((grandson, grandsons) => {
                if (grandson[idText] === id) {
                  son.children.splice(grandsons, 1)
                  return true
                }
              })
            }
          }
        })
      }
    }
  })
}

/**
 * @description: 修改嵌套数组的状态
 * @param {*} data
 * @param {*} id
 * @param {*} idText
 * @param {*} status
 * @param {*} statusText
 * @return {*}
 */
export function changeNesting(data, id, idText, status, statusText) {
  data.some((item, i) => {
    if (item[idText] === id) {
      data[i][statusText] = status
      return true
    } else {
      if (item.children) {
        item.children.some((son, sons) => {
          if (son[idText] === id) {
            item.children[sons][statusText] = status
            return true
          } else {
            if (son.children) {
              son.children.some((grandson, grandsons) => {
                if (grandson[idText] === id) {
                  son.children[grandsons][statusText] = status
                  return true
                }
              })
            }
          }
        })
      }
    }
  })
}
