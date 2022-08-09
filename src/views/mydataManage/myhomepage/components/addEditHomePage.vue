<template>
  <div class="homepage-dialog">
    <el-dialog :title="title" :visible.sync="visible" :show-close="false" :close-on-click-modal="false">
      <el-form ref="categoryForm" :model="categoryForm" :rules="rules" label-width="80px" class="demo-ruleForm" label-position="right">
        <el-form-item label="名称" prop="title">
          <el-input v-model="categoryForm.title" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="摘要" prop="info">
          <el-input v-model="categoryForm.info" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-select v-model="skills" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="6"><CProgress class="c-progress" :percent="progress" /></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="分类状态" prop="status">
          <el-radio-group v-model="categoryForm.status">
            <el-radio v-for="(item, index) in statusRadio" :key="index" :label="item.value" border size="mini">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类图片" prop="image">
          <VuploadImg ref="uploadImgDel" :file-list="fileList" @imgSuccess="imgSuccess" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="categoryForm.sort" :min="1" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="onsubmit('categoryForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VuploadImg from '@/components/Base/uploadImg/uploadImg.vue'
import { categoryCreate, categoryUpdate, getCategoryInfo } from '@/api/article.js'
import CProgress from '@/components/Base/Progress/index.vue'
export default {
  components: {
    VuploadImg,
    CProgress
  },
  props: {
    title: {
      type: String,
      default: '添加文章分类'
    },
    visible: {
      type: Boolean,
      default: false
    },
    categoryId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      skills: '',
      progress: 10,

      categoryForm: {
        status: 0,
        sort: 1
      },
      rules: {
        title: { required: true, message: '请输入分类名称', trigger: 'change' },
        info: { required: true, message: '请输入分类简介', trigger: 'change' },
        status: { required: true, message: '请选择状态', trigger: 'blur' },
        // image: { required: true, message: '请上传分类图片', trigger: 'change' },
        sort: { required: true, message: '请输入分类排序', trigger: 'change' }
      },
      statusRadio: [
        {
          label: '异常',
          value: 0
        },
        {
          label: '正常',
          value: 1
        }
      ],
      fileList: []
    }
  },
  watch: {
    visible(val) {
      if (val && this.title === '编辑文章分类') this.updateCategoryForm(this.categoryId)
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    },
    onsubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.title === '编辑文章分类') this.updateCategory(this.categoryId, this.categoryForm)
          if (this.title === '添加文章分类') this.addCategory(this.categoryForm)
        } else {
          return false
        }
      })
    },
    // 图片上传成功函数
    imgSuccess(val) {
      // console.log('返回的参数' + val)
      this.categoryForm.image = val
    },
    // 编辑form表单
    updateCategoryForm(id) {
      getCategoryInfo(id).then(res => {
        const data = res.data
        this.categoryForm = {
          title: data.title,
          info: data.info,
          status: data.status,
          sort: data.sort
        }
        if (data.image) this.fileList = [{ name: data.title, url: process.env.VUE_APP_BASE_API + data.image }]
      })
    },
    // 提交编辑
    updateCategory(id, data) {
      categoryUpdate(id, data)
        .then(res => {
          if (res.code === 200) {
            this.closeDialog()
            this.$toast.show('编辑成功')
          }
        })
        .finally(() => {
          this.$emit('fetchData')
        })
    },
    // 提交添加
    addCategory(data) {
      categoryCreate(data)
        .then(res => {
          if (res.code === 200) {
            this.closeDialog()
            this.$toast.show('添加成功')
          }
        })
        .finally(() => {
          this.$emit('fetchData')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
