<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <tab></tab>
  </div>
</template>

<script>
import Tab from '@/components/tab/tab'
import Header from '@/components/header/header'
export default {
  components: {
    Tab,
    Header
  }
}
</script>

<style lang="stylus" scoped>
  #app
    height 100%
</style>
