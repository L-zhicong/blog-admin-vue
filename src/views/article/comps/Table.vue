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
    <VtoTopShow :visible.sync="seeDialog" title="查看文章" :article-content="articleContent" />
  </div>
</template>

<script>
import VTable from '@/components/Base/Table/index.vue'
import { articleTitle } from '@/views/article/data.js'
import { getList, del } from '@/api/article.js'
import { handleCofirm } from '@/utils/message-box.js'
import VtoTopShow from './toTopShow.vue'
import { delOneData, delLastData } from '@/utils/methods-operation.js'
export default {
  components: { VTable, VtoTopShow },
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
      tableHeader: articleTitle,
      //   查看文章弹窗
      seeDialog: false,
      //   文章内容
      articleContent: null
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
      const content = val.content
      if (content) {
        this.articleContent = content
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
      del(id).then(res => {
        if (res.code === 200) {
          delOneData(this.tableData, id)
          this.$toast.show('删除文章成功！')
          this.queryParams.page = delLastData(this.queryParams.page, this.queryParams.limit, this.queryParams.page)
        }
      })
        .finally(() => {})
    }
  }
}
</script>
