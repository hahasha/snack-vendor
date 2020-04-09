<template>
    <div class="head-container">
        <div class="nav">
          <span class="back cubeic-back" v-show="nav.back" @click="goBack"></span>
          <span class="title">{{nav.title}}</span>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    nav: {
      title: {
        type: String,
        default: '零食商贩'
      },
      back: {
        type: Boolean,
        default: false
      }
    }
  },
  methods: {
    goBack () {
      window.history.length > 0 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.head-container
    position fixed
    z-index 99
    left 0
    top 0
    right 0
    width 100%
    height 46px
    line-height 46px
    text-align center
    background-color #ab956c
    color #fff
    font-size 14px
    letter-spacing 1px
    .nav
      position relative
    .nav .back
      position absolute
      left 15px
</style>
