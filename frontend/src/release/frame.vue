<template>
  <div class="appframe">
    <el-row>

      <el-col :span="4">

        <el-row class="tac">
          <el-col :span="24">
            <el-menu class="el-menu-vertical-demo" theme="dark" default-active="1-1">

              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>Release</template>
                <el-menu-item index="1-1">
                  <router-link to="/projects" class="link-text">list</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/addproject" class="link-text">add</router-link>
                </el-menu-item>
              </el-submenu>

              <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>System</template>
                <el-menu-item index="2-1">
                  <span class="link-text" @click='logout'>退出</span>
                </el-menu-item>
              </el-submenu>

            </el-menu>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <div class="router-content">
            <router-view name='content'></router-view>

          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function (e) {
      var _this = this
      this.$store.dispatch('logout', function (bool) {
        if (bool) {
          _this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="less">
  .appframe {
    overflow: hidden;
    min-height: 100vh;
    background: #1f2f3d;
    .project-card {
      border: none;
      padding: 30px 20px;
      background: #fff;
      box-shadow: none;
      overflow: hidden;
      border-radius: 0;
    }
    .nav_title {
      min-width: 201px;
      width: 100%;
      background: #324057;
      border-radius: 0;
      height: 70px;
      .site_title {
        padding: 15px 0 0 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        margin-left: 0 !important;
        display: block;
        height: 70px;
        margin: 0;
        line-height: 40px;
        img {
          display: block;
          float: left;
          width: 40px;
          height: 40px;
        }
        span {
          float: left;
          display: block;
          margin-left: 10px;
          font-weight: 400;
          font-size: 20px;
          color: #ECF0F1 !important;
          font-weight: 400;
        }
      }
    }
    .logo {
      min-width: 201px;
      height: 80px;
      padding: 15px 0 0 15px;
      img {
        display: block;
        float: left;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 4px solid #fff;
      }
      .info {
        float: left;
        color: #ECF0F1 !important;
        margin-left: 15px;
        p {
          margin: 0;
        }
        h2 {
          margin-top: 10px;
          color: #ECF0F1;
          font-size: 20px;
          span {
            margin-left: 5px;
            font-size: 12px;
            color: #c0ccda;
            cursor: pointer;
          }
        }
      }
    }
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
      background: #fff;
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
  }
</style>
