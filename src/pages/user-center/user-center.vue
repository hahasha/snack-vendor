<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="shopcart-container">
          <div class="user-info-wrap">
            <span class="iconfont icon-avater"></span>
            <span class="username">sasa</span>
            <span class="edit">编辑</span>
          </div>
          <div class="setting-wrap">
            <div class="set-item address">我的收货地址<span class="arrow cubeic-arrow"></span></div>
            <div class="set-item order">我的收藏<span class="arrow cubeic-arrow"></span></div>
            <div class="set-item order">我的订单<span class="arrow cubeic-arrow"></span></div>
            <div class="set-item about">关于我们<span class="arrow cubeic-arrow"></span></div>
            <div class="set-item switch">切换账户</div>
            <div class="set-item logout">退出登录</div>
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
.container
  overflow hidden
.shopcart-container
    margin 46px 0 60px 0
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
      .icon-avater
        font-size 30px
        margin-right 10px
      .edit
        font-size 12px
        display inline-block
        padding 4px
        border 1px solid #fff
        border-radius 6px
        position absolute
        right 20px
    .setting-wrap
      width 100%
      .set-item
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
