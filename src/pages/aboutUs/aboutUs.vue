<template>
  <div class="container">
      <headBar :nav="nav"></headBar>
      <div class="about-us-container">
          <div class="avatar-wrap">
              <span class="iconfont icon-avatar"></span>
          </div>
          <div class="version">V0.1.1</div>
          <div class="author">Created By sasa</div>
      </div>
  </div>
</template>

<script>
import headBar from '@/components/header/header'
export default {
  data () {
    return {
      nav: {
        title: '关于我们',
        back: true
      }
    }
  },
  components: {
    headBar
  }
}
</script>

<style lang="stylus">
.container
  height 100%
.about-us-container
    padding-top 20px
    font-size 14px
    color #666
    text-align center
    height calc(100% - 46px)
    .avatar-wrap
        margin 76px 0 10px 0
    .version, .author
        margin-bottom 14px
    .avatar-wrap .iconfont
        font-size 50px
        color #ab956c
</style>
