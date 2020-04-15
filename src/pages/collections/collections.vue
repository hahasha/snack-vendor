<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="collections-container">
            我的收藏
        </div>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
export default {
  data () {
    return {
      nav: {
        title: '我的收藏',
        back: true
      }
    }
  },
  components: {
    topBar
  }
}
</script>
