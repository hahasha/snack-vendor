<template>
    <div class="container">
        <headBar :nav="nav"></headBar>
        <div class="collection-container">
            我的收藏
        </div>
    </div>
</template>

<script>
import headBar from '@/components/header/header'
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
    headBar
  }
}
</script>
