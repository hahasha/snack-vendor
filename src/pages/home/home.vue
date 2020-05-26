<template>
    <div class="container">
      <headBar :nav="nav"></headBar>
        <div class="home-container">
          <cube-scroll
            ref="scroll"
            :options="options"
            :data="newProducts"
            @pulling-up="onPullingUp"
          >
            <cube-slide :data="banners">
              <cube-slide-item v-for="item in banners" :key="item.id">
                <a href="">
                  <img :src="item.img.url | toFullPath" alt="">
                </a>
              </cube-slide-item>
            </cube-slide>
            <div class="theme-wrap">
                <h2 class="title">精选主题</h2>
                <div class="theme-content">
                    <div class="theme-item" v-for="item in themes" :key="item.id" @click="themeClickHandler(item)">
                        <img :src="item.topic_img.url | toFullPath" alt="">
                    </div>
                </div>
            </div>
            <div class="new-product-wrap">
                <h2 class="title">最近新品</h2>
                <div class="product-content">
                    <div class="product" v-for="(item, index) in newProducts" :key="index" @click="clickHandler(item)">
                        <img class="main-img" :src="item.main_img_url | toFullPath" alt="">
                        <div class="desc">
                          <p class="name">{{item.name}}</p>
                          <p class="price">¥{{item.price}}</p>
                        </div>
                    </div>
                </div>
            </div>
          </cube-scroll>
        </div>
      <tab></tab>
    </div>
</template>

<script>
import { getBanners, getThemes, getNewProducts } from '@/api/api'
import { baseImgUrl } from '@/api/http'
import headBar from '@/components/header/header'
import Tab from '@/components/tab/tab'
const COUNT = 6 // 新品每次请求的数量

export default {
  data () {
    return {
      nav: {
        title: '首页'
      },
      banners: [],
      themes: [],
      newProducts: [],
      page: 1,
      loadMore: true, // 用来判断是否加载完所有数据
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了'
    }
  },
  computed: {
    options () {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      }
    },
    pullUpLoadObj () {
      return {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      }
    }
  },
  filters: {
    toFullPath (value) {
      if (!value) return ''
      return baseImgUrl + value
    }
  },
  created () {
    this.getBanners()
    this.getThemes()
    this.getNewProducts()
  },
  methods: {
    onPullingUp () {
      setTimeout(() => {
        if (this.loadMore) {
          // 如果有新数据
          this.page = this.page + 1
          this.getNewProducts()
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    getBanners () {
      getBanners({
        id: 1
      }).then((res) => {
        if (res.errcode === 0) {
          const items = res.banners[0].items
          items.forEach(item => {
            this.banners.push(item)
          })
        }
      })
    },
    getThemes () {
      getThemes().then((res) => {
        if (res.errcode === 0) {
          res.themes.forEach(item => {
            this.themes.push(item)
          })
        }
      })
    },
    getNewProducts () {
      getNewProducts({
        page: this.page,
        limit: COUNT
      }).then((res) => {
        if (res.errcode === 0) {
          const newList = res.products.rows
          const count = res.products.count
          newList.forEach(item => {
            item.mainImgUrl = baseImgUrl + item.main_img_url
          })
          this.newProducts = this.newProducts.concat(newList)
          if (newList.length < COUNT || this.newProducts.length === count) {
            this.loadMore = false
          }
        }
      })
    },
    clickHandler (item) {
      this.$router.push(`product/${item.id}`)
    },
    themeClickHandler (item) {
      this.$router.push({
        name: 'theme',
        query: {
          item: item
        }
      })
    }
  },
  components: {
    headBar,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
.home-container
  height calc(100% - 96px)
  padding 46px 0 50px 0
>>> .cube-pullup-wrapper
  font-size 14px
  color #999
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
    display flex
    flex-wrap wrap
    justify-content space-between
    .product
      flex-basis 49.2%
      padding-bottom 10px
      background #f7f7f7
      font-size 14px
      margin-bottom 6px
      border-radius 4px
      text-align center
      .main-img
        width 80%
      .name, .price
        text-align center
        line-height 20px
</style>
