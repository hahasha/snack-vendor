<template>
  <div class="container">
    <topBar :nav="nav"></topBar>
    <div class="category-container">
      <div class="left-panel">
          <cube-scroll>
              <cube-tab-bar v-model="currrentIndex">
                <cube-tab v-for="(item, index) in categories" :key="index" :label="item.title" :value="item.id">
                  {{item.title}}
                </cube-tab>
              </cube-tab-bar>
          </cube-scroll>
      </div>
      <div class="right-panel">
          <cube-scroll ref="scroll">
              <div class="head-img-wrap" >
                  <img :src="c_category.head_img_url" alt="">
              </div>
              <ul class="product-wrap">
                  <li class="product" v-for="(item, index) in c_products" :key="index" @click="clickHandler(item)">
                      <div class="img-wrap">
                          <img :src="item.img_url" alt="">
                      </div>
                      <p class="desc">
                          <span class="name">{{item.name}}</span>
                          <span class="spec">{{item.spec}}</span>
                      </p>
                  </li>
              </ul>
          </cube-scroll>
      </div>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import { getCategories, getProducts } from '@/api/api'
import topBar from '@/components/top-bar/top-bar'
import Tab from '@/components/tab/tab'
export default {
  data () {
    return {
      nav: {
        title: '分类'
      },
      currrentIndex: 1,
      categories: [],
      products: []
    }
  },
  computed: {
    c_products () {
      return this.products.filter((item) => item.category_id === this.currrentIndex)
    },
    c_category () {
      return this.categories.length > 0 ? this.categories[this.currrentIndex - 1] : {}
    }
  },
  created () {
    this.getCategories()
    this.getProducts()
  },
  methods: {
    getCategories () {
      getCategories().then((categories) => {
        this.categories = categories
      })
    },
    getProducts () {
      getProducts().then((products) => {
        this.products = products
      })
    },
    clickHandler (item) {
      this.$router.push({
        path: `product/${item.id}`
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
.category-container
    margin 46px 0 60px 0
    .left-panel
        position absolute
        width 22%
        height 100%
        box-sizing border-box
        top 46px
        left 0
        border-right 1px solid #dddddd
    .cube-tab-bar
        flex-direction column
        justify-content flex-start
        font-size 14px
    >>> .cube-tab
        position relative
        flex none
        width 100%
        padding 18px 0
    >>> .cube-tab_active
        color #ab956c
    >>> .cube-tab_active:after
            content ''
            width 2px
            height 100%
            position absolute
            top 0
            left 0
            background-color #ab956c
    .right-panel
        margin-left 22%
        box-sizing border-box
        padding 20px
    .head-img-wrap
        width 100%
        margin-bottom 20px
    .head-img-wrap img
        width 100%
        height 100px
        border-radius 2px
    .product
        width 33%
        display inline-block
    .product .img-wrap
        width 100%
        text-align center
    .product img
        width 50%
        height 50px
    .product .desc
        font-size 12px
        text-align center
        margin 8px 0 20px 0
    .product .desc .name
        margin-right 2px
</style>
