<template>
  <div id="container">
    <div id="content">
      <nav>
        <ul class="menu">
          <li class="menu-item"><a>Insta360-DEV</a></li>
          <li class="menu-item"><a href="/">首页</a></li>
          <li class="menu-item"><a href="/">文档</a></li>
          <li class="menu-item"><a href="#/projects">项目</a></li>
          <li class="menu-item"><a href="#/login">登录</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
    }
  },

  components: {
  },

  methods: {
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
#container{
  background: url("../assets/bg_index.png") -50px 0;
  width: 100%;
  height: 2000px;
}
#content{
  width: 960px;
  margin:0 auto;
  .menu{
   list-style: none;
    margin: 0;
    padding-top: 16px;
    .menu-item{
      display: inline-block;
      height: 64px;
      line-height: 64px;
      margin-right: 70px;
    }
    .menu-item:first-child{
      font-size: 18px;
      margin-right: 100px;
      font-weight: bold;
    }
    a{
      color: #fff;
    }
  }
}
</style>
