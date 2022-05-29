<template>
  <div class="app-container">
    <div class="clearfix search-title">
      <el-button
        type="primary"
        size="mini"
        @click="
          () => {
            (dialogFormVisible = true), (isUpdate = false);
          }
        "
      >添加管理员</el-button>
    </div>
    <div>
      <el-table
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
        <el-table-column label="ID" prop="admin_id" width="100px" />
        <el-table-column label="管理员姓名" prop="real_name" />
        <el-table-column label="身份" prop="rule_name" />
        <el-table-column label="账号" prop="account" />
        <el-table-column label="状态" min-width="140">
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
        <el-table-column label="账号" prop="account" />
        <el-table-column label="最后登录时间" prop="last_time" min-width="180" />
        <el-table-column label="操作" min-width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="updatePwd(scope.row.admin_id)">修改密码</el-button>
            <el-button type="warning" size="mini" @click="editAdmin(scope.row.admin_id)">编辑</el-button>
            <el-button type="info" size="mini" @click="delAdmin(scope.row.admin_id)">删除</el-button>
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
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" :show-close="false" :close-on-click-modal="false">
      <el-form ref="adminFormRef" :model="adminForm" :rules="adminRules" label-width="90px" class="add-admin">
        <el-form-item label="身份" class="select-full">
          <el-select v-model="adminForm.roles" multiple placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="管理员姓名">
          <el-input v-model="adminForm.real_name" autocomplete="off" placeholder="请输入管理员姓名" />
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="adminForm.account" autocomplete="off" placeholder="请输入账号" />
        </el-form-item>
        <template v-if="!isUpdate">
          <el-form-item label="密码" :prop="isUpdate ? '' : 'pwd'">
            <el-input v-model="adminForm.pwd" autocomplete="off" type="password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="确认密码" :prop="isUpdate ? '' : 'againPassword'">
            <el-input v-model="adminForm.againPassword" autocomplete="off" type="password" show-password placeholder="请输入确认密码" />
          </el-form-item>
        </template>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="adminForm.phone" autocomplete="off" maxlength="11" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="adminForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="updatePwdDialog" :show-close="false" :close-on-click-modal="false">
      <el-form ref="upPwdRef" :model="adminForm" :rules="adminRules" label-width="80px">
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="adminForm.pwd" autocomplete="off" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="againPassword">
          <el-input v-model="adminForm.againPassword" autocomplete="off" type="password" show-password placeholder="请输入确认密码" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatePwdDialog = false">取 消</el-button>
        <el-button type="primary" @click="updatePwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAdminList, create, getInfo, update, del, updatePwd, getRoleList, changeStatus } from '@/api/admin'
const defaultForm = () => {
  return {
    account: '', // 管理员名称
    pwd: '', // 密码
    phone: '', // 联系手机号
    againPassword: '', // 重复密码
    real_name: '', // 管理员姓名
    roles: [], // 角色
    status: 1 // 是否开启：1-开启，0-关闭。默认0
  }
}

export default {
  name: 'Index',
  // import引入的组件需要注入到components对象中才能使用
  components: {},
  data() {
    // 验证密码
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.adminForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 验证手机
    const validatorPhone = function(rule, value, callback) {
      if (value === '') callback()
      if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      dialogFormVisible: false,
      updatePwdDialog: false,
      cellStyle: {
        padding: 0
      },
      tableData: [],
      formTitle: '添加管理员',
      adminForm: defaultForm(),
      isUpdate: false,
      // 表单验证
      adminRules: {
        account: [
          { required: true, message: '请输入账号！', trigger: 'blur' },
          { min: 3, message: '账号长度在3位以上！', trigger: 'blur' }
        ],
        againPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
        pwd: [{ required: true, message: '请输入密码！', trigger: 'blur' }],
        phone: [{ validator: validatorPhone, trigger: 'blur' }]
      },
      formLabelWidth: '120px',
      roleList: [],
      queryParams: {
        page: 1,
        limit: 10,
        total: 0
      },
      tableHeight: window.innerHeight - 250
    }
  },
  computed: {},
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.$refs.adminFormRef.resetFields()
        this.adminForm = defaultForm()
      }
    },
    isUpdate(val) {
      if (val) return (this.formTitle = '编辑管理员信息')
      this.formTitle = '添加管理员'
    }
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.getTableHeight)
  },
  destroyed() {
    window.addEventListener('resize', this.getTableHeight)
  },
  // 方法集合
  methods: {
    getTableHeight() {
      this.tableHeight = window.innerHeight - 250
    },
    init() {
      getRoleList().then(res => {
        this.roleList = res.data
      })
      this.fetchData()
    },
    fetchData() {
      getAdminList(this.queryParams).then(res => {
        this.tableData = res.data.list
        this.queryParams.total = res.data.total
      })
    },
    onSubmit() {
      if (this.adminForm.admin_id) {
        update(this.adminForm.admin_id, this.adminForm)
          .then(res => {
            if (res.code === 200) {
              this.$toast.show('编辑成功')
              this.dialogFormVisible = false
              // this.$refs.adminFormRef.resetFields()
              this.adminForm = defaultForm()
              return
            }
            this.$toast.show('编辑失败', 'error')
          })
          .finally(() => {
            this.fetchData()
          })
      } else {
        create(this.adminForm)
          .then(res => {
            if (res.code === 200) {
              this.$toast.show('添加成功')
              this.dialogFormVisible = false
              // this.$refs.adminFormRef.resetFields()
              this.adminForm = defaultForm()
              return
            }
            this.$toast.show('编辑失败', 'error')
          })
          .finally(() => {
            this.fetchData()
          })
      }
    },
    statusChange({ admin_id, status }) {
      changeStatus(admin_id, Number(status))
        .then(res => {
          if (res.code === 200) {
            this.$toast.show('修改成功')
            return
          }
          this.$toast.show('修改失败', 'error')
        })
        .finally(() => {
          this.fetchData()
        })
    },
    editAdmin(id) {
      this.isUpdate = true

      getInfo(id).then(res => {
        this.adminForm = res.data
        this.dialogFormVisible = true
      })
    },
    delAdmin(id) {
      del(id)
        .then(res => {
          if (res.code === 200) {
            this.$toast.show('删除成功')
          } else {
            this.$toast.show('删除失败', 'error')
          }
        })
        .catch(() => {
          this.$toast.show('删除失败', 'error')
        })
        .finally(() => {
          this.fetchData()
        })
    },
    updatePwd(id) {
      if (typeof id === 'number') {
        this.adminForm.admin_id = id
        this.updatePwdDialog = true
      } else {
        this.$refs.upPwdRef.validate(valid => {
          if (valid) {
            updatePwd(this.adminForm.admin_id, this.adminForm)
              .then(res => {
                if (res.code === 200) {
                  this.$toast.show('修改密码成功')
                  this.updatePwdDialog = false
                } else {
                  this.$toast.show('修改密码失败', 'error')
                }
              })
              .catch(value => {
                this.$toast.show('修改密码失败', 'error')
              })
              .finally(() => {
                this.fetchData()
              })
          }
        })
      }
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
.add-admin {
  .select-full {
    ::v-deep {
      .el-select {
        width: 100%;
      }
    }
  }
}
.search-title {
  margin-bottom: 20px;
  float: left;
}
</style>
