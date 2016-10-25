<template>
  <div id="app">
    <el-row>

      <el-col :span="4">

        <el-row class="tac">
          <el-col :span="24">
            <el-menu class="el-menu-vertical-demo" theme="dark" prop>
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>Projects</template>
                <el-menu-item index="1-1">
                  <router-link to="/list" class="link-text">list</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/add" class="link-text">add</router-link>
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>System</template>
                <el-menu-item index="2-1">
                  <router-link to="/more" class="link-text">more</router-link>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>

      </el-col>
      
      <el-col :span="20">
        <div class="grid-content">
          <div class="router-content">
            
            <router-view></router-view>

          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

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
    box-sizing: border-box;
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
    margin: 0;
    padding: 0;
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
    min-height: 100vh;
    background: #1f2f3d;
    .link-text {
      display: block;
      width: 100%;
      height: 100%;
      color: #c0ccda;
    }

    .grid-content {
      position: relative;
      width: 100%;
      min-height: 100vh;
      background: #eff2f7;
      .footer {
        width: 100%;
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
      padding: 30px;
    }
  }
</style>