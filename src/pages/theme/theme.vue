<template>
  <div class="container">
    <topBar :nav="nav"></topBar>
    <div class="theme-container">
      <div class="head-img-wrap">
        <img :src="theme.img_url" alt="">
      </div>
      <ul class="product-list">
        <li class="product" v-for="(item, index) in products" :key="index" @click="clickHandler(item)">
          <div class="img-wrap">
            <img :src="item.img_url" alt="" class="wrap">
          </div>
          <div class="info-wrap">
            <span class="name">{{item.name}}</span>
            <span class="spec">{{item.spec}}</span>
          </div>
          <span class="price">¥{{item.price}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import { getThemes, getProducts } from '@/api/api'
export default {
  data () {
    return {
      nav: {
        title: '',
        back: true
      },
      theme: {},
      products: []
    }
  },
  created () {
    const id = Number(this.$route.query.theme_id)
    this.getTheme(id)
    this.getProducts(id)
  },
  methods: {
    getTheme (id) {
      getThemes().then((themes) => {
        this.theme = themes.filter(item => item.id === id)[0]
        this.setTitle()
      })
    },
    getProducts (id) {
      getProducts().then((products) => {
        this.products = products.filter(item => item.theme_id === id)
      })
    },
    setTitle () {
      this.nav.title = this.theme.text
    },
    clickHandler (item) {
      this.$router.push(`product/${item.id}`)
    }
  },
  components: {
    topBar
  }
}
</script>

<style lang="stylus" scoped>
.theme-container
  margin-top 46px
  .head-img-wrap
    width 100%
    height 180px
    img
      width 100%
      height 100%
  .product-list
    display flex
    flex-wrap wrap
    margin 15px 10px
    .product:nth-of-type(2n+1)
      margin-right 6px
    .product
      width 48%
      padding 20px 0
      display flex
      flex 1 0 auto
      flex-direction column
      font-size 14px
      align-items center
      justify-content center
      background #f4f4f4
      margin-bottom 6px
      border-radius 4px
      .img-wrap
        width 60%
        height 80px
        img
          width 100%
          height 100%
          border-radius 50%
      .info-wrap
        margin 20px 0 10px 0
        .name
          margin-right 2px
      .price
        font-size 12px
</style>
