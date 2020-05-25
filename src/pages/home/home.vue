<template>
    <div class="container">
      <topBar :nav="nav"></topBar>
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
                  <img :src="item.imgUrl" alt="">
                </a>
              </cube-slide-item>
            </cube-slide>
            <div class="theme-wrap">
                <h2 class="title">精选主题</h2>
                <div class="theme-content">
                    <div class="theme-item" v-for="item in themes" :key="item.id" @click="themeClickHandler(item)">
                        <img :src="item.topicImgUrl" alt="">
                    </div>
                </div>
            </div>
            <div class="new-product-wrap">
                <h2 class="title">最近新品</h2>
                <div class="product-content">
                    <div class="product" v-for="(item, index) in newProducts" :key="index" @click="clickHandler(item)">
                        <img :src="item.mainImgUrl" alt="">
                        <div class="desc">
                            <p class="name-wrap">
                                <span class="name">{{item.name}}</span>
                            </p>
                            <span class="price">¥{{item.price}}</span>
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
import topBar from '@/components/top-bar/top-bar'
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
            item.imgUrl = baseImgUrl + item.img.url
            this.banners.push(item)
          })
        }
      })
    },
    getThemes () {
      getThemes().then((res) => {
        if (res.errcode === 0) {
          res.themes.forEach(item => {
            item.topicImgUrl = baseImgUrl + item.topic_img.url
            item.headImgUrl = baseImgUrl + item.head_img.url
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
    topBar,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
.home-container
  height 100%
  padding 46px 0 50px 0
  box-sizing border-box
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
        bottom 0px
        font-size 14px
        text-align center
    .product .desc .name-wrap
        margin-bottom 2px
    .product .desc .name
        margin-right 4px
</style>
