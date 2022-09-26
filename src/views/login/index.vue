<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" auto-complete="on" label-position="left" :model="loginForm" :rules="rules">
      <div class="title-container">
        <img src="../../assets/common/logo.png" class="login-logo" alt="">
      </div>
      <el-form-item prop="mobile">
        <span class="svg-container el-icon-mobile-phone" />
        <el-input v-model="loginForm.mobile" type="text" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container el-icon-lock" />
        <el-input ref="password" v-model="loginForm.password" :type="passwordType" />
        <span class="svg-container" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-row>
        <el-col :span="18">
          <el-form-item prop="code">
            <span class="svg-container el-icon-key" />
            <el-input v-model="loginForm.code" autocomplete="new-code" type="" placeholder="请输入验证码" name="code" maxlength="4" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <img :src="`https://likede2-java.itheima.net/api/user-service/user/imageCode/${codeToken}`" class="code-image" @click="randomCode">
        </el-col>
      </el-row>
      <el-button class="loginBtn" :loading="loading" @click="login">登录</el-button>

    </el-form>

  </div>
  <!-- 环境变量的作用
  1. 正常公司中 有几个环境 4 开发 dev 测试 test 预发 uat 线上 pro
  2. 在项目里如何配置这几个环境  通过 .env 配置 base api
  开发环境的接口前缀 /api
  线上环境的接口前缀 /prod-api
  -->
</template>
<script>
import SvgIcon from '@/components/SvgIcon/index.vue'

export default {

  name: 'Login',
  components: { SvgIcon },
  data() {
    return {
      loginForm: {
        mobile: 'admin',
        password: 'admin',
        code: ''
      },
      passwordType: 'password',
      rules: {
        mobile: [
          {
            required: true, message: '请填入账号', trigger: 'blur'
          }
        ],
        password: [
          {
            required: true, message: '密码不能为空', trigger: 'blur'
          },
          {
            min: 5, max: 16, message: '密码应为5-16位', trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      loading: false,
      codeToken: ''
    }
  },
  created() {
    this.randomCode()
  },
  methods: {
    showPwd() {
      this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async randomCode() {
      const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      let res = ''
      for (let i = 0; i < 32; i++) {
        const id = Math.floor(Math.random() * 62)
        res += chars[id]
      }
      this.codeToken = res
    },
    async login() {
      try {
        // 先验证
        await this.$refs.loginForm.validate()
        this.loading = true
        const msg = await this.$store.dispatch('user/LoginAction', {
          clientToken: this.codeToken,
          code: this.loginForm.code,
          loginName: this.loginForm.mobile,
          loginType: 0,
          password: this.loginForm.password
        })
        if (msg !== '登录成功') {
          this.$message.error(msg)
        } else {
          this.$router.push('/home')
        }

        // 发送请求
      } finally {
        this.loading = false
      }
    }
  }

}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#d3e4ff;
$light_gray:#999;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: #999;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ccc;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
  }
  .el-form-item__error {
    color: #f56c6c;
  }
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
    width:100%;
    margin-bottom:30px;
    border: none;
    color: #fff;
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#ccc;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-logo{
      position: absolute;
      width: 96px;
      height: 96px;
      top: -120px;
      left: 50%;
      margin-left: -48px;
    }
  .login-form {
    position: absolute;
    width: 581px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-left: -259px;
    margin-top: -194px;
    padding: 76px 35px 0;
    background: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;

  }
  .code-image{
    display: block;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 18px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
