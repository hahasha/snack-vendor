<template>
    <transition name="fade">
        <cube-popup ref="popup" :mask="false">
            <span class="content">该宝贝不能再减少了哟~</span>
        </cube-popup>
    </transition>
</template>

<script>
export default {
  name: 'popup',
  methods: {
    show () {
      this.$emit('show')
      this.$refs.popup.show()
      setTimeout(() => {
        this.$refs.popup.hide()
      }, 3000)
    }
  }
}
</script>

<style lang="stylus" scoped>
    .fade-enter
        opacity 0
    .fade-enter-active
        transition opacity .5s
    .fade-leave-active
        transition opacity .5s
    .fade-leave
        opacity 1
// >>> .cube-popup-center .cube-popup-content
    .content
        font-size 14px
        color #666
        display inline-block
        padding 10px 20px
        background-color rgba(0,0,0,.1)
        border-radius 20px
</style>
