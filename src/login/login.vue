<template>
  <div id="app">
    <el-card class="login-box-card">
      <el-form :model="loginMsg" :rules="rules" ref="loginMsg" label-width="100px" class="demo-ruleForm">
        <el-form-item label="username *" prop="username">
          <el-input v-model="loginMsg.username"></el-input>
        </el-form-item>
        <el-form-item label="password *" prop="password">
          <el-input v-model="loginMsg.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" class="login" @click.native.prevent="loginFn">Log in</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',

  methods: {
    loginFn: function () {
      this.$refs.loginMsg.validate((valid) => {
        var _this = this
        if (valid) {
          this.$store.dispatch('login', {
            data: {
              admin: 'fuwl90@163.com',
              status: 1
            },
            callback: function (bool) {
              if (bool) {
                _this.$router.push('/list')
              }
            }
          })
        } else {
          console.log('error')
          return false
        }
      })
    }
  },

  data () {
    var validaeFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写此字段'))
      } else {
        callback()
      }
    }
    return {
      msg: '2222',
      loginMsg: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { message: '请填写此字段', trigger: 'blur' },
          { validator: validaeFn }
        ],
        password: [
          { message: '请填写此字段', trigger: 'blur' },
          { validator: validaeFn }
        ]
      }
    }
  }
}
</script>

<style lang="less">
  .login-box-card {
    width: 500px;
    margin: 200px auto;
  }
  .btn-box {
    text-align: center;
  }
</style>