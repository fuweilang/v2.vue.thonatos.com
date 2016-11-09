<template>
  <div class="add">

    <div class="project-card">

      <el-form :model="project" :rules="rules" ref="project" label-width="200px" class="demo-ruleForm">

        <el-form-item label="Project Name *" prop="name">
          <el-input v-model="project.name"></el-input>
        </el-form-item>

        <el-form-item label="Project Link(Url/Repo) *" prop="repo">
          <el-input v-model="project.repo"></el-input>
        </el-form-item>

        <el-form-item label="Visibility" prop="visibility">
          <el-select v-model="project.visibility" placeholder="Internal">
            <el-option label="Internal" value="internal"></el-option>
            <el-option label="Private" value="private"></el-option>
            <el-option label="Public" value="public"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Description *">
          <textarea id="textarea" name="" cols="30" rows="10" style="visibility:hidden;">
          </textarea>
        </el-form-item>
        
      </el-form>

      <div class="btn-box">
        <el-button type="primary" @click.native.prevent="handleReset">Reset</el-button>
        <el-button type="primary" class="submit" @click.native.prevent="handleSubmit">Submit</el-button>
      </div>

    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
var tinymce = require('tinymce')

export default {
  name: 'addproject',

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
      project: {
        name: '',
        repo: '',
        visibility: 'internal',
        desc: ''
      },
      admin: '',
      rules: {
        name: [
          { message: '请填写此字段', trigger: 'blur' },
          { validator: validaeFn }
        ],
        repo: [
          { message: '请填写此字段', trigger: 'blur' },
          { validator: validaeFn2 }
        ]
      }
    }
  },

  computed: {
    ...mapGetters({
      project: 'project',
      admin: 'getAdmin'
    })
  },

  methods: {
    openPopup: function (text) {
      this.$alert(text, '温馨提示')
    },
    handleReset: function () {
      this.$refs.project.resetFields()
      tinymce.activeEditor.getBody().innerHTML = ''
    },
    handleSubmit: function (ev) {
      this.$refs.project.validate((valid) => {
        if (valid) {
          var query, id, _this, opts, desc
          _this = this
          query = this.$route.query
          id = query.id
          opts = {}
          desc = tinymce.activeEditor.getContent()
          if (!id) {
            opts = this.project
            opts.desc = desc
            opts.owner = _this.admin
            this.$store.dispatch('addProject', {
              opts: opts,
              action: function (data) {
                _this.openPopup(data.msg)
                if (data.bool) {
                  _this.$router.push('/projects')
                }
              }
            })
          } else {
            var keys
            keys = ['name', 'visibility', 'repo']
            opts.desc = desc
            for (var key in this.project) {
              if (keys.indexOf(key) >= 0) {
                opts[key] = this.project[key]
              }
              if (key === '_id') {
                opts.pid = this.project[key]
              }
            }
            this.$store.dispatch('updateProject', {
              opts: opts,
              action: function (data) {
                _this.openPopup(data.msg)
                if (data.bool) {
                  _this.$router.push('/projects')
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
    getProject: function (id) {
      this.$store.dispatch('getProject', {
        id: id,
        callback: function (data) {
          tinymce.EditorManager.init({
            selector: '#textarea',
            setup: function (ed) {
              ed.getElement().innerHTML = data.desc
            }
          })
        }
      })
    },
    setProjectEmpty: function () {
      this.$store.dispatch('setProjectEmpty')
      setTimeout(function () {
        tinymce.EditorManager.init({
          selector: '#textarea'
        })
        var $selector = tinymce.activeEditor.getBody()
        if ($selector) {
          $selector.innerHTML = ''
        }
      }, 0)
    },
    loading: function () {
      var id, query
      query = this.$route.query
      id = query.id
      if (id) {
        this.getProject(id)
      } else {
        this.setProjectEmpty()
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

<style scoped lang="less">
  @color: #73879C;
  .add {
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
