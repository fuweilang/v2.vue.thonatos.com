<template>
  <div class="list">

    <div class="datalist-title clearfix">
      <h3>Project List</h3>
    </div>
    <el-card class="box-card">
      <ul class="datatable">

        <li class="datatable-title">
          <el-row>
            <el-col :span="4">
              <span>Name</span>
            </el-col>
            <el-col :span="6">
              <span>Repo</span>
            </el-col>
            <el-col :span="6">
              <span>Created</span>
            </el-col>
            <el-col :span="3">
              <span>Visibility</span>
            </el-col>
            <el-col :span="5">
              <span>#Edit</span>
            </el-col>
          </el-row>
        </li>

        <li v-for="item in projectlist.rows" class="data">
          <div class='item' @click="item.deschide=!item.deschide">
            <el-row>

              <el-col :span="4">
                <router-link :to="'/releaselist/'+item.id + '/' + item.tid" class='link'>{{ item.name }}</router-link>
              </el-col>

              <el-col :span="6">
                <span>{{ item.repo }}</span>
              </el-col>

              <el-col :span="6">
                <span v-if="!!item.createdAt">{{ item.createdAt }}</span>
                <span v-else> -- </span>
              </el-col>

              <el-col :span="3">
                <span>{{ item.visibility }}</span>
              </el-col>

              <el-col :span="5">
                <div v-if="item.tid === parseInt(tid)">
                  <el-button size="mini" type="primary" >
                    <router-link :to="{ path: '/addproject', query: { id: item.id }}" class="edit-btn">
                      <i class="el-icon-edit"></i>
                      <span>Edit</span>
                    </router-link>
                  </el-button>
                  <el-button size="mini" type="primary">
                    <div @click="openPopup(item.id, $event)">
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
          :current-page="projectlist.currentPage"
          :page-size="12"
          layout="prev, pager, next, jumper"
          :total="projectlist.pageTotal">
        </el-pagination>
      </div>

    </el-card>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'porjectlist',

  components: {
  },

  methods: {
    ...mapActions([
      'loadProjectlist'
    ]),
    handleCurrentChange: function (index) {
      index = parseInt(index)
      var url = '/projects/12/' + index
      this.$router.push(url)
    },
    openPopup: function (id, e) {
      e.preventDefault()
      var _this = this
      if (!id) {
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteProject', {
          id: id,
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
      var p, c
      p = this.$route.params.p
      c = this.$route.params.c
      if (!p && !c) {
        p = 12
        c = 1
      }
      this.$store.dispatch('loadProjectlist', {
        p: p,
        c: c
      })
    }
  },

  computed: {
    ...mapGetters({
      projectlist: 'projectlist',
      tid: 'getTid'
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
      projectlist: {},
      p: 12,
      c: 1,
      tid: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" >
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
          p {
            margin: 0;
          }
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
