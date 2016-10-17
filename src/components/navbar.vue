<template>
  <div class="navbar">
    <div class="logo">
      <a href="/" class="site_title">
        <span class="impl-logo">
          <img src="" alt="">
        </span>
        <span>Insta360-DEV</span>
      </a>
    </div>
    <el-row class="tac">
      <el-col>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>Projects</template>
            <el-menu-item index="1-1">List</el-menu-item>
            <el-menu-item index="1-2">Add</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>System</template>
            <el-menu-item index="2-1">More</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  }
}
</script>

<style lang="less">
  .navbar {
    .logo {
      height: 55px;
      a {
        display: block;
        width: 100%;
        height: 100px;
        background: #888;
      }
    }
  }
</style>
