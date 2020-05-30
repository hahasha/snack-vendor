<template>
    <div class="container">
        <headBar :nav="nav"></headBar>
        <div class="shopcart-container">
          <div class="user-info-wrap" v-if="!isEmpty(userInfo)" @click="editUser">
            <img class="avatar" v-if="userInfo.avatar" :src="userInfo.avatar | toFullPath" alt="" >
            <span class="iconfont icon-avatar" v-else></span>
            <span class="text">{{userInfo.username}}</span>
            <span class="edit">编辑</span>
          </div>
          <div class="user-info-wrap" v-else>
            <span class="iconfont icon-avatar"></span>
            <span class="text" @click="login">登录 / 注册</span>
          </div>
          <div class="setting-wrap" @click.stop="clickHandler">
            <div class="set-item" data-type="address">我的收货地址<span class="arrow cubeic-arrow"></span></div>
            <!-- <div class="set-item" data-type="collection">我的收藏<span class="arrow cubeic-arrow"></span></div> -->
            <div class="set-item" data-type="order">我的订单<span class="arrow cubeic-arrow"></span></div>
            <div class="set-item" data-type="aboutUs">关于我们<span class="arrow cubeic-arrow"></span></div>
          </div>
          <div class="operate-wrap">
            <!-- <div class="operate-item switch" @click="switchUser" v-show="userInfo">切换账户</div> -->
            <div class="operate-item logout" @click="logout" v-show="userInfo">退出登录</div>
          </div>
        </div>
        <tab></tab>
    </div>
</template>

<script>
import headBar from '@/components/header/header'
import Tab from '@/components/tab/tab'
import { mapGetters, mapMutations } from 'vuex'
import { baseImgUrl } from '@/api/http'
export default {
  data () {
    return {
      nav: {
        title: '我的'
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
    login () {
      this.$router.push('login')
    },
    clickHandler (e) {
      const type = e.target.dataset.type
      this.$router.push(type)
    },
    switchUser () {},
    logout () {
      this.$createDialog({
        type: 'confirm',
        title: '是否退出登录',
        confirmBtn: {
          text: '退出',
          active: true
        },
        cancelBtn: {
          text: '取消',
          active: false
        },
        onConfirm: () => {
          this.clearToken() // 退出登录，清除token，跳转到登录页
          this.$router.push('login')
        }
      }).show()
    },
    editUser () {
      this.$router.push('editUserInfo')
    },
    isEmpty (e) {
      var t
      for (t in e) {
        return !1
      }
      return !0
    },
    ...mapMutations({
      clearToken: 'CLEAR_TOKEN'
    })
  },
  components: {
    headBar,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  overflow hidden
.shopcart-container
    height calc(100% - 96px)
    padding 46px 0 50px 0
    background #ececec
    .user-info-wrap
      width 100%
      height 60px
      padding 0 10px
      box-sizing border-box
      background-color #ab956e
      color #fff
      font-size 16px
      display flex
      align-items center
      .avatar
        width 50px
        height 50px
        border-radius 50%
        margin-right 10px
      .icon-avatar
        font-size 30px
        margin-right 10px
      .text
        font-size 14px
      .edit
        font-size 12px
        display inline-block
        padding 4px
        border 1px solid #fff
        border-radius 6px
        position absolute
        right 20px
    .setting-wrap, .operate-wrap
      width 100%
      .set-item, .operate-item
        width 100%
        height 50px
        padding 0 10px
        box-sizing border-box
        display flex
        align-items center
        justify-content space-between
        font-size 14px
        color #666
        border-bottom 1px solid #ececec
        background-color #fff
        .arrow
          font-size 10px
      .switch, .logout
        justify-content center
        margin 8px 0
</style>
