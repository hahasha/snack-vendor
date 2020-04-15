<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="orders-container">
            我的订单
        </div>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
export default {
  data () {
    return {
      nav: {
        title: '我的订单',
        back: true
      }
    }
  },
  components: {
    topBar
  }
}
</script>
