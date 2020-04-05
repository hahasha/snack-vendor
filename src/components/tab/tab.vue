<template>
  <div class="tab-container">
    <cube-tab-bar v-model="selectedDefault" :data="tabs" @change="handleChange"></cube-tab-bar>
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
        icon: 'iconfont icon-zhuye1'
      }, {
        label: '分类',
        value: 'category',
        icon: 'iconfont icon-fenlei'
      }, {
        label: '购物车',
        value: 'shopcart',
        icon: 'iconfont icon-gouwuche'
      }, {
        label: '我的',
        value: 'userCenter',
        icon: 'iconfont icon-wode'
      }]
    }
  },
  methods: {
    handleChange (value) {
      this.$router.push(value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab-container {
  position: fixed;
  height 50px
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 14px;
  background-color: #f5f5f5;
}
</style>
