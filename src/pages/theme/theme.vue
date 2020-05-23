<template>
  <div class="container">
    <topBar :nav="nav"></topBar>
    <div class="theme-container">
      <div class="head-img-wrap">
        <img :src="head_img" alt="">
      </div>
      <ul class="product-list">
        <li class="product" v-for="(item, index) in products" :key="index" @click="clickHandler(item)">
          <div class="img-wrap">
            <img :src="item.main_img_url" alt="" class="wrap">
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
import topBar from '@/components/top-bar/top-bar'
import { getThemeProduct } from '@/api/api'
import { baseImgUrl } from '@/api/http'
export default {
  data () {
    return {
      nav: {
        title: '',
        back: true
      },
      theme: {},
      head_img: '',
      products: []
    }
  },
  created () {
    const theme = this.$route.query.item
    const id = Number(theme.theme_id)
    this.head_img = theme.head_img_url
    this.nav.title = theme.theme_name
    this.getTheme(id)
    console.log(this.$route.query)
  },
  methods: {
    getTheme (id) {
      var params = { id }
      getThemeProduct(params).then((res) => {
        if (res.code === 0) {
          var list = res.data
          list.forEach((item, index) => {
            item.main_img_url = baseImgUrl + item.main_img_url
          })
          this.products = list
        } else {
          alert('result is null')
          console.log(res)
        }
      })
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
