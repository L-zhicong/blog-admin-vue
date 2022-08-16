<template>
  <div class="article-table">
    <VTable
      :table-data="tableData"
      :table-loading="tableLoading"
      :table-height="tableHeight"
      :query-params="queryParams"
      :table-header="tableHeader"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @updateArticle="updateArticle"
      @delArticle="delArticle"
      @seeArticle="seeArticle"
    />
  </div>
</template>

<script>
import VTable from '@/components/Base/Table/index.vue'
import { HomePageTitle } from '@/views/mydataManage/myhomepage/data.js'
import { handleCofirm } from '@/utils/message-box.js'
import { getList } from '@/api/myhomepage'
export default {
  components: { VTable },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      tableHeight: window.innerHeight - 250,
      queryParams: {
        page: 0,
        limit: 10,
        total: 0
      },
      tableHeader: HomePageTitle
    }
  },
  mounted() {
    this.fetchData()
    window.addEventListener('resize', this.getTableHeight)
  },
  methods: {
    getTableHeight() {
      this.tableHeight = window.innerHeight - 250
    },
    fetchData() {
      this.tableLoading = true
      getList(this.queryParams).then(res => {
        this.tableData = res.data.list
        this.tableLoading = false
        this.queryParams.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.queryParams.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.fetchData()
    },
    // 查看文章
    seeArticle(val) {
      this.$router.push('/homedata/index')
      // console.log(val)
      const HOMEDATA = val
      if (HOMEDATA) {
        this.articleContent = HOMEDATA
        this.seeDialog = true
      } else {
        this.$toast.show('该文章不存在！', 'warning')
      }
    },
    // 编辑
    updateArticle(val) {
      const id = val.id
      this.$nextTick(() => {
        this.$router.push({ path: `/article/list/edit/${id}` })
      })
    },
    // 删除
    delArticle(val) {
      const id = val.id
      handleCofirm('确实要删除该文章？')
        .then(() => {
          this.delete(id)
        })
        .catch(() => {})
    },
    delete(id) {
    }
  }
}
</script>
