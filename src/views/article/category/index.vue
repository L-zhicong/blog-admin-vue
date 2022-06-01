<!--
 * @Date: 2021-06-09 18:04:50
 * @UpdateEditors:
 * @LastEditTime: 2021-06-10 19:00:28
 * @Description: 文章管理-文章分类
 * @FilePath: \qlyzf:\前端\中后台\src\views\article\category\index.vue
-->
<template>
  <div class="app-container">
    <Title @fetchData="fetchData" />
    <Table ref="Table" />
  </div>
</template>

<script>
import Title from './comps/Title'
import Table from './comps/Table'
export default {
  name: 'CompanyList',
  components: {
    Title,
    Table
  },
  methods: {
    fetchData() {
      this.$refs.Table.fetchData()
    }
  }
}
</script>
