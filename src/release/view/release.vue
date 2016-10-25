<template>
  <div class="list">

    <div class="datalist-title clearfix">
      <h3>Release</h3>
      <a class="collapse-link">
        <i class="el-icon-arrow-up"></i>
      </a>
    </div>

    <el-card class="box-card">
      <div class="btn-box clearfix">
        <el-button type="primary">
          <router-link :to="{ path: '/release/add', query: { pid: pid, owner: owner }}">
            <span>Add Release</span>
          </router-link>
        </el-button>
      </div>

      <ul class="datatable">
        <li class="datatable-title">
          <el-row>
            <el-col :span="2">
              <div class="ceil">
                <span>Version</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="ceil">
                <span>Owner</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="ceil">
                <span>Summary</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="ceil">
                <span>Created</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="ceil">
                <span>Link</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="ceil">
                <span>#Edit</span>
              </div>
            </el-col>
          </el-row>
        </li>
        <li v-for="item in release.releases" class="data">
          <div class="item" @click="item.deschide=!item.deschide">
            <el-row>
              <el-col :span="2">
                <div class="ceil">
                  <span>{{ item.version }}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="ceil">
                  <span>{{ owner }}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="ceil">
                  <span v-if="!!item.summary">{{ item.summary }}</span>
                  <span v-else> -- </span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="ceil">
                  <span v-if="!!item.createdAt">{{ item.createdAt }}</span>
                  <span v-else> -- </span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="ceil">
                  <el-button size="mini" type="primary">
                    <a :href="item.link" class="link-a">Download</a>
                  </el-button>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="ceil" v-if="owner === admin">
                  <el-button size="mini" type="primary">
                    <router-link :to="{ path: '/release/add', query: { pid: pid, rid: item._id, owner:owner }}" class="edit-btn">
                      <i class="el-icon-edit"></i>
                      <span>Edit</span>
                    </router-link>
                  </el-button>
                  <el-button size="mini" type="primary">
                    <div @click="openPopup(item._id)">
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
          :current-page="release.currentPage"
          :page-size="12"
          layout="prev, pager, next, jumper"
          :total="release.pageTotal">
        </el-pagination>
      </div>

    </el-card>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'release',

  computed: {
    ...mapGetters({
      release: 'release',
      admin: 'admin'
    })
  },

  methods: {
    ...mapActions([
      'loadRelease'
    ]),
    handleCurrentChange: function (index) {
      this.$store.dispatch('loadRelease', {
        p: 12,
        c: parseInt(index),
        pid: this.pid
      })
    },
    openPopup: function (id) {
      var _this, rid
      rid = id
      _this = this
      if (!rid) {
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteRelease', {
          rid: rid,
          action: function (data) {
            if (data.code === 1) {
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
      var pid, owner
      pid = this.$route.params.id
      owner = this.$route.params.owner
      if (!pid && !owner) {
        return
      }
      this.pid = pid
      this.owner = owner
      this.$store.dispatch('loadRelease', {
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
      release: {},
      owner: '',
      pid: '',
      admin: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @color: #73879C;
  .list {
    padding-right: 50px;
    .datalist-title {
      padding: 10px 20px 10px 10px;
      h3 {
        float: left;
        height: 30px;
        line-height: 30px;
        font-size: 17px;
        color: @color;
      }
      .collapse-link {
        display: block;
        float: right;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        i {
          display: block;
          width: 14px;
          height: 14px;
          font-size: 14px;
          line-height: 14px;
          color: #C5C7CB;
          cursor: pointer;
        }
      }
    }
    .btn-box {
      padding: 0px 10px 20px 10px;
      button {
        float: right;
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
        .ceil {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 40px;
          padding-left: 18px;
          padding-right: 18px;
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
      text-align: right;
    }
  }
</style>
