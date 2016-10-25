<template>
  <div class="list">

    <div class="datalist-title clearfix">
      <h3>Projects</h3>
    </div>

    <el-card class="box-card">
      <ul class="datatable">
        <li class="datatable-title">
          <el-row>
            <el-col :span="5">
              <div class="ceil">
                <span>Name</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="ceil">
                <span>Owner</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="ceil">
                <span>Created</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="ceil">
                <span>Visibility</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="ceil">
                <span>#Edit</span>
              </div>
            </el-col>
          </el-row>
        </li>
        <li v-for="item in list.projects" class="data">
          <div class='item' @click="item.deschide=!item.deschide">
            <el-row>
              <el-col :span="5">
                <div class="ceil">
                  <router-link :to="'/release/'+item._id + '/' + item.owner" class='link'>{{ item.name }}</router-link>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="ceil">
                  <span>{{ item.owner }}</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="ceil">
                  <span v-if="!!item.createdAt">{{ item.createdAt }}</span>
                  <span v-else> -- </span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="ceil">
                  <span>{{ item.visibility }}</span>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="ceil" v-if="item.owner === admin">
                  <el-button size="mini" type="primary" >
                    <router-link :to="{ path: '/add', query: { id: item._id }}" class="edit-btn">
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
          <div class="detail" :class="{ 'hide': item.deschide}" v-html="item.desc">
          </div>
        </li>
      </ul>

      <div class="paging">
        <el-pagination
          @currentchange="handleCurrentChange"
          :current-page="list.currentPage"
          :page-size="12"
          layout="prev, pager, next, jumper"
          :total="list.pageTotal">
        </el-pagination>
      </div>

    </el-card>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'list',

  components: {
  },

  methods: {
    ...mapActions([
      'loadList'
    ]),
    handleCurrentChange: function (index) {
      index = parseInt(index)
      var url = '/list/12/' + index
      this.$router.push(url)
    },
    openPopup: function (id) {
      var _this, pid
      pid = id
      _this = this
      if (!pid) {
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteProject', {
          pid: pid,
          action: function (data) {
            if (data.code === 1) {
              _this.$message({
                type: 'success',
                message: data.msg
              })
              _this.$router.push('/list')
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
      var p, c
      p = this.$route.params.p
      c = this.$route.params.c
      if (!p && !c) {
        p = 12
        c = 1
      }
      this.$store.dispatch('loadList', {
        p: p,
        c: c
      })
    }
  },

  computed: {
    ...mapGetters({
      list: 'list',
      admin: 'admin'
    })
  },

  created () {
    this.loading()
  },

  watch: {
    '$route' (to, from) {
      this.loading()
    }
  },

  data () {
    return {
      list: {},
      p: 12,
      c: 1,
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
          .link {
            color: #20a0ff;
          }
          .edit-btn {
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
