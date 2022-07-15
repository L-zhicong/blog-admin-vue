<template>
  <div>
    <div class="search-title">
      <div class="search-title-left">
        <el-button size="mini" type="primary" @click="addArticle">添加文章</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    addArticle() {
      this.$nextTick(() => {
        this.$router.push({ path: `/article/list/add` })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.search-title {
  margin-bottom: 20px;
}
</style>
