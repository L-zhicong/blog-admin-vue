<template>
  <div class="category-table">
    <VTable
      :table-data="tableData"
      :table-loading="tableLoading"
      :table-height="tableHeight"
      :query-params="queryParams"
      :table-header="tableHeader"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @changeStatus="changeStatus"
      @delStatus="delStatus"
      @editCategory="editCategory"
    />
    <VCategoryDialog :visible.sync="categoryDialog" title="编辑文章分类" :category-id="categoryId" @fetchData="fetchData" />
  </div>
</template>

<script>
import VTable from '@/components/Base/Table/index.vue'
import { categoryTitle } from '@/views/article/data.js'
import { getCategoryList, changeCategoryStatus, categoryDel } from '@/api/article.js'
import { handleCofirm } from '@/utils/message-box.js'
import VCategoryDialog from './addEditCategory.vue'
export default {
  components: { VTable, VCategoryDialog },
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
      tableHeader: categoryTitle,
      //   添加&编辑文章分类
      categoryDialog: false,
      categoryId: null
    }
  },
  mounted() {
    this.fetchData()
    window.addEventListener('resize', this.getTableHeight)
  },
  destroyed() {
    window.addEventListener('resize', this.getTableHeight)
  },
  methods: {
    getTableHeight() {
      this.tableHeight = window.innerHeight - 250
    },
    fetchData() {
      this.tableLoading = true
      getCategoryList().then(res => {
        this.tableData = res.data
        this.tableLoading = false
        this.queryParams.total = res.data.length
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
    // 更改状态
    changeStatus(val) {
      const id = val.article_category_id
      const status = val.status
      if (status === 0) {
        handleCofirm('是否启用该分类？')
          .then(() => {
            this.categoryStatus(id, 1, '启用成功')
          })
          .catch(() => {})
      } else {
        handleCofirm('是否禁用该分类？')
          .then(() => {
            this.categoryStatus(id, 0, '禁用成功')
          })
          .catch(() => {})
      }
    },
    categoryStatus(id, status, msg) {
      // console.log(id, status, msg)
      changeCategoryStatus(id, status).then(res => {
        if (res.code === 200) {
          this.tableData.some((item, i) => {
            if (item.article_category_id === id) {
              this.tableData[i].status = status
              this.$toast.show(msg)
              return true
            }
          })
        }
      })
    },
    // 删除文章分类
    delStatus(val) {
      const id = val.article_category_id
      handleCofirm('是否要删除该文章分类？').then(res => {
        categoryDel(id).then(res => {
          if (res.code === 200) {
            this.tableData.some((item, i) => {
              if (item.article_category_id === id) {
                this.tableData.splice(i, 1)
                this.$toast.show('删除文章分类成功！')
              }
            })
          }
        })
      })
    },
    // 打开编辑弹窗
    editCategory(val) {
      this.categoryId = val.article_category_id
      this.categoryDialog = true
    }
  }
}
</script>
