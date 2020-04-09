<template>
    <div class="container">
      <topBar :nav="nav"></topBar>
      <div class="home-container">
          <cube-slide :data="slides">
            <cube-slide-item v-for="(item, index) in slides" :key="index">
              <a href="">
                <img :src="item.img_url" alt="">
              </a>
            </cube-slide-item>
          </cube-slide>
          <div class="theme-wrap">
              <h2 class="title">精选主题</h2>
              <div class="theme-content">
                  <div class="theme-item" v-for="(item, index) in themes" :key="index">
                      <img :src="item.img_url" alt="">
                  </div>
              </div>
          </div>
          <div class="new-product-wrap">
              <h2 class="title">最近新品</h2>
              <div class="product-content">
                  <div class="product" v-for="(item, index) in newProducts" :key="index" @click="clickHandler(item)">
                      <img :src="item.img_url" alt="">
                      <div class="desc">
                          <p class="name-wrap">
                              <span class="name">{{item.name}}</span>
                              <span class="spec">{{item.spec}}</span>
                          </p>
                          <span class="price">¥{{item.price}}</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <tab></tab>
    </div>
</template>

<script>
import { getSliders, getThemes, getProducts } from '@/api/api'
import topBar from '@/components/top-bar/top-bar'
import Tab from '@/components/tab/tab'
const NEW_PRODUCT_COUNT = 3

function compareFn (key) {
  return function (a, b) {
    const value1 = a[key]
    const value2 = b[key]
    return value2 - value1
  }
}

export default {
  data () {
    return {
      nav: {
        title: '首页'
      },
      slides: [],
      themes: [],
      newProducts: []
    }
  },
  created () {
    this.getSliders()
    this.getThemes()
    this.getProducts()
  },
  methods: {
    getSliders () {
      getSliders().then((slides) => {
        this.slides = slides
      })
    },
    getThemes () {
      getThemes().then((themes) => {
        this.themes = themes
      })
    },
    getProducts () {
      getProducts().then((products) => {
        const sortedArr = products.sort(compareFn('create_time'))
        let count = 0
        sortedArr.forEach(item => {
          if (count < NEW_PRODUCT_COUNT) {
            this.newProducts.push(item)
          }
          count++
        })
      })
    },
    clickHandler (item) {
      this.$router.push(`product/${item.id}`)
    }
  },
  components: {
    topBar,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
.home-container
    margin 46px 0 60px 0
.cube-slide
    height 5.6rem
    >>> .cube-slide-item > a > img
        width 100%
    >>> .cube-slide-dots
        bottom .25rem
    >>> .cube-slide-dots > span
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        margin: 0 .1rem;
        background-color: #a2a1a6;
    >>> .cube-slide-dots > span.active
        background-color #010101
.title
    margin 20px 0
    font-size 16px
    text-align center
    color #ada084
.theme-content
    font-size 0
    .theme-item
        display inline-block
        box-sizing border-box
        width 50%
        height 4.6rem
    .theme-item:nth-of-type(1)
        border-right 2px solid #fff
    .theme-item:nth-of-type(3)
        width 100%
        margin-top: 2px
    .theme-item img
        width 100%
        height 100%
.product-content
    padding 0 8px
    .product
        position relative
        display inline-block
        box-sizing border-box
        width 50%
        margin-bottom 1px
    .product:nth-of-type(2n+1)
        border-right 4px solid #fff
    .product img
        width 100%
        height 4.5rem
        border-radius 4px
    .product .desc
        width 100%
        position absolute
        bottom 10px
        font-size 14px
        text-align center
    .product .desc .name-wrap
        margin-bottom 2px
    .product .desc .name
        margin-right 4px
</style>
