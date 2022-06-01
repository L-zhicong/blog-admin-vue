<template>
  <div>
    <div class="search-title">
      <div class="search-title-left">
        <el-button size="mini" type="primary" @click="openAdd">添加分类</el-button>
      </div>
    </div>
    <VCategoryDialog :visible.sync="categoryDialog" title="添加文章分类" @fetchData="fetchData" />
  </div>
</template>

<script>
import VCategoryDialog from './addEditCategory.vue'

export default {
  components: { VCategoryDialog },
  data() {
    return {
      categoryDialog: false
    }
  },
  methods: {
    // 打开添加弹窗
    openAdd() {
      this.categoryDialog = true
    },
    fetchData() {
      this.$emit('fetchData')
    }
  }
}
</script>
<style lang="scss" scoped>
.search-title {
  margin-bottom: 20px;
}
</style>
