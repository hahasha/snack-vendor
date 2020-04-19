<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="about-us-container">
            <div class="avatar-wrap">
                <span class="iconfont icon-avatar"></span>
            </div>
            <div class="version">V0.1.1</div>
            <div class="author">Created By sasa</div>
            <div class="anouncement">好好学习 天天向上</div>
        </div>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
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
    topBar
  }
}
</script>

<style lang="stylus">
.about-us-container
    margin-top 46px
    font-size 14px
    color #666
    text-align center
    .avatar-wrap
        margin 76px 0 10px 0
    .version, .author, .anoucement
        margin-bottom 14px
    .avatar-wrap .iconfont
        font-size 50px
        color #ab956c
</style>
