<template>
  <div class="category-container">
    <div class="left-panel">
        <cube-scroll>
            <cube-tab-bar v-model="selectedTab" @change="changeHandler">
              <cube-tab v-for="(item, index) in categories" :key="index" :label="item.title" :value="item.id">
                {{item.title}}
              </cube-tab>
            </cube-tab-bar>
        </cube-scroll>
    </div>
    <div class="right-panel">
        <cube-scroll ref="scroll">
            <div class="head-img-wrap">
                <img src="" alt="">
            </div>
            <ul class="product-wrap">
                <li class="product" v-for="(item, index) in currentData" :key="index">
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
</template>

<script>
import { getCategories, getProducts } from '@/api/api'
export default {
  data () {
    return {
      selectedTab: 1,
      categories: [],
      currentData: []
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    changeHandler (value) {
      const category = this.categories[value - 1]
      getProducts().then((products) => {
        products.forEach(item => {
          if (item.category_id === category.id) {
            this.currentData.push(item)
          }
        })
      })
    },
    getCategories () {
      getCategories().then((categories) => {
        this.categories = categories
      })
    }
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
