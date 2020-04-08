<template>
    <div class="container">
        <topBar></topBar>
        <div class="shopcart-container">用户中心</div>
        <tab></tab>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import Tab from '@/components/tab/tab'
export default {
  components: {
    topBar,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
.shopcart-container
    margin-top 46px
</style>
