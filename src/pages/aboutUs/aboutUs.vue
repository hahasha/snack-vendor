<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="about-us-container">
            关于我们
        </div>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
export default {
  data () {
    return {
      nav: {
        title: '关于我们',
        back: true
      }
    }
  },
  components: {
    topBar
  }
}
</script>
