<template>
    <span class="bubble" v-show="num">{{num}}</span>
</template>

<script>
export default {
  name: 'bubble',
  props: {
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.bubble
    position absolute
    top -4px
    right -4px
    display inline-block
    width 14px
    height 14px
    line-height 14px
    text-align center
    border-radius 50%
    background-color #ab956c
    font-size 12px
    color #fff
</style>
