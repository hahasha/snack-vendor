<template>
    <div class="container">
        <div class="shopcart-container">购物车</div>
        <tab></tab>
    </div>
</template>

<script>
import Tab from '@/components/tab/tab'
export default {
  components: {
    Tab
  }
}
</script>

<style lang="stylus" scoped>
.shopcart-container
    margin-top 46px
</style>
