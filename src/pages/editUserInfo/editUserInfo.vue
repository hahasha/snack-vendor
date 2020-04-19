<template>
  <div class="container">
    <topBar :nav="nav"></topBar>
    <div class="edit-user-container">
      <cube-form @submit.prevent="submitHandler">
        <cube-form-group>
          <cube-form-item>
            <div class="upload-wrap">
              <span class="text">头像</span>
              <div class="upload">
                <cube-upload
                  ref="upload"
                  v-model="files"
                  :action="action"
                  @files-added="addedHandler"
                  @file-error="errHandler"
                >
                  <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
                  <cube-upload-btn :multiple="false" :class="{'transform' : files.length > 0}">
                    <span class="iconfont icon-avatar" v-show="!files.length"></span>
                  </cube-upload-btn>
                </cube-upload>
                <span class="cubeic-arrow"></span>
              </div>
            </div>
          </cube-form-item>
          <cube-form-item>
            <cube-button class="btn-wrap" @click="modifyName">
              <span class="text">用户名</span>
              <p class="username">{{user.name}}<span class="cubeic-arrow"></span></p>
            </cube-button>
          </cube-form-item>
        </cube-form-group>
        <cube-form-group legend="安全设置" class="reset-wrap">
          <cube-form-item>
            <cube-button class="btn-wrap" @click="resetPassword">
              <span class="text">修改登录密码</span>
              <span class="cubeic-arrow"></span>
            </cube-button>
          </cube-form-item>
        </cube-form-group>
        <cube-form-group class="btn-wrap">
          <cube-button type="submit">完成</cube-button>
        </cube-form-group>
      </cube-form>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
export default {
  data () {
    return {
      nav: {
        title: '编辑个人资料',
        back: true
      },
      action: '',
      files: []
    }
  },
  computed: {
    user () {
      return this.$store.state.currentUser || { name: '' }
    }
  },
  methods: {
    addedHandler () {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
    },
    errHandler (file) {
      console.log(file.response.message)
    },
    resetPassword () {
      this.$router.push('resetPassword')
    },
    modifyName () {
      this.$router.push('modifyName')
    },
    submitHandler () {}
  },
  components: {
    topBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  .edit-user-container
    height 100%
    background-color #f4f4f4
    padding-top 46px
    box-sizing border-box
  .username .cubeic-arrow
    margin-left 10px
  .upload-wrap
    display flex
    align-items center
    justify-content space-between
    .upload
      display flex
      align-items center
      >>>.cube-upload
        height 60px
        line-height 60px
        padding 10px 0
      .cube-upload-btn.transform
        height 60px
        transform translateY(-60px)
      >>>.cube-upload-file-def
        width 60px
        height 60px
        border-radius 50%
      >>>.cubeic-wrong
        display none
      .icon-avatar
        font-size 60px
        color #dcd3c1
  >>>.reset-wrap .cube-form-group-legend, >>>.btn-wrap .cube-form-group-legend
    padding 6px 0 6px 14px
  >>>.cube-btn.btn-wrap
      color #666
      background #fff
      display flex
      justify-content space-between
      padding-left 0
      padding-right 0
  >>>.cubeic-arrow
    font-size 12px
  >>>.cube-form-label
    font-size 14px
  >>>.cube-btn
    font-size 14px
</style>
