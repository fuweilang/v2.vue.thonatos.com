<template>
  <div class="list">

    <div class="project-card">

      <div class="btn-box clearfix" v-if="cacheTid === tid">
        <el-button type="primary">
          <router-link :to="{ path: '/addrelease', query: { pid: pid, tid: tid }}">
            <span>Add Release</span>
          </router-link>
        </el-button>
      </div>

      <ul class="datatable">

        <li class="datatable-title">
          <el-row>
            <el-col :span="4">
              <span>版本</span>
            </el-col>
            <el-col :span="5">
              <span>概要</span>
            </el-col>
            <el-col :span="5">
              <span>创建时间</span>
            </el-col>
            <el-col :span="4">
              <span>Link</span>
            </el-col>
            <el-col :span="5">
              <span>编辑</span>
            </el-col>
          </el-row>
        </li>

        <li v-for="item in releaselist.rows" class="data">
          <div class="item" @click="item.deschide=!item.deschide">
            <el-row>
              <el-col :span="4">
                <span>{{ item.version }}</span>
              </el-col>
              <el-col :span="5">
                <span v-if="!!item.summary">{{ item.summary }}</span>
                <span v-else> 11 </span>
              </el-col>
              <el-col :span="5">
                <span v-if="!!item.createdAt">{{ item.createdAt }}</span>
                <span v-else> -- </span>
              </el-col>
              <el-col :span="4">
                <el-button size="mini" type="primary">
                  <a :href="item.link" class="link-a">Download</a>
                </el-button>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-button size="mini" type="primary">
                    <router-link :to="{ path: '/addrelease', query: { pid: pid, id: item.id, tid:tid }}" class="edit-btn">
                      <i class="el-icon-edit"></i>
                      <span>Edit</span>
                    </router-link>
                  </el-button>
                  <el-button size="mini" type="primary">
                    <div @click="openPopup(item.id)">
                      <i class="el-icon-delete"></i>
                      <span>Delete</span>
                    </div>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="detail" v-bind:class="{ 'hide': item.deschide}" v-html="item.desc">
          </div>
        </li>

      </ul>

      <div class="paging">
        <el-pagination
          @currentchange="handleCurrentChange"
          :current-page="releaselist.currentPage"
          :page-size="12"
          layout="prev, pager, next"
          :total="releaselist.pageTotal">
        </el-pagination>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'releaselist',

  computed: {
    ...mapGetters({
      releaselist: 'releaselist',
      cacheTid: 'getTid'
    })
  },

  methods: {
    ...mapActions([
      'loadReleaselist'
    ]),
    handleCurrentChange: function (index) {
      this.c = parseInt(index)
      this.$store.dispatch('loadReleaselist', {
        p: 12,
        c: this.c,
        pid: this.pid
      })
    },
    openPopup: function (id) {
      var _this = this
      if (!id || !this.pid) {
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteRelease', {
          id: id,
          pid: _this.pid,
          action: function (data) {
            if (data.bool) {
              _this.$message({
                type: 'success',
                message: data.msg
              })
              _this.loading()
            } else {
              _this.$message({
                type: 'error',
                message: data.msg
              })
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    loading: function () {
      var pid, tid
      this.$store.dispatch('setReleaseListEmpty')
      pid = this.$route.params.id
      tid = this.$route.params.tid
      if (!pid && !tid) {
        return
      }
      this.pid = pid
      this.tid = tid
      this.$store.dispatch('loadReleaselist', {
        pid: pid,
        p: 12,
        c: 1
      })
    }
  },

  created () {
    this.loading()
  },
  data () {
    return {
      releaselist: {},
      tid: '',
      pid: '',
      cacheTid: null,
      p: 12,
      c: 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @color: #73879C;
  .list {
    padding-right: 50px;
    .btn-box {
      padding-bottom: 20px;
      button {
        float: left;
        a {
          color: #fff;
        }
      }
    }
    .datatable {
      margin: 0;
      padding: 0;
      border: 1px solid #e0e6ed;
      li {
        display: block;
        border-top: 1px solid #e0e6ed;
        .item {
          height: 41px;
          font-size: 13px;
          color: @color;
          line-height: 41px;
        }
        .item:hover {
          background: rgb(201, 229, 245);
        }
        &.datatable-title {
          font-weight: bold;
          background: #eff2f7;
          border-top: 0;
        }
        .detail {
          display: block;
          font-size: 13px;
          color: @color;
          padding: 10px 18px;
          border-top: 1px solid #e0e6ed;
          background: #fafafa;
          &.hide {
            display: none;
          }
        }
        .el-col {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 40px;
          padding-left: 18px;
          padding-right: 18px;
          height: 40px;
          .edit-btn,
          .link-a {
            color: #fff;
          }
        }
      }
    }
    .paging {
      height: 30px;
      margin-top: 10px;
      text-align: center;
    }
  }
</style>
