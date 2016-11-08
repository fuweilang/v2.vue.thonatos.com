<template>
  <div class="add">

    <div class="title clearfix">
      <h3>Release {{ title }}</h3>
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
      releaseDetail: {
        name: '',
        repo: '',
        visibility: 'internal',
        desc: ''
      },
      title: '',
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
    handleReset: function () {
      this.$refs.releaseDetail.resetFields()
      tinymce.activeEditor.getBody().innerHTML = ''
    },
    handleSubmit: function (ev) {
      this.$refs.releaseDetail.validate((valid) => {
        if (valid) {
          console.log('submit')
          var query, id, _this, opts, desc
          _this = this
          query = this.$route.query
          id = query.id
          opts = this.releaseDetail
          desc = tinymce.activeEditor.getContent()
          opts.desc = desc
          opts.pid = query.pid
          if (!id) {
            this.$store.dispatch('addRelease', {
              opts: opts,
              action: function (data) {
                _this.openPopup(data.msg)
                if (data.bool) {
                  _this.$router.push('/releaselist/' + query.pid + '/' + query.tid)
                }
              }
            })
          } else {
            opts.id = id
            this.$store.dispatch('updateRelease', {
              opts: opts,
              action: function (data) {
                _this.openPopup(data.msg)
                if (data.bool === true) {
                  _this.$router.push('/releaselist/' + query.pid + '/' + query.tid)
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
      var query, id
      query = this.$route.query
      id = query.id
      if (!query.pid || !query.tid) {
        return
      }
      if (id) {
        this.title = 'Edit'
        this.$store.dispatch('getReleaseDetail', {
          pid: query.pid,
          id: id,
          callback: function (data) {
            tinymce.EditorManager.init({
              selector: '#textarea',
              setup: function (e) {
                e.getElement().innerHTML = data.desc
              }
            })
          }
        })
      } else {
        this.title = 'Add'
        this.$store.dispatch('setReleaseDetailEmpty')
        setTimeout(function () {
          tinymce.EditorManager.init({
            selector: '#textarea'
          })
          var $selector = tinymce.activeEditor.getBody()
          if ($selector) {
            $selector.innerHTML = ''
          }
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
