<template>
  <div class="app-container">
    <div class="clearfix search-title">
      <el-button
        type="primary"
        size="mini"
        @click="
          () => {
            dialogFormVisible = true;
            formTitle = '添加角色';
          }
        "
      >添加身份</el-button>
    </div>
    <div>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="menu_id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        border
        fit
        highlight-current-row
        :height="tableHeight"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="ID" prop="role_id" width="60px" />
        <el-table-column label="身份名称" prop="role_name" width="150px" />
        <el-table-column label="权限名称" prop="rule_name" min-width="300" />
        <el-table-column label="身份状态" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="禁用"
              @change="statusChange(scope.row)"
            /></template>
        </el-table-column>
        <el-table-column label="创建时间" prop="create_time" width="200px" />
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="updatePwd(scope.row.menu_id)">修改管理员密码</el-button> -->
            <el-button type="warning" size="mini" @click="editRole(scope.row.role_id)">编辑</el-button>
            <el-button type="info" size="mini" @click="delRole(scope.row.role_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryParams.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryParams.total"
        style="text-align: center;padding:20px 0 0 0;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- form -->
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="752px">
      <el-form ref="roleFormRef" :model="roleForm" :rules="roleRules" label-width="100px">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="roleForm.role_name" autocomplete="off" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree ref="roleTreeRef" :data="treeData" show-checkbox node-key="id" :props="defaultProps" default-expand-all :default-checked-keys="checkKeys" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="roleForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getTree, create, getInfo, update, del, changeStatus } from '@/api/role'
const defaultRoleForm = () => {
  return {
    role_name: '',
    status: 1,
    rules: []
  }
}
export default {
  name: 'Index',
  components: {},
  data() {
    return {
      tableHeight: window.innerHeight - 250,
      tableData: [],
      cellStyle: {
        padding: 0
      },
      formTitle: '添加角色',
      roleForm: defaultRoleForm(),
      dialogFormVisible: false,
      roleRules: {
        role_name: [{ required: true, message: '请输入角色名称！', trigger: 'blur' }]
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      checkKeys: [],
      queryParams: {
        page: 1,
        limit: 10,
        total: 0
      },
      tableLoading: false
    }
  },
  // 计算属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.$refs.roleFormRef.resetFields()
        this.roleForm = defaultRoleForm()
      }
    }
  },
  created() {},
  mounted() {
    this.init()
    window.addEventListener('resize', this.getTableHeight)
  },
  destroyed() {
    window.addEventListener('resize', this.getTableHeight)
  },
  methods: {
    getTableHeight() {
      this.tableHeight = window.innerHeight - 250
    },
    init() {
      getTree().then(res => {
        this.treeData = res.data
      })
      this.fetchData()
    },
    fetchData() {
      this.tableLoading = true
      getList(this.queryParams).then(res => {
        this.tableData = res.data
        this.queryParams.total = res.data.total
        this.tableLoading = false
      })
    },
    onSubmit() {
      this.$refs.roleFormRef.validate(valid => {
        if (valid) {
          this.roleForm.rules = this.$refs.roleTreeRef.getCheckedKeys()
          if (this.roleForm.role_id) {
            update(this.roleForm.role_id, this.roleForm).then(res => {
              if (res.code === 200) {
                this.fetchData()
                this.dialogFormVisible = false
              }
            })
          } else {
            create(this.roleForm).then(res => {
              if (res.code === 200) {
                this.$toast.show('添加角色成功成功')

                this.fetchData()
                this.dialogFormVisible = false
              }
            })
          }
        } else {
          this.$toast.show('添加失败，请输入角色名称！', 'error')
        }
      })
    },
    async editRole(id) {
      this.formTitle = '编辑角色'
      const { data } = await getInfo(id)
      this.roleForm = data.info
      this.checkKeys = data.info.rules
      this.dialogFormVisible = true
    },
    delRole(id) {
      del(id)
        .then(res => {
          if (res.code === 200) {
            this.$toast.show('删除成功')

            return
          }
        })
        .catch(() => {
          this.$toast.show('删除失败', 'error')
        })
        .finally(() => {
          this.fetchData()
        })
    },
    statusChange({ role_id, status }) {
      changeStatus(role_id, status)
        .then(res => {
          if (res.code === 200) {
            this.$toast.show('更改成功！')
          } else {
            this.$toast.show('更改失败', 'error')
          }
        })
        .catch(() => {
          this.$toast.show('更改失败', 'error')
        })
        .finally(() => {
          this.fetchData()
        })
    },
    handleSizeChange(val) {
      this.queryParams.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.fetchData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.search-title {
  margin-bottom: 20px;
  float: left;
}
</style>
