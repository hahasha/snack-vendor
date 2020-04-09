<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="shopcart-container">
          <div class="user-info-wrap">
            <div class="avater-wrap">
              <span class="avater iconfont icon-morentouxiang"></span>
            </div>
            <span class="username">sasa</span>
          </div>
          <div class="setting-wrap">
            <div class="address">我的收货地址</div>
            <div class="order">我的订单</div>
            <div class="about">关于我们</div>
            <div class="switch-account">切换账号</div>
            <div class="logout">退出登录</div>
          </div>
        </div>
        <tab></tab>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import Tab from '@/components/tab/tab'
export default {
  data () {
    return {
      nav: {
        title: '我的'
      }
    }
  },
  components: {
    topBar,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
.shopcart-container
    margin 46px 0 60px 0
    background #ececec
    .user-info-wrap
      width 100%
      height 80px
      line-height 80px
      background-color #ab956e
    .setting-wrap
      width 100%
</style>
