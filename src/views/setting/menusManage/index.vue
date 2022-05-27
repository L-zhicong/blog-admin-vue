<template>
  <div class="app-container">
    <div class="search-title">
      <el-button
        size="mini"
        type="primary"
        @click="
          () => {
            dialogFormVisible = true;
            menuId = null;
            operationType = null;
            pId = 0;
            formTitle = '添加菜单';
          }
        "
      >添加菜单</el-button>
    </div>
    <div>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        row-key="menu_id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        border
        fit
        highlight-current-row
        :height="tableHeight"
      >
        <el-table-column label="菜单名称" prop="menu_name" width="200" />
        <el-table-column label="菜单地址" prop="route" min-width="120" />
        <el-table-column label="菜单图标" prop="icon" width="150">
          <template slot-scope="scope">
            <Icon :icon="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="create_time" />
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="addMenu(scope.row.menu_id)">添加子菜单</el-button>
            <el-button type="warning" size="mini" @click="updateMenu(scope.row.menu_id)">编辑</el-button>
            <el-button type="info" size="mini" @click="delMenu(scope.row.menu_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <VaddEdit :visible.sync="dialogFormVisible" :form-title="formTitle" :menu-id="menuId" :operation-type="operationType" :p-id="pId" @fetchData="fetchData" />
  </div>
</template>

<script>
import { getTree, del } from '@/api/menu'
import Icon from './components/Icon'
import VaddEdit from './components/addEditMenus.vue'
import { handleCofirm } from '@/utils/message-box.js'
export default {
  inject: ['reload'],
  components: {
    Icon,
    VaddEdit
  },
  data() {
    return {
      plat_type: window.location.pathname === '/setting/schoolMenu' ? 2 : 1,
      tableData: [],
      cellStyle: {
        padding: 0
      },
      dialogFormVisible: false,
      formTitle: '添加菜单',
      menuId: null,
      // 上一级id
      pId: 0,
      tableLoading: false,
      operationType: null,
      tableHeight: window.innerHeight - 250
    }
  },
  created() {},
  destroyed() {
    window.addEventListener('resize', this.getTableHeight)
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
      getTree(this.plat_type).then(res => {
        this.tableData = res.data.list
        this.tableLoading = false
      })
    },
    addMenu(id) {
      this.formTitle = '添加子菜单'
      this.operationType = 1
      this.pId = id
      this.menuId = null
      this.dialogFormVisible = true
    },
    async updateMenu(id) {
      this.formTitle = '编辑菜单'
      this.operationType = 2
      this.menuId = id
      this.pId = null
      this.dialogFormVisible = true
      console.log('xinxi', this.menuId)
    },
    delMenu(id) {
      handleCofirm('此操作将永久删除该菜单, 是否继续?')
        .then(() => {
          del(id).then(res => {
            if (res.code === 200) {
              this.$toast.show('删除成功')
              this.fetchData()
              return
            }
          })
        })
        .catch(() => {})
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
