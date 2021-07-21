<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="imgPreview"
      :file-list="fileList"
      :on-remove="imgRemove"
      :on-change="imgChange"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" style="width:180px" :percentage="percent" />
    <el-dialog
      title="图片预览"
      :visible.sync="showImg"
    >
      <img
        :src="imgUrl"
        width="100%"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDA8rJUP3QWLtBCwOaV9WeV5OQBfsoTrxm',
  SecretKey: 'bvykNjpe1B6lALGvKUO3TeZFfplQpysW'
})
export default {
  name: 'VueHrsaasIndex',

  data() {
    return {
      fileList: [],
      showImg: false,
      imgUrl: '',
      currentFileUid: null,
      showPercent: false, // 图片上传展示,
      percent: null
    }
  },

  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },

  mounted() {

  },
  methods: {
    // 图片预览
    imgPreview(file) {
      this.imgUrl = file.url
      this.showImg = true
    },
    // 图片删除
    imgRemove(file, fileList) {
      this.fileList = fileList
    },
    // 图片选中
    imgChange(file, fileList) {
      this.fileList.push(fileList)
      console.log(this.fileList)
    },
    // 文件上传前
    beforeUpload(file) {
      console.log(file)
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      // 校验格式
      if (!types.includes(file.type)) {
        this.$message.error('图片格式不正确!')
        return false
      }
      // 校验大小
      const maxFile = 1024 * 1024
      if (file.size > maxFile) {
        this.$message.error('头像大小不能超过1M!')
        return false
      }
      this.currentFileUid = file.uid // 记住当前的uid
      this.showPercent = true
      return true
    },
    upload(params) {
      cos.putObject({
        Bucket: 'hrsaas-1259526997', /* 必须 */
        Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
        Key: params.file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: params.file, // 上传文件对象
        onProgress: (progressData) => {
          this.percent = progressData.percent * 100
        }
      }, (err, data) => {
        if (!err && data.statusCode === 200) {
          this.$message.success('图片上传成功!')
        }
        // 关闭上传展示
        this.showPercent = true
      })
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
