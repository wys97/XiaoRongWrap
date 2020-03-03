<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <tabs-view></tabs-view>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <span class="login-name">{{loginName}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <div @click="TogglePwdShow">修改密码</div>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <div @click="logout">退出登录</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="update-pwd-container">
      <el-dialog title="修改密码" :visible.sync="pwdIsShow.opened" width="400px">

        <el-form :model="form" :rules="updateRules" ref="updateForm" label-position="left">
          <el-form-item  prop="oldPassword">
            <i class="iconfont icon-password-old"></i>
            <el-input name="oldPassword" :type="oldType" @keyup.enter.native="UpdatePassword" v-model="form.oldPassword" autoComplete="on" placeholder="旧密码" clearable></el-input>
            <span @click='changePwdType("old")'><i class="iconfont icon-close-eye" v-show="oldPwd"></i><i class="iconfont icon-open-eye" v-show="!oldPwd"></i></span>
          </el-form-item>

          <el-form-item  prop="newPassword">
            <i class="iconfont icon-password-new"></i>
            <el-input name="newPassword" :type="newType" @keyup.enter.native="UpdatePassword" v-model="form.newPassword" autoComplete="on" placeholder="新密码"></el-input>
            <span @click='changePwdType("new")'> <i class="iconfont icon-close-eye" v-show="newPwd"></i><i class="iconfont icon-open-eye" v-show="!newPwd"></i> </span>
          </el-form-item>

          <el-form-item  prop="confirmPassword">
            <i class="iconfont icon-password-confirm"></i>
            <el-input name="confirmPassword" :type="conType" @keyup.enter.native="UpdatePassword" v-model="form.confirmPassword" autoComplete="on" placeholder="确认密码"></el-input>
            <span @click='changePwdType("con")'> <i class="iconfont icon-close-eye" v-show="conPwd"></i><i class="iconfont icon-open-eye" v-show="!conPwd"></i></span>
          </el-form-item>

        </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="TogglePwdShow">取 消</el-button>
        <el-button type="primary" @click="UpdatePassword" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TabsView from './TabsView'
  import Hamburger from '@/components/Hamburger'
//  import userLogo from '@/assets/imgs/user-logo.jpg'

  export default {
    components: {
      TabsView,
      Hamburger
    },
    data () {
      const validateOldPassword = (rule, value, callback) => {
        if (value.length <= 0) {
          callback(new Error('请输入正确的密码'))
        } else {
          callback()
        }
      }
      const validateNewPassword = (rule, value, callback) => {
        if (value.length <= 0) {
          callback(new Error('请输入正确的密码格式'))
        } else {
          callback()
        }
      }
      const validateConfirmPassword = (rule, value1, callback) => {
        const value2 = this.form.newPassword
        if (value1 !== value2) {
          callback(new Error('确认密码应该和新密码一致'))
        } else {
          callback()
        }
      }
      return {
//        userLogo,
        form: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        updateRules: {
          oldPassword: [{ required: true, trigger: 'blur', validator: validateOldPassword }],
          newPassword: [{ required: true, trigger: 'blur', validator: validateNewPassword }],
          confirmPassword: [{ require: true, trigger: 'blur', validator: validateConfirmPassword }]
        },
        loading: false,
        oldType: 'password',
        newType: 'password',
        conType: 'password',
        oldPwd: true,
        newPwd: true,
        conPwd: true,
        pwdIsShow: {
          opened: false
        }
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'loginName'
      ])
    },
    methods: {
      changePwdType (key) {
        if (this[key + 'Type'] === 'password') {
          this[key + 'Type'] = ''
          this[key + 'Pwd'] = false
        } else {
          this[key + 'Type'] = 'password'
          this[key + 'Pwd'] = true
        }
      },
      toggleSideBar () {
        this.$store.dispatch('ToggleSideBar')
        setTimeout(() => {
          this.$store.dispatch('SetTableMaxHeight')
        }, 500)
      },
      TogglePwdShow () { // 忘记密码dialog 是否显示
        this.form = {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
        this.pwdIsShow.opened = !this.pwdIsShow.opened
      },
      UpdatePassword () {
        this.$refs.updateForm.validate(valid => {
          if (valid) {
            this.loading = true
            let passwordInfo = {
              oldPassword: this.form.oldPassword,
              newPassword: this.form.newPassword
            }
            this.$store.dispatch('UpdatePassword', passwordInfo).then((response) => {
              this.loading = false
              if (response.data.code === '200') {
                this.$router.push({ path: '/' })
                this.$message.success(response.data.message)
                this.logout()
              } else {
                this.form = {
                  oldPassword: ''
                }
                this.$message.error(response.data.message)
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      logout () {
        this.$store.dispatch('LogOut').then(() => {
          this.$store.dispatch('CleanPermissionRouters').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      },
      resetForm () {
        this.$refs.form.resetFields()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .update-pwd-container{
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px #fff inset !important;
    }
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 0 12px 0;
      height: 47px;
    }
    .iconfont{
      margin: 0 8px;
      font-size: 18px;
    }
    .el-dialog__body{
      padding:0 20px;
    }
    .el-form-item {
      border: 1px solid #ccc;
      border-radius: 5px;
      color: #454545;
      width:360px;
      &:last-of-type{
        margin-bottom: 0;
      }
    }
    .el-input {
      width: 270px;
      display: inline-block;
    }
  }
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .login-name{
          // margin-right: 10px;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 12px;
        }
      }
    }
  }
</style>



