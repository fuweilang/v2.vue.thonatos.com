<template>
  <div id="container">
    <nav>
      <el-menu mode="horizontal" class="menu">
        <div>
          <el-menu-item class="nav-item title" index="1">
            <router-link to="/">Insta360-DEV</router-link>
          </el-menu-item>
          <el-menu-item index="2" class="nav-item">
            <router-link to="/">首页</router-link>
          </el-menu-item>
          <el-menu-item index="3" class="nav-item">
            <router-link to="/projects">项目列表</router-link>
          </el-menu-item>
          <el-menu-item index="4" class="nav-item">
            <router-link to="/">文档中心</router-link>
          </el-menu-item>
          <el-menu-item index="5" class="nav-item">
            <router-link to="/login">登录</router-link>
          </el-menu-item>

        </div>
      </el-menu>
    </nav>
    <div id="console" v-html="content"></div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      content: '',
      index: 1,
      intervalId: '',
      speed: 250,
      text:
      'C:>int main()<br/>' +
      'C:>{<br/>' +
      'C:>cout << "Hello world!" << endl;<br/>' +
      'C:>cout << "Hello Insta360!" << endl;<br/>' +
      'C:>return 0;<br/>' +
      'C:>}<br/>' +
      'Hello world!<br/>' +
      'Hello Insta360!'
    }
  },

  components: {
  },

  methods: {
    // 打印函数，每次打印一个字符
    typing: function () {
      this.content = this.text.substring(0, this.index++) + '_'
      // 打印完成，重置索引，清除计时器
      if (this.index > this.text.length) {
        this.index = 0
        clearInterval(this.intervalId)
      }
    },
    // 输出代码，所输出的代码在data设置
    codeOutput: function () {
      this.intervalId = setInterval(this.typing, this.speed)
    }
  },
  created () {
    this.codeOutput()
    // 设置打印间隔时间
    var totlalTime = this.text.length * this.speed + 2500
    setInterval(this.codeOutput, totlalTime)
  }
}
</script>
<style lang="less" scoped>
  #container{
    background:#01091c url('../assets/desktop.png') 0 -120px;
    /* 容器设置足够大，避免窗口高度太大时无内容 */
    /* 在index.html中设置over:hidden*/
    height:2000px;
  }
  nav div{
    width: 800px;
    margin: 0 auto;
    .title{
      font-size:20px !important;
    }
    .nav-item{
      font-size:16px;
    }
  }

  #console{
    width: 800px;
    height: 438px;
    margin: 100px auto;
    padding-top: 30px;
    padding-left: 5px;
    background:url('../assets/console_header.png') no-repeat;
    color: green;
    font-size: 28px;
    line-height: 1.5;
    border: 1px solid #ccc;
    letter-spacing: 1.5px;
    /* 设置文字不可选 */
    user-select: none;
  }
</style>
