<template>
  <div class="container">
    <headBar :nav="nav"></headBar>
    <div class="edit-user-container">
      <cube-form>
        <cube-form-group>
          <cube-form-item>
            <div class="upload-wrap">
              <span class="text">头像</span>
              <div class="upload">
                <cube-upload
                  ref="upload"
                  v-model="files"
                  :action="action"
                  :max="1"
                  :multiple="false"
                  @files-added="addFileHandler"
                  @file-submitted="submitFileHandler"
                  @file-success="successHandler"
                >
                  <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
                  <cube-upload-btn :multiple="false" :class="{'transform' : files.length > 0}">
                    <img class="avatar" v-if="userInfo.avatar && !files.length" :src="userInfo.avatar | toFullPath" alt="">
                    <span class="iconfont icon-avatar" v-else-if="!files.length"></span>
                  </cube-upload-btn>
                </cube-upload>
                <span class="cubeic-arrow"></span>
              </div>
            </div>
          </cube-form-item>
          <cube-form-item>
            <cube-button class="btn-wrap" @click="modifyName">
              <span class="text">用户名</span>
              <p class="username">{{userInfo.username}}<span class="cubeic-arrow"></span></p>
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
          <cube-button class="submit-btn" @click="submitHandler">完成</cube-button>
        </cube-form-group>
      </cube-form>
    </div>
  </div>
</template>

<script>
import headBar from '@/components/header/header'
import { mapGetters, mapMutations } from 'vuex'
import { baseImgUrl, baseUrl } from '@/api/http'
import { updateUserInfo } from '@/api/api'
export default {
  data () {
    return {
      nav: {
        title: '编辑个人资料',
        back: true
      },
      files: [],
      action: {
        target: baseUrl + '/v1/image/upload',
        data: {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  filters: {
    toFullPath (value) {
      if (!value) return ''
      return baseImgUrl + value
    }
  },
  methods: {
    addFileHandler (files) {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
      // let errTxt = ''
      // let hasIgnore = false
      // const maxSize = 1 * 1024 * 1024 // 1M
      // const types = ['image/jpeg', 'image/png']
      // for (const k in files) {
      //   const file = files[k]
      //   if (file.size > maxSize) {
      //     errTxt = '上传图片大小不能超过 1MB!'
      //     file.ignore = true
      //     hasIgnore = true
      //   }
      //   if (types.indexOf(file.type) === -1) {
      //     file.ignore = true
      //     hasIgnore = true
      //     errTxt = '上传图片只能是 JPG 或 PNG 格式!'
      //   }
      // }
      // hasIgnore && this.$createToast({
      //   type: 'warn',
      //   time: 1000,
      //   txt: errTxt
      // }).show()
    },
    submitFileHandler (file) {
      var formData = new FormData()
      formData.append('file', file.file)
      this.action.data = formData
    },
    successHandler (file) {
      if (file.response.errcode === 0) {
        const userInfo = {
          id: this.userInfo.id,
          username: this.userInfo.username,
          avatar: file.response.image.url
        }
        this.updateUserInfo(userInfo)
      }
    },
    resetPassword () {
      this.$router.push('resetPassword')
    },
    modifyName () {
      this.$router.push('modifyName')
    },
    submitHandler () {
      // 把更新同步到数据库
      updateUserInfo(this.userInfo).then(res => {
        if (res.errcode === 0) {
          this.$createToast({
            type: 'correct',
            txt: '修改成功'
          }).show()
          this.$router.push('userCenter')
        }
      })
    },
    ...mapMutations({
      updateUserInfo: 'SET_USER_INFO'
    })
  },
  components: {
    headBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  .edit-user-container
    height calc(100% - 46px)
    background-color #f4f4f4
    padding-top 46px
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
        opacity 0
      >>>.cube-upload-file-def
        width 60px
        height 60px
        border-radius 50%
      >>>.cube-upload-btn-def
        width 60px
      >>>.cubeic-wrong
        display none
      .avatar
        width 60px
        height 60px
        border-radius 50%
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
  .submit-btn
      background #ab956c
      font-size 16px
</style>
