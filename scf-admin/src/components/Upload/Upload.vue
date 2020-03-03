<template>
  <div class="upload-container">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :before-upload = "beforeUpload"
      :action= "actionUrl"
      :data= "dataObj"
      :on-success= "handleSuccess"
      :on-change="handleChange"
      :on-error = "handleError"
      :disabled = "disabled"
      :multiple= "false"
      :show-file-list= "false">
      <template v-if="dataObj.isImage">
        <img v-if="currentFileUrl" :src="currentFileUrl" class="avatar">
        <template v-else>
          <div class="avatar-uploader-img" v-if="addTip"><span class="el-icon-plus"></span><span>{{addTip}}</span></div>
          <div class="el-icon-plus avatar-uploader-img" v-else></div>
        </template>
      </template>
      <template v-else>
        <i class="el-icon-edit-outline avatar-uploader-file" v-if="currentFileUrl"></i>
        <i class="el-icon-plus avatar-uploader-file" v-else></i>
      </template>
    </el-upload>
    <template v-if="dataObj.isImage">
      <i @click="doDelete" class="el-icon-delete img-delete" v-if="canDelete && currentFileUrl  && !disabled"></i>
    </template>
    <template v-else>
      <span @click="doDelete" class="el-icon-delete file-delete" v-if="canDelete && currentFileUrl  && !disabled"></span>
      <el-button type="text" v-if="currentFileUrl" @click="downloadFile" style="vertical-align: top;">  <i class="el-icon-download
"></i> {{currentFileName ? currentFileName : currentFileUrl}}</el-button>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'Upload',
    props: {
      value: String,
      fileUrl: String,
      fileName: String,
      addTip: String,
      dataObj: {
        type: Object
      },
      canDelete: {
        type: Boolean,
        default: true
      },
      actionUrl: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      index:Number,
      fileTypes:{
      	type:String,
      	default:'png,jpeg,jpg'
      }
    },
    data () {
      return {
        currentFileUrl: '',
        currentFileName: '',
        fileData: '',
        loading: ''
      }
    },
    watch: {
      fileUrl (value) {
        this.currentFileUrl = value
      },
      fileName (value) {
        this.currentFileName = value
      }
    },
    mounted () {
      this.currentFileUrl = this.fileUrl
      this.currentFileName = this.fileName
    },
    methods: {
      emitInput (val) {
        this.$emit('input', val)
      },
      doDelete () { // 删除
        if (!this.disabled) {
          this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.emitInput('')
            this.currentFileUrl = ''
          }).catch(() => {
          })
        }
      },
      downloadFile () {
        window.location.href = this.currentFileUrl
      },
      beforeUpload (file) {
        //获取上传文件（图片）的大小（MB）
        var fileSize = Number(file.size) / 1024 / 1024;
        //获取上传文件（图片）的扩展名
        var fileNameArray = file.name.split('.');
        var fileTypeValue = "";
        if (fileNameArray.length > 1) {
            fileTypeValue = fileNameArray[fileNameArray.length - 1];
        }
        if(this.fileTypes.indexOf(fileTypeValue)!==-1){
        }else{
        	this.$message.error('仅限'+this.fileTypes+'的格式文件')
        	return;
        }
        if ((fileTypeValue == "jpg" || fileTypeValue == "png" || fileTypeValue == "jpeg" || fileTypeValue == "gif" || fileTypeValue == "pdf")) {
//          if (fileSize > 2) {
//              $.modalMsg("图片大小不可超过2MB", "error");
//              picUploadFlag = false;
//          }
        } else {
        		this.$message.error("请上传正确类型的文件")
//          $.modalMsg("请上传jpg,jpeg,gif或png类型的文件", "error");
//          picUploadFlag = false;
						return false;
				}
        this.loading = this.$loading({
          lock: true,
          text: '处理中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      },
      handleSuccess (res) {
        this.loading.close()
        if (res.code === '200') {
          this.emitInput(res.data.key)
          this.currentFileUrl = res.data.url
          this.$emit('uploadChange', this.fileData)
          this.$message.success(res.message)
        } else {
         // this.currentFileUrl = this.fileUrl
          this.$message.error(res.message)
        }
      },
      handleChange (file) {
        this.fileData = {
        	file:file,
        	index:this.index
        }
//        if (this.dataObj.isImage) {
//          this.imgShow()
//        }
      },
      handleError () {
        this.loading.close()
       // this.currentFileUrl = this.fileUrl
      },
      imgShow () {
        const file = this.$refs['upload'].$el.getElementsByTagName('input')[0].files[0]
        if (file) {
          this.currentFileUrl = window.URL.createObjectURL(file)
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .upload-container{
    position: relative;
    display: inline-block;
    margin-right: 10px;
    overflow: hidden;
    .img-delete{
      position: absolute;
      right:0;
      top:0;
      width:30px;
      height:30px;
      color:red;
      font-size: 22px;
      line-height: 30px;
      text-align: center;
      z-index: 2;
      cursor: pointer;
    }
    .file-delete{
      width:30px;
      margin: 0 5px;
      height:40px;
      color:red;
      vertical-align: top;
      font-size: 22px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
    }
    .el-icon-download{
      margin-right: 5px;
    }
  }
  .avatar-uploader{
    display: inline-block;
    width:122px;
    position: relative;
  }
  .avatar-uploader-img {
    color: #8c939d;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &.el-icon-plus{
      font-size: 28px;
    }
  }
  .avatar-uploader-file{
    width: 120px;
    color: #8c939d;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
