<template>
    <div id="content">
      <nav>
        <ul class="menu">
          <li class="menu-item brand"><router-link to="/">Insta360-DEV</router-link></li>
          <li class="menu-item"><router-link to="/">首页</router-link></li>
          <li class="menu-item"><router-link to="/docs">文档</router-link></li>
          <li class="menu-item"><a @click="showLoginDialog" class="cursor-pointer">项目</a></li>

          <li class="menu-item" v-show="loginButtonVisible"><a @click="showLoginDialog" class="cursor-pointer" >登录</a></li>

          <li class="menu-item" v-show="!loginButtonVisible"><a @click="logout" class="cursor-pointer" >退出</a></li>
        </ul>
      </nav>
      <el-dialog title="登录" v-model="loginDialogVisible" class="login-dialog" size="tiny">
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
      </el-dialog>

    </div>
</template>
<script>
export default {
  name: 'login',
  methods: {
  // 输入键为Enter登录
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
              // 隐藏登录按钮和登录框，显示退出按钮
                _this.loginButtonVisible = false
                _this.loginDialogVisible = false
                _this.$router.push('/projects')
              }
            }
          })
        } else {
          console.log('error')
          return false
        }
      })
    },
    showLoginDialog: function () {
      this.$store.dispatch('validGuard', bool => {
        if (bool) {
          this.$router.push('/projects')
        } else {
          this.loginDialogVisible = true
        }
      })
    },
    logout: function () {
      this.$store.dispatch('logout', bool => {
        this.$router.push('/')
        this.loginButtonVisible = true
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
      },
      loginDialogVisible: false,
      loginButtonVisible: true
    }
  },
  created () {
  // 根据登录状态决定是否显示登录按钮
  // 使用箭头函数this指向不变
    this.$store.dispatch('validGuard', bool => {
      this.loginButtonVisible = !bool
    })
  }
}
</script>
<style lang="less" scoped>
  #content{
    width: 960px;
    margin:0 auto;
    position: fixed;
    top: 0;
    left: 50%;
    margin-left:-480px ;
  }
  .menu{
    list-style: none;
    margin: 0;
    padding-top:16px ;
    .menu-item{
      display: inline-block;
      height: 64px;
      line-height: 64px;
      margin-left: 80px;
      a{
        color: #fff;
      }
      .cursor-pointer{
        cursor: pointer;
      }
    }
    .brand{
      font-size: 18px;
      font-weight: bold;
    }

  }
  .btn-box{
    text-align: center;
  }
</style>
