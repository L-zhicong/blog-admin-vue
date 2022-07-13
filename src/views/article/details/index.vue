<template>
  <div class="app-container">
    <el-form ref="articleForm" :model="articleForm" label-width="80px" :rules="rules">
      <div class="article">
        <div class="article-info">
          <div class="title">文章信息</div>
          <div class="article-form">
            <el-form-item label="文章名称" prop="name">
              <el-input v-model="articleForm.name" placeholder="请输入文章的名称" clearable />
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="articleForm.title" placeholder="请输入文章的标题" clearable />
            </el-form-item>
            <el-form-item label="文章分类" prop="cid">
              <el-select v-model="articleForm.cid" placeholder="请选择文章的分类" filterable clearable @focus="getCategoryLst">
                <el-option v-for="item in cIdOptions" :key="item.article_category_id" :label="item.title" :value="item.article_category_id" :disabled="item.disabled" />
              </el-select>
            </el-form-item>
            <el-form-item label="来源" prop="source">
              <el-input v-model="articleForm.source" placeholder="请输入文章的来源" clearable />
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="articleForm.author" placeholder="请输入文章的作者" clearable />
            </el-form-item>
            <el-form-item label="关联词" prop="related_words">
              <el-input v-model="articleForm.related_words" placeholder="请输入文章的关联词" clearable />
            </el-form-item>
            <el-form-item label="发布时间" prop="release_time">
              <el-date-picker v-model="articleForm.release_time" type="datetime" placeholder="选择日期时间" :picker-options="pickerOptions" />
            </el-form-item>
            <el-form-item label="摘要" prop="abstract">
              <el-input v-model="articleForm.abstract" placeholder="请输入文章的摘要" clearable maxlength="200" type="textarea" :rows="5" @input="abInput" />
              <span class="word-lomit"> 字数限制：{{ abstractEnter }}/200</span>
            </el-form-item>
            <el-form-item label="logo" prop="logo">
              <VuploadImg ref="uploadImgDel" :file-list="fileList" :upload-type="2" @imgSuccess="imgSuccess" />
            </el-form-item>
          </div>
        </div>
        <div class="article-content">
          <div class="title">文章内容</div>
          <div class="article-form">
            <el-form-item label="正文内容" prop="content">
              <quillEditor ref="myTextEditor" v-model="articleForm.content" class="editor" :options="editorOption" />
              <input id="upload-article-img" type="file" style="display:none" @change="uploadArticleImgChange">
            </el-form-item>
            <el-form-item class="article-btn">
              <el-button type="article-btn" @click="onsubmit('articleForm')">保存</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import VuploadImg from '@/components/Base/uploadImg/uploadImg.vue'
import { getCategoryList, create, getInfo, update } from '@/api/article.js'
import { uploadImg } from '@/api/config'
import { pickerOptions, dataMillisecond } from '@/utils/index.js'
import { handelSpecialConfirm, handleCofirm } from '@/utils/message-box.js'
import { beforeImgUpload } from '@/utils/methods-operation.js'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'Detail',
  components: {
    VuploadImg,
    quillEditor
  },
  beforeRouteLeave(to, from, next) {
    if (this.routeLeave) {
      // handleCofirm('您编辑的文章还未保存，确定要离开吗？')
      //   .then(() => {
      next()
      //   })
      //   .catch(() => {
      //     next(false)
      //   })
    } else {
      // 新建和保存时
      next(false)
      this.$store.dispatch('delVisitedViews', this.$route)
      next()
    }
  },
  data() {
    return {
      articleForm: {
        cid: null,
        name: '',
        logo: '',
        title: '',
        abstract: '',
        content: '',
        related_words: '',
        source: '',
        author: '',
        release_time: null
      },
      //   文章分类
      cIdOptions: [],
      fileList: [],
      rules: {
        cid: { required: true, message: '请选择分类', trigger: 'change' },
        name: { required: true, message: '请输入名称', trigger: 'change' },
        // logo: { required: true, message: '请上传logo', trigger: 'blur' },
        title: { required: true, message: '请输入标题', trigger: 'change' },
        abstract: { required: true, message: '请输入摘要', trigger: 'change' },
        content: { required: true, message: '请输入内容', trigger: 'change' },
        related_words: { required: true, message: '请输入关键词', trigger: 'change' },
        source: { required: true, message: '请输入来源', trigger: 'change' },
        author: { required: true, message: '请输入作者', trigger: 'change' },
        release_time: { required: true, message: '请选择发布时间', trigger: 'change' }
      },
      //   限制选择今日之前的时间
      pickerOptions: pickerOptions,
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
              ['blockquote', 'code-block'], // 引用  代码块
              [{ header: 1 }, { header: 2 }], // 1、2 级标题
              [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
              [{ script: 'sub' }, { script: 'super' }], // 上标/下标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              [{ direction: 'rtl' }], // 文本方向
              [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
              [{ align: [] }], // 对齐方式
              ['link', 'image'], // 链接、图片、视频
              [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
              ['clean'] // 清除文本格式
            ],
            handlers: {
              image: e => {
                document.getElementById('upload-article-img').click()
              }
            }
          } // 工具菜单栏配置
          // imageResize: {
          //   modules: ['Resize', 'DisplaySize']
          // }
        },
        placeholder: '请输入文章的正文内容', // 提示
        readyOnly: false, // 是否只读
        theme: 'snow', // 主题 snow/bubble
        syntax: true // 语法检测
      },
      abstractEnter: 0,
      //   区别是用户退出true还是保存文章后退出false
      routeLeave: true
    }
  },
  destroyed() {
    window.onbeforeunload = null
  },
  mounted() {
    if (this.$route.params.id) {
      this.getCategoryLst()
      this.updateArticleForm(this.$route.params.id)
    }
    // 用户有无刷新界面
    window.onbeforeunload = function(e) {
      e = e || window.event
      if (e) {
        e.returnValue = '关闭提示'
      }
      return '关闭提示'
    }
  },
  methods: {
    uploadArticleImgChange({ target }) {
      const file = target.files[0]
      const formData = new FormData()
      formData.append('files', file)
      const flag = beforeImgUpload(file)
      if (flag) {
        uploadImg(formData).then(res => {
          const quill = this.$refs.myTextEditor.quill
          if (res.code === 200) {
            this.$toast.show('添加图片成功')
            const length = quill.getSelection().index // 光标位置
            // 插入图片  图片地址
            quill.insertEmbed(length, 'image', process.env.VUE_APP_BASE_API + res.data.url)
            // 调整光标到最后
            quill.setSelection(length + 1) // 光标后移一位
          }
        })
      }
    },
    //   文章分类
    getCategoryLst() {
      if (this.cIdOptions.length === 0) {
        getCategoryList().then(res => {
          this.cIdOptions = res.data
          res.data.forEach(item => {
            if (item.status === 1) {
              // 启用
              item['disabled'] = false
            } else {
              item['disabled'] = true
            }
          })
        })
      }
    },
    // 图片上传成功函数
    imgSuccess(val) {
      this.articleForm.logo = val
    },
    onsubmit(ruleForm) {
      this.$refs[ruleForm].validate(v => {
        if (v) {
          if (this.$route.params.id) {
            const articleForm = this.articleForm
            // console.log(articleForm)
            const finalForm = {
              cid: articleForm.cid,
              name: articleForm.name,
              logo: articleForm.logo,
              title: articleForm.title,
              abstract: articleForm.abstract,
              content: articleForm.content,
              related_words: articleForm.related_words,
              source: articleForm.source,
              author: articleForm.author,
              release_time: dataMillisecond(articleForm.release_time)
            }
            // console.log(finalForm)
            handleCofirm('确定保存文章吗？')
              .then(() => {
                this.updateArticle(finalForm)
              })
              .catch(() => {})
          } else {
            handleCofirm('确定保存文章吗？')
              .then(() => {
                this.articleForm.release_time = dataMillisecond(this.articleForm.release_time)
                this.createArticle(this.articleForm, ruleForm)
              })
              .catch(() => {})
          }
        } else {
          return false
        }
      })
    },
    createArticle(data, formName) {
      create(data).then(res => {
        if (res.code === 200) {
          this.routeLeave = false
          handelSpecialConfirm('添加文章完成，退出界面还是继续添加', '退出界面', '继续添加')
            .then(() => {
              this.$nextTick(() => {
                this.$router.push({ path: `/article/list` })
              })
            })
            .catch(action => {
              // 留下来继续添加
              if (action === 'cancel' || action === 'close') {
                this.$refs.uploadImgDel.delectImgList()
                this.$refs[formName].resetFields()
                this.routeLeave = true
              }
            })
        }
      })
    },
    // 编辑文章form
    updateArticleForm(id) {
      getInfo(id).then(res => {
        const data = res.data
        this.articleForm = data
        this.articleForm.content = data.content.content
        this.abstractEnter = data.abstract.length
        if (data.logo) this.fileList = [{ name: data.name, url: process.env.VUE_APP_BASE_API + data.logo }]
      })
    },
    // 编辑文章
    updateArticle(data) {
      update(this.$route.params.id, data).then(res => {
        if (res.code === 200) {
          this.routeLeave = false
          this.$toast.show('编辑成功,退出编辑界面...')
          setTimeout(() => {
            this.$nextTick(() => {
              this.$router.push({ path: `/article/list` })
            })
          }, 2000)
        }
      })
    },
    // 监听摘要的长度
    abInput() {
      console.log('ssss', this.articleForm.content)
      this.abstractEnter = this.articleForm.abstract.length
    }
    // 监听继续添加文章后输入,如果输入了文章名称
    // monitorInput() {
    //   this.routeLeave = true
    // }
  }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>
