<template>
  <div>
    <el-dialog :title="formTitle" :visible.sync="visible" :show-close="false" :close-on-click-modal="false">
      <el-form ref="menuFormRef" :model="menuForm" :rules="menuRules">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menu_name">
          <el-input v-model="menuForm.menu_name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="路由地址" :label-width="formLabelWidth" prop="route">
          <el-input v-model="menuForm.route" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth">
          <e-icon-picker ref="iconPicker" v-model="menuForm.icon" :options="options" />
        </el-form-item>
        <el-form-item label="是否显示" :label-width="formLabelWidth">
          <el-switch v-model="menuForm.is_show" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="是否为菜单" :label-width="formLabelWidth">
          <el-switch v-model="menuForm.is_menu" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="onSubmit('menuFormRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { add, update, getInfo } from '@/api/menu'

const menuFormDefault = () => {
  return {
    menu_name: '', // 菜单名称
    route: '', // 路由
    icon: '',
    is_show: 1, // 是否显示
    is_menu: 1, // 类型，1菜单 0 权限
    pid: 0, // 上级pid
    plat_type: window.location.pathname === '/setting/schoolMenu' ? 2 : 1 // 如果是要创建学校菜单传2
  }
}
export default {
  props: {
    formTitle: {
      type: String,
      default: '添加菜单'
    },
    visible: {
      type: Boolean,
      default: false
    },
    menuId: {
      type: Number,
      default: null
    },
    // 操作栏，null为添加子菜单，1为编辑
    operationType: {
      type: Number,
      default: null
    },
    // 添加子菜单id
    pId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formLabelWidth: '90px',
      menuForm: menuFormDefault(),
      menuRules: {
        menu_name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        route: [{ required: true, message: '请输入路由地址', trigger: 'blur' }]
      },
      options: {
        ElementUI: true,
        FontAwesome: false,
        eIcon: false, // 自带的图标，来自阿里妈妈
        eIconSymbol: false, // 是否开启彩色图标
        addIconList: [],
        removeIconList: []
      }
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        // this.$refs.menuFormRef.resetFields()
        this.menuForm = menuFormDefault()
      } else {
        if (this.operationType === 2 && this.menuId) this.updateForm(this.menuId)
        if (this.operationType === 1 && this.pId) this.menuForm.pid = this.pId
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    },
    updateForm(id) {
      getInfo(id).then(res => {
        this.menuForm = res.data.info
        this.menuForm.is_show = JSON.parse(res.data.info.is_show)
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.menuForm.menu_id)
          if (this.menuForm.menu_id) {
            update(this.menuForm.menu_id, this.menuForm).then(res => {
              if (res.code === 200) {
                this.$toast.show('编辑成功')
                this.$emit('fetchData')
              }
            })
          } else {
            add(this.menuForm).then(res => {
              this.$toast.show(res.msg)
              this.$emit('fetchData')
            })
          }
          this.closeDialog()
          this.menuForm = menuFormDefault()
        } else {
          return false
        }
      })
    }
  }
}
</script>
