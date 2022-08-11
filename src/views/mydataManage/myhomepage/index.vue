<template>
  <div class="app-container">
    <div>
      <div class="search-title">
        <div class="search-title-left">
          <el-button
            size="mini"
            type="primary"
            @click="addHomeData"
          >添加主页信息</el-button>
        </div>
      </div>
    </div>
    <Table ref="Table" />
    <AddEditHomepage :visible.sync="isVisible" title="添加个人主页信息" @fetchData="fetchData" />
  </div>
</template>

<script>
import Table from './components/Table'
import AddEditHomepage from './components/addEditHomePage'
export default {
  name: 'CompanyList',
  components: {
    Table,
    AddEditHomepage
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    fetchData() {
      this.$refs.Table.fetchData()
    },
    addHomeData() {
      this.isVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.search-title {
  margin-bottom: 20px;
  float: left;
}
</style>
