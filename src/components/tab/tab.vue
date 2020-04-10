<template>
  <div class="tab-container">
    <cube-tab-bar v-model="selectedDefault" :data="tabs" @change="changeHandler"></cube-tab-bar>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      selectedDefault: '/',
      tabs: [{
        label: '首页',
        value: '/',
        icon: 'iconfont icon-home'
      }, {
        label: '分类',
        value: 'category',
        icon: 'iconfont icon-category'
      }, {
        label: '购物车',
        value: 'shopcart',
        icon: 'iconfont icon-cart'
      }, {
        label: '我的',
        value: 'userCenter',
        icon: 'iconfont icon-wode'
      }],
      path: this.$route.path
    }
  },
  created () {
    this.selectedDefault = this.$route.path === '/' ? '/' : this.$route.path.replace('/', '')
    console.log(this.selectedDefault)
  },
  methods: {
    changeHandler (value) {
      this.$router.push(value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab-container
  position fixed
  height 50px
  left 0
  right 0
  bottom 0
  font-size 14px
  background-color #f5f5f5
  z-index 99
  >>> .cube-tab
    color #b6b6b6
  >>> .cube-tab .iconfont
    font-size 20px
  >>> .cube-tab > div
    margin-top 3px
    font-size 12px
  >>> .cube-tab_active
    color #a28b60
</style>
