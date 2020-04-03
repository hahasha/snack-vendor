<template>
    <div class="tab-container">
        <cube-tab-bar
            v-model="selectedDefault"
            :data="tabs"
            @change="handleChange"
        ></cube-tab-bar>
    </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      selectedDefault: 'home',
      tabs: [{
        label: '首页',
        value: 'home',
        icon: 'cubeic-home'
      }, {
        label: '分类',
        value: 'category',
        icon: 'cubeic-more'
      }, {
        label: '购物车',
        value: 'shopcart',
        icon: 'cubeic-mall'
      }, {
        label: '我的',
        value: 'user',
        icon: 'cubeic-person'
      }]
    }
  },
  methods: {
    handleChange (value) {
      this.$router.replace(value)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tab-container
    position fixed
    left 0
    right 0
    bottom 0
    font-size 14px
    background-color #f5f5f5
</style>
