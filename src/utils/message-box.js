import { MessageBox } from 'element-ui'

export function handleCofirm(text) {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  })
}
