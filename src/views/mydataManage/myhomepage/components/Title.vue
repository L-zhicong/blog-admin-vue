<template>
  <div>
    <div class="search-title">
      <div class="search-title-left">
        <el-button size="mini" type="primary" @click="addHomeData">添加主页信息</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    addHomeData() {
      this.$nextTick(() => {
        this.$router.push({ path: `/mydataManage/addhomedata` })
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
