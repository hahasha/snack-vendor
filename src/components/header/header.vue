<template>
    <div class="head-container">
        <span class="back cubeic-back" v-if="back"></span>
        <span class="nav">{{nav}}</span>
    </div>
</template>

<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false
    },
    nav: {
      type: String,
      default: '零食商贩'
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
</style>
