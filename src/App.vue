<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="stylus" scoped>
  #app
    height 100%
</style>
