<template>
  <div class="hy-table">
    <el-table
      v-loading="tableLoading"
      :data="tableData"
      :header-cell-style="{ textAlign: textAlign }"
      :cell-style="{ textAlign: textAlign }"
      border
      :height="tableHeight"
      :tree-props="treeProps"
      :row-key="rowKey"
    >
      <el-table-column v-for="(th, thIndex) in tableHeader" :key="thIndex" :label="th.label" :prop="th.prop" :min-width="th.width + 'px'" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <!-- 普通数据 -->
          <span v-if="th.type === 'commonData'">{{ row[th.prop] || '-' }}</span>
          <!-- 数字数据 -->
          <span v-else-if="th.type === 'numData'">{{ row[th.prop] }}</span>
          <!-- 拼接数据 -->
          <div v-else-if="th.type === 'splicingData'">
            <span v-if="th.condition(row)">{{ row[th.frontProp] }}{{ row[th.prop] | formatters(th.formatText) }} </span>
            <span v-else>{{ th.canditionText }}</span>
          </div>
          <!-- 需要分解的数据 -->
          <div v-else-if="th.type === 'decomposeData'">
            <span>{{ row[th.decompose][th.prop] }}</span>
          </div>
          <!-- 需要filter的数据 -->
          <span v-else-if="th.type === 'formatData'">{{ row[th.prop] | formatters(th.formatText) }}</span>
          <!-- 时间数据 -->
          <div v-else-if="th.type === 'timeData'">
            <div v-if="row[th.prop]">
              <i class="el-icon-time" style="margin-right: 0.3125rem;" />
              <span>{{ row[th.prop] }}</span>
            </div>
            <div v-else>-</div>
          </div>
          <!-- 文字链接 -->
          <el-link v-else-if="th.type === 'linkData'" :underline="false" @click="childrenMethods(th.clickFun, row[th.prop])">{{ th.linkText }}</el-link>
          <!-- 时间组合型数据 -->
          <div v-else-if="th.type === 'timeComData'">
            <span>{{ row[th.fistTime] }}<br>~<br>{{ row[th.lastTime] }}</span>
          </div>
          <!-- 头像类型数据 -->
          <el-image v-else-if="th.type === 'imgData'" :src="row[th.prop] | imgIsExternal" fit="scale-down" style="width:2.5rem; height: 2.5rem;border-radius: 50%;">
            <div slot="error" class="img-loading-failed">
              暂无
            </div>
          </el-image>
          <!-- 图片类型数据:可放大 -->
          <el-image
            v-else-if="th.type === 'coverData'"
            :src="row[th.prop] | imgIsExternal"
            fit="scale-down"
            style=" width: 6.25rem;height: 2.5rem;"
            :preview-src-list="[bigImg + row[th.prop]]"
          />
          <!-- 组合图片 :举报列表-->
          <div v-if="th.type === 'groupImg'">
            <span v-for="(item, index) in row[th.prop]" :key="index">
              <el-image style="width: 4.125rem; height: 3.125rem" :src="item | imgIsExternal" :preview-src-list="[bigImg + item]" fit="scale-down" /><br>
            </span>
            <span v-if="row[th.prop].length === 0">暂无图片</span>
          </div>
          <!-- 标签数据 -->
          <el-tag v-else-if="th.type === 'tagData'" :type="row[th.prop] | formatters(th.formatColor)">{{ row[th.prop] | formatters(th.formatText) }}</el-tag>
          <el-tag v-else-if="th.type === 'tagNumData'" :type="row[th.formatNum] | formatters(th.formatColor)">{{ row[th.prop] }}</el-tag>
          <!-- 特殊标签，适用于用户列表认证状态 -->
          <el-tag v-else-if="th.type === 'tagSpecialData'" :type="row[th.prop][row[th.prop].length - 1] ? '' : 'info'">{{
            row[th.prop][row[th.prop].length - 1] || '未认证'
          }}</el-tag>
          <!-- 操作栏 -->
          <div v-else-if="th.type === 'operation'" class="btn-style">
            <div v-for="(o, oIndex) in th.operation" :key="oIndex">
              <el-button v-if="o.condition(row) === null || o.condition(row)" size="mini" :type="o.btnType" @click="childrenMethods(o.clickFun, row)">{{ o.btnText }}</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="currentChange"
      :current-page="queryParams.page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="queryParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryParams.total"
      style="text-align: center;padding:20px 0 0 0;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  filters: {
    formatters(val, format) {
      const map = format
      return map[val]
    }
  },
  props: {
    tableHeader: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    tableHeight: {
      type: Number,
      default: window.innerHeight - 250
    },
    queryParams: {
      type: Object,
      default: () => {}
    },
    // 嵌套表单
    treeProps: {
      type: Object,
      default: () => {}
    },
    rowKey: {
      type: String,
      default: null
    },
    // 是否显示分页
    currentChange: {
      type: Boolean,
      default: true
    },
    textAlign: {
      type: String,
      default: 'center'
    }
  },
  data() {
    return {
      bigImg: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    childrenMethods(methodsName, row) {
      this.$emit(methodsName, row)
    }
  }
}
</script>
<style lang="scss" scoped>
.hy-table {
  .btn-style {
    display: flex;
    justify-content: center;
    align-items: center;
    ::v-deep {
      .el-button {
        margin-left: 5px;
      }
    }
  }
}
</style>
