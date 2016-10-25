<template>
  <div class="add">

    <div class="title clearfix">
      <h3>Release</h3>
      <a class="collapse-link">
        <i class="el-icon-arrow-up"></i>
      </a>
    </div>

    <el-card class="box-card">

      <el-form :model="releaseDetail" :rules="rules" ref="releaseDetail" label-width="200px" class="demo-ruleForm">
        <el-form-item label="Release Version *" prop="version">
          <el-input v-model="releaseDetail.version"></el-input>
        </el-form-item>
        <el-form-item label="Release Summary *" prop="summary">
          <el-input v-model="releaseDetail.summary"></el-input>
        </el-form-item>
        <el-form-item label="Release Link(Url) *" prop="link">
          <el-input v-model="releaseDetail.link"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <textarea id="textarea" name="" value="releaseDetail.desc" cols="30" rows="10" style="visibility:hidden;">
          </textarea>
        </el-form-item>
      </el-form>

      <div class="btn-box">
        <el-button type="primary" @click.native.prevent="handleReset">Reset</el-button>
        <el-button type="primary" class="submit" @click.native.prevent="handleSubmit">Submit</el-button>
      </div>

    </el-card>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
var tinymce = require('tinymce')

export default {
  name: 'add',

  data () {
    var validaeFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写此字段'))
      } else {
        callback()
      }
    }

    var validaeFn2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写此字段'))
      } else {
        var reg = /[a-zA-z]+:\/\/[^s]*/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的链接地址'))
        }
        callback()
      }
    }

    return {
      releaseDetail: {},
      rules: {
        version: [
          { message: '请填写此字段', trigger: 'blur' },
          { validator: validaeFn }
        ],
        summary: [
          { message: '请填写此字段', trigger: 'blur' },
          { validator: validaeFn }
        ],
        link: [
          { message: '请填写此字段', trigger: 'blur' },
          { validator: validaeFn2 }
        ]
      }
    }
  },

  computed: {
    ...mapGetters({
      releaseDetail: 'releaseDetail'
    })
  },

  methods: {
    openPopup: function (text) {
      this.$alert(text, '温馨提示')
    },
    getDesc: function (iframeid, textareaid) {
      var tmp = ''
      if (document.frames) {
        tmp = document.frames[iframeid].document.getElementById(textareaid).innerHTML
      } else {
        tmp = document.getElementById(iframeid).contentWindow.document.getElementById(textareaid).innerHTML
      }
      return tmp
    },
    setDesc: function (iframeid, textareaid) {
      var target = ''
      if (document.frames) {
        target = document.frames[iframeid].document.getElementById(textareaid)
      } else {
        target = document.getElementById(iframeid).contentWindow.document.getElementById(textareaid)
      }
      target.innerHTML = this.releaseDetail.desc
    },
    handleReset: function () {
      this.$refs.releaseDetail.resetFields()
    },
    handleSubmit: function (ev) {
      this.$refs.releaseDetail.validate((valid) => {
        if (valid) {
          console.log('submit')
          var query, rid, _this, opts, desc
          _this = this
          query = this.$route.query
          rid = query.rid
          opts = {}
          desc = _this.getDesc('textarea_ifr', 'tinymce')
          if (!rid) {
            opts = this.releaseDetail
            opts.desc = desc
            opts.projectid = query.pid
            opts.maintainer = query.owner
            this.$store.dispatch('addRelease', {
              opts: opts,
              action: function (data) {
                _this.openPopup(data.msg)
                if (data.code === 1) {
                  _this.$router.push('/release/' + query.pid + '/' + query.owner)
                }
              }
            })
          } else {
            var arr = ['version', 'summary', 'link']
            for (var key in this.releaseDetail) {
              if (arr.indexOf(key) >= 0) {
                opts[key] = this.releaseDetail[key]
              }
            }
            opts.desc = desc
            opts.rid = rid
            this.$store.dispatch('updateRelease', {
              opts: opts,
              action: function (data) {
                _this.openPopup(data.msg)
                if (data.code === 1) {
                  _this.$router.push('/release/' + query.pid + '/' + query.owner)
                }
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loading: function () {
      var query, rid
      query = this.$route.query
      rid = query.rid
      if (!query.pid || !query.owner) {
        return
      }
      if (rid) {
        var _this = this
        this.$store.dispatch('getReleaseDetail', {
          rid: rid,
          callback: function () {
            tinymce.EditorManager.init({
              selector: '#textarea'
            })
            _this.setDesc('textarea_ifr', 'tinymce')
          }
        })
      } else {
        this.$store.dispatch('setReleaseEmpty')
        setTimeout(function () {
          tinymce.EditorManager.init({
            selector: '#textarea'
          })
        }, 0)
      }
    }
  },

  created () {
    this.loading()
  },

  destroyed () {
    tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'textarea')
  },

  watch: {
    '$route' (to, from) {
      this.loading()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @color: #73879C;
  .add {
    .title {
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
    .el-form {
      max-width: 750px;
      position: relative;
      margin: 0 auto;
      padding-top: 10px;
    }
    .el-form-item {
      color: @color;
      font-weight: bold;
    }
    .el-select {
      position: relative;
    }
    .el-input {
      position: relative;
    }
    .btn-box {
      text-align: center;
      padding-top: 10px;
      .submit {
        margin-left: 10px;
      }
    }
  }
</style>
