import Toast from './index.vue'
const obj = {}
obj.install = function(Vue) {
  // 1：创建一个组件构造器 传入组件对象
  const ToastContrustor = Vue.extend(Toast)
  // 2：使用new方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new ToastContrustor()
  // 3：将组件对象，手动的挂载到某一个元素身上
  toast.$mount(document.createElement('div'))
  // 4：toast.$el对应的就是div了 然后把这个对象添加到body之中
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
export default obj
