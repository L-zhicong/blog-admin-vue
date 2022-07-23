<template>
  <!--this.$toast.show(message, type)  -->
  <transition name="el-zoom-in-center">
    <div v-if="isShowToast" class="hy-toast transition-box" :class="type | backgroundFilters">
      <i :class="iconType" class="icon" />
      <div class="toast-msg">
        <span>{{ message }}</span>
        <!-- <span>{{ tipText }}</span> -->
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  filters: {
    backgroundFilters(type) {
      let colorClass = null
      if (type === 'success') {
        colorClass = 'success-toast'
      } else if (type === 'info') {
        colorClass = 'info-toast'
      } else if (type === 'error') {
        colorClass = 'error-toast'
      } else if (type === 'warning') {
        colorClass = 'warning-toast'
      }
      return colorClass
    }
  },
  data() {
    return {
      message: '',
      isShowToast: false,
      type: 'success'
      //   tipText: ''
    }
  },
  computed: {
    iconType() {
      let icon = null
      const { type } = this
      if (type === 'success') {
        icon = 'el-icon-circle-check'
      } else if (type === 'info') {
        icon = 'el-icon-warning-outline'
      } else if (type === 'error') {
        icon = 'el-icon-circle-close'
      } else if (type === 'warning') {
        icon = 'el-icon-warning-outline'
      }
      return icon
    }
  },
  methods: {
    show(message, type = 'success') {
      this.isShowToast = true
      this.message = message
      this.type = type
      //   this.tipText = tipText
      setTimeout(() => {
        this.isShowToast = false
      }, 3000)
    }
  }
}
</script>
<style lang="scss" scoped>
.hy-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  min-width: 220px;
  padding: 20px;
  height: 50px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  border: 1px solid #f4f4f5;
  z-index: 9999999;
  .icon {
    font-size: 20px;
    font-weight: 900;
  }
  .toast-msg {
    display: flex;
    flex-flow: column;
    margin-left: 10px;

    span:nth-child(1) {
      font-weight: 800;
    }
    span:nth-child(2) {
      font-size: 10px;
    }
  }
}
.success-toast {
  background-color: rgba($color: #f0f9eb, $alpha: 0.9);
  color: #67c23a;
}
.info-toast {
  background-color: rgba($color: #f4f4f5, $alpha: 0.9);
  color: #909399;
}
.error-toast {
  background-color: rgba($color: #fef0f0, $alpha: 0.9);
  color: #f56c6c;
}
.warning-toast {
  background-color: rgba($color: #fdf6ec, $alpha: 0.9);
  color: #e6a23c;
}
</style>
