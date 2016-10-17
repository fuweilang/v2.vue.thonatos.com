<template>
  <div id="app">
    <!-- <div>
      <el-row>
        <el-col :span="4">
          <div class="grid-list">
            <router-view name="navbar"></router-view>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content">
            <div class="top-nav">
              <div class="nav toggle">
                <a id="menu_toggle" class="menu_toggle">
                  <i class="fa fa-bars"></i>
                </a>
              </div>
            </div>
            <div class="router-content">
              <router-view></router-view>
            </div>
            <div class="footer">
              <span class="footer-text">©2016 Implements.io All Rights Reserved. Theme By Gentelella Alela!</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'user'
    }
  },
  methods: {
    loadMore () {
      console.log(this)
    }
  },
  watch: {
    selected (val) {
      console.log(this)
      this.$store.commit('increment')
      this._router.push(val)
    }
  }
}
</script>

<style lang="less">
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  * {
    font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
  }
  table{
    border-collapse:
    collapse;
    border-spacing:0;
  }
  fieldset,img{
    border:0;
  }
  a{
    text-decoration:none;
    color:#000;
  }
  h1,h2,h3,h4,h5,h6{
    font-size:100%;
    font-weight:normal;
  }
  .clearfix:after {
    content:"\200B"; 
    display:block; 
    height:0; 
    clear:both; 
  }
  .clearfix { 
    *zoom:1; 
  }
  
  #app {  
    overflow: hidden;
    display: flex;
    min-height: 100vh;
    flex-direction: column;

    .grid-list {
      min-height: 100vh;
      background: #2A3F54;
    }

    .grid-content {
      position: relative;
      width: 100%;
      min-height: 100vh;
      background: #F7F7F7;
      .top-nav {
        width: 100%;
        height: 50px;
        background: #EDEDED;
      }
      .footer {
        width: 100%;
        background: #fff;
        padding: 15px;
        text-align: right;
        span {
          color: #73879C;
          font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
          font-size: 13px;
          font-weight: 400;
        }
      }
    }
    
    .router-content{
      background: #F7F7F7;
      padding: 30px 15px;
    }
  }
</style>