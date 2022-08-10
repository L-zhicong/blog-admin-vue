<template>
  <div class="show-pdf">
    <el-dialog :visible.sync="visible" width="800px" :show-close="false" :close-on-click-modal="false">
      <template slot="title">
        <div class="pdf-title">
          <div class="title-left">{{ title }}</div>
          <div v-if="title === '查看简历'">
            <el-tooltip class="item" effect="dark" content="打印和保存" placement="bottom-end">
              <i class="el-icon-printer icon" @click="printAll" />
            </el-tooltip>
          </div>
        </div>
      </template>
      <!-- <pdf v-if="title === '查看简历'" ref="pdf" :src="pdfUrl" /> -->

      <el-image v-if="title === '查看证明材料'" :src="proveUrl | imgIsExternal" style="width:100%;height:90%;" fit="scale-down" />

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
import { imgIsExternal } from '@/utils/validate.js'

export default {
  components: {},
  filters: { imgIsExternal },
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
