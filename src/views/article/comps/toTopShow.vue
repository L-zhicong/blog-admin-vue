<template>
  <div class="show-pdf">
    <el-dialog :visible.sync="visible" width="800px" :show-close="false" :close-on-click-modal="false">
      <div v-if="title === '查看文章'" class="ql-container ql-snow">
        <div v-if="articleContent" class="ql-editor" v-html="articleContent.content" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import { imgIsExternal } from '@/utils/validate.js'

export default {
  components: {},
  // filters: { imgIsExternal },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    pdfUrl: {
      type: String,
      default: ''
    },
    proveUrl: {
      type: String,
      default: ''
    },
    // 文章内容
    articleContent: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.show-pdf {
  ::v-deep {
    .el-dialog {
      height: 100vh;
      display: flex;
      flex-direction: column;
      margin-top: 0 !important;
      .el-dialog__header {
        .pdf-title {
          display: flex;
          justify-content: space-between;
          .title-left {
            font-size: 18px;
            color: #303133;
          }
          .icon {
            font-size: 18px;
            cursor: pointer;
            margin-right: 0.625rem;
            &:hover {
              color: #409eff;
            }
          }
        }
      }
      .el-dialog__body {
        overflow-y: auto;
        flex: 1;
      }
    }
    .ql-container,
    .ql-snow {
      border: none;
    }
  }
}
</style>
