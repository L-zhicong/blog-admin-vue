<!--
 * @Author: hy
 * @Date: 2021-05-14 09:56:44
 * @UpdateEditors:
 * @LastEditTime: 2021-07-16 16:50:47
 * @Description: 图片上传
 * @FilePath: \中后台\src\components\Base\uploadImg\uploadImg.vue
-->
<template>
  <div class="img-upload">
    <el-upload
      ref="uploadfiles"
      :action="uploadImg"
      :on-success="uploadSuccess"
      :list-type="uploadType === null ? 'picture' : 'picture-card'"
      :headers="headersToken"
      :data="uploadBeforeData"
      name="files"
      :limit="1"
      :on-exceed="handleExceed"
      :before-upload="beforeAvatarUpload"
      accept=".jpg,.jpeg,.png"
      :file-list="fileList"
      :class="uploadBtn ? 'disbutt' : '' || uploadType === null ? 'upload-demo' : 'upload-type-2'"
      :on-remove="onreMove"
    >
      <!-- <el-button size="small" type="primary" :disabled="uploadBtn">点击上传</el-button> -->
      <div v-if="uploadType === null" class="upload-i" :disabled="uploadBtn">
        <i class="el-icon-plus avatar-uploader-icon" />
      </div>
      <div v-else-if="uploadType === 2">
        <i slot="default" class="el-icon-plus" />
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth.js'
// import { uploadImgAddress } from '@/api/configInfor/index.js'

export default {
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    // 上传按钮禁用or可用
    uploadBtn: {
      type: Boolean,
      default: false
    },
    uploadType: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // 上传图片的地址
      uploadImg: 'process.env.VUE_APP_BASE_API + uploadImgAddress',
      //   上传头
      Token: null,
      hasFmt: false
    }
  },
  computed: {
    headersToken() {
      return {
        'x-token': this.Token
      }
    },
    // 上传前的数据
    uploadBeforeData() {
      return {
        // 系统身份2，学校身份3
        user_type: this.$USERIDENTITY ? 2 : 3
      }
    }
  },
  mounted() {
    this.getToken()
  },
  methods: {
    getToken() {
      this.Token = getToken()
    },
    // 删除
    onreMove(file, fileList) {
      // console.log(file, fileList)
      const imgSuccess = null
      this.$emit('imgSuccess', imgSuccess)
    },
    // 上传成功回调函数
    uploadSuccess(response) {
      if (response.code === 200) {
        const imgSuccess = response.data.url
        this.$emit('imgSuccess', imgSuccess)
        this.$toast.show(response.msg)
      } else {
        this.$toast.show('图片上传失败', 'error')
      }
    },
    // 图片超出个数
    handleExceed(files, fileList) {
      this.$toast.show(`当前限制选择 1 个图片，已选择了 ${files.length} 个图片`, 'warning')
    },
    // 上传照片前的格式
    beforeAvatarUpload(file) {
      const types = ['image/jpeg', 'image/jpg', 'image/png']
      const isImage = types.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$toast.show('只能上传jpg/png类型的图片', 'error')
      }
      if (!isLt2M) {
        this.$toast.show('上传图片大小不能超过 2MB!', 'error')
      }
      return isImage && isLt2M
    },
    // 删除图片列表
    delectImgList() {
      this.$refs.uploadfiles.clearFiles()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.img-upload {
  .disbutt {
    pointer-events: none;
    cursor: not-allowed;
  }
  .upload-i {
    width: 3.125rem;
    height: 3.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #606266;
  }
  .upload-type-2 {
    height: 80px;
    ::v-deep {
      .el-upload--picture-card {
        width: 80px;
        height: 80px;
        line-height: 86px;
      }
      .el-upload-list--picture-card,
      .el-upload-list__item {
        width: 80px;
        height: 80px;
        line-height: 86px;
      }
      .el-icon-upload-success {
        position: fixed;
        right: 13px;
      }
    }
  }
}
</style>
