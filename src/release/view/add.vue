<template>
  <div class="add">

    <div class="title clearfix">
      <h3>Projects</h3>
    </div>

    <el-card class="box-card">

      <el-form :model="project" :rules="rules" ref="project" label-width="200px" class="demo-ruleForm">
        <el-form-item label="Project Name *" prop="name">
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item label="Project Link(Url/Repo) *" prop="link">
          <el-input v-model="project.link"></el-input>
        </el-form-item>
        <el-form-item label="Project Tags" prop="tags">
          <el-input v-model="project.tags"></el-input>
        </el-form-item>
        <el-form-item label="Visibility" prop="visibility">
          <el-select v-model="project.visibility" placeholder="Internal">
            <el-option label="Internal" value="internal"></el-option>
            <el-option label="Private" value="private"></el-option>
            <el-option label="Public" value="public"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Description *">
          <textarea id="textarea" name="" value="project.desc" cols="30" rows="10" style="visibility:hidden;">
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
      project: {
        name: '',
        link: '',
        tags: '',
        visibility: 'internal',
        desc: ''
      },
      admin: '',
      rules: {
        name: [
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
      project: 'project',
      admin: 'admin'
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
      // tinymce.get('textarea').
      var target = ''
      if (document.frames) {
        target = document.frames[iframeid].document.getElementById(textareaid)
      } else {
        target = document.getElementById(iframeid).contentWindow.document.getElementById(textareaid)
      }
      target.innerHTML = this.project.desc
    },
    handleReset: function () {
      this.$refs.project.resetFields()
    },
    handleSubmit: function (ev) {
      this.$refs.project.validate((valid) => {
        if (valid) {
          var query, id, _this, opts, desc
          _this = this
          query = this.$route.query
          id = query.id
          opts = {}
          desc = _this.getDesc('textarea_ifr', 'tinymce')
          if (!id) {
            opts = this.project
            opts.desc = desc
            opts.owner = _this.admin
            this.$store.dispatch('addProject', {
              opts: opts,
              action: function (data) {
                _this.openPopup(data.msg)
                if (data.code === 1) {
                  _this.$router.push('/list')
                }
              }
            })
          } else {
            var keys
            keys = ['name', 'tags', 'visibility', 'link']
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
                if (data.code === 1) {
                  _this.$router.push('/list')
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
      var _this = this
      this.$store.dispatch('getProject', {
        id: id,
        callback: function (data) {
          tinymce.EditorManager.init({
            selector: '#textarea'
          })
          _this.setDesc('textarea_ifr', 'tinymce')
        }
      })
    },
    setProjectEmpty: function () {
      this.$store.dispatch('setProjectEmpty')
      setTimeout(function () {
        tinymce.EditorManager.init({
          selector: '#textarea'
        })
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
      tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'textarea')
      this.loading()
    }
  }
}
</script>

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
