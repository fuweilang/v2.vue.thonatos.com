<template>
  <div class="applogin">

    <el-card class="login-box-card">

      <el-form :model="loginMsg" :rules="rules" ref="loginMsg" label-width="100px" class="demo-ruleForm">

        <el-form-item label="jobnumber" prop="jobnumber">
          <el-input v-model="loginMsg.jobnumber" @keyup.native.prevent="passwordKeyup($event)"></el-input>
        </el-form-item>

        <el-form-item label="password" prop="password">
          <el-input v-model="loginMsg.password" type="password" @keyup.native.prevent="passwordKeyup($event)"></el-input>
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
    passwordKeyup: function (e) {
      if (e.keyCode === 13) {
        this.loginFn()
      }
    },
    loginFn: function () {
      this.$refs.loginMsg.validate((valid) => {
        var _this = this
        if (valid) {
          this.$store.dispatch('login', {
            data: {
              jobnumber: _this.loginMsg.jobnumber,
              password: _this.loginMsg.password
            },
            callback: function (bool) {
              if (bool) {
                _this.$router.push('/projects')
              }
            }
          })
        } else {
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
        jobnumber: '',
        password: ''
      },
      rules: {
        jobnumber: [
          { message: '请填写此字段', trigger: 'blur' },
          { validator: validaeFn }
        ],
        password: [
          { message: '请填写此字段', trigger: 'blur', required: true },
          { validator: validaeFn }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .applogin {
    overflow: hidden;
    min-height: 100vh;
    background: #1f2f3d;
  }
  .login-box-card {
    width: 500px;
    height: 194px;
    padding-right: 25px;
    position: fixed;
    left: 0;
    right: 0;
    top: -250px;
    bottom: 0;
    margin: auto;
  }
  .btn-box {
    text-align: center;
  }
</style>
