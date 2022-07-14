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
  name: 'Article',
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
