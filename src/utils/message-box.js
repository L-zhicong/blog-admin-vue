import { MessageBox } from 'element-ui'

export function handleCofirm(text) {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    closeOnClickModal: false
  })
}

// 特殊messagebox,按钮均为操作
export function handelSpecialConfirm(text, confirmText, cancelText) {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    type: 'warning',
    closeOnClickModal: false,
    distinguishCancelAndClose: true // 区别取消操作和关闭
  })
}
