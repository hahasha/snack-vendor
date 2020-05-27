<template>
  <div class="container">
    <headBar :nav="nav"></headBar>
    <div class="theme-container" v-if="!isEmpty(theme)">
        <div class="head-img-wrap">
          <img :src="theme.head_img.url | toFullPath" alt="">
        </div>
        <ul class="product-list">
          <li class="product" v-for="(item, index) in theme.products" :key="index" @click="clickHandler(item)">
            <div class="img-wrap">
              <img :src="item.main_img_url | toFullPath" alt="" class="wrap">
            </div>
            <div class="info-wrap">
              <span class="name">{{item.name}}</span>
            </div>
            <span class="price">¥{{item.price}}</span>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import headBar from '@/components/header/header'
import { getThemeById } from '@/api/api'
import { baseImgUrl } from '@/api/http'
export default {
  data () {
    return {
      nav: {
        title: '',
        back: true
      },
      theme: {}
    }
  },
  created () {
    this.getTheme()
  },
  filters: {
    toFullPath (value) {
      if (!value) return ''
      return baseImgUrl + value
    }
  },
  methods: {
    getTheme () {
      getThemeById({
        id: this.$route.query.id
      }).then(res => {
        if (res.errcode === 0) {
          this.theme = res.theme
          this.nav.title = res.theme.description
        }
      })
    },
    clickHandler (item) {
      this.$router.push(`product/${item.id}`)
    },
    isEmpty (e) {
      var t
      for (t in e) {
        return !1
      }
      return !0
    }
  },
  components: {
    headBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
.theme-container
  height calc(100% - 46px)
  padding-top 46px
  .head-img-wrap
    width 100%
    height 180px
    img
      width 100%
      height 100%
  .product-list
    display flex
    flex-wrap wrap
    justify-content space-between
    padding 15px 10px
    .product
      flex-basis 49%
      padding 20px 0
      display flex
      flex-direction column
      font-size 14px
      align-items center
      justify-content center
      background #f4f4f4
      margin-bottom 6px
      border-radius 4px
      .img-wrap
        width 60%
        height auto
        img
          width 100%
          height 100%
          border-radius 50%
      .info-wrap
        margin 10px 0
        .name
          margin-right 2px
      .price
        font-size 12px
</style>
