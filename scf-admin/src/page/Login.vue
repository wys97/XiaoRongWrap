<template>
  <div class="login-container" v-on:keyup.enter="handleLogin">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" >
      <h3 class="title">小融科技供应链金融</h3>

      <el-form-item prop="loginName">
        <i class="iconfont icon-account"></i>
        <el-input name="loginName" type="text" v-model="loginForm.loginName" autoComplete="on" placeholder="账号" clearable ref="loginName"></el-input>
      </el-form-item>

      <div class="password-form-item">
        <el-form-item prop="loginPassword">
          <i class="iconfont icon-password"></i>
          <el-input name="loginPassword" :type="pwdType" v-model="loginForm.loginPassword" autoComplete="on" placeholder="密码" clearable ref="loginPassword"></el-input>
          <span @click="changePwdType"><i class="iconfont icon-close-eye" v-show="pwdType=='password'"></i><i class="iconfont icon-open-eye" v-show="pwdType!='password'"></i></span>
        </el-form-item>
      </div>

      <div class="verifycode-form-item">
        <el-form-item prop="captcha">
          <i class="iconfont icon-vertify"></i>
          <el-input name="captcha" type="text" v-model="loginForm.captcha" autoComplete="on" placeholder="验证码" clearable ref="captcha"></el-input>
          <img v-bind:src="verifySrc" alt="验证码" class="img-code" @click="ChangeVerifySrc">
        </el-form-item>
      </div>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      const validateUsername = (rule, value, callback) => {
        if (value.trim() < 1) {
          callback(new Error('请输入正确的账号'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.trim().length < 1) {
          callback(new Error('密码不能小于1位'))
        } else {
          callback()
        }
      }
      const validateVerifyCode = (rule, value, callback) => {
        if (value.trim().length !== 4) {
          callback(new Error('验证码格式不正确'))
        } else {
          callback()
        }
      }
      return {
        loginForm: { // 登录时字段
          loginName: '',
          loginPassword: '',
          captcha: ''
        },
        loginRules: { // 登录规则
          loginName: [{ required: true, trigger: 'blur', validator: validateUsername }],
          loginPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
          captcha: [{ required: true, trigger: 'blur', validator: validateVerifyCode }]
        },
        pwdType: 'password', // 密码input的类型password和text类型
        verifySrc: '', // 验证码url
        loading: false // form表单提交时的状态
      }
    },
    methods: {
      changePwdType () {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      // 获取验证码
      ChangeVerifySrc () {
        let time = new Date().getMilliseconds()
        this.verifySrc = '/admin/login/captcha?d=' + time
      },
      // 登录
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('LoginByUsername', this.loginForm).then((response) => {
              this.loading = false
              this.$router.push({path: '/'})
              if (response.data.code === '200') {
              } else {
                this.$message.error(response.data.message)
                this.loginForm.captcha = ''
                this.ChangeVerifySrc()
                this.inputGetFocus()
              }
            }).catch(() => {
              this.loginForm.captcha = ''
              this.ChangeVerifySrc()
              this.inputGetFocus()
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            this.inputGetFocus()
            return false
          }
        })
      },
      // 获取焦点事件
      inputGetFocus () {
        if (this.loginForm.loginName.trim() < 1) {
          this.$refs.loginName.focus()
          return false
        }
        if (this.loginForm.loginPassword.trim() < 1) {
          this.$refs.loginPassword.focus()
          return false
        }
        if (this.loginForm.captcha.trim() !== 4) {
          this.$refs.captcha.focus()
          return false
        }
      }
    },
    created () {
      this.verifySrc = '/admin/login/captcha'
    },
    mounted () {
      const that = this
      setTimeout(function () {
        that.inputGetFocus()
      }, 800)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../style/mixin.scss";
  $bg:#1a7bc9;
  $dark_gray:#1a7bc9;
  $light_gray:#fff;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    .iconfont{
      margin: 0 8px;
    }
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
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
  .password-form-item{
    .el-input {
      width: 78%;
    }
  }
    .verifycode-form-item{
      .el-input {
        width: 65%;
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      margin: 0 auto 20px auto;
      text-align: center;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
      background: #fff;
      border-radius: 5px;
    }
    .el-form-item {
      border: 1px solid #ccc;
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .img-code{
      position: absolute;
      right: 10px;
      top: 15px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
  }
</style>
