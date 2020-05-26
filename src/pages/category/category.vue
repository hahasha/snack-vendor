<template>
  <div class="container">
    <headBar :nav="nav"></headBar>
    <div class="category-container">
      <div class="left-panel">
        <cube-scroll>
          <cube-tab-bar v-model="selectedLabel" @change="changeHandler">
            <cube-tab v-for="item in categories" :key="item.name" :label="item.name">
            </cube-tab>
          </cube-tab-bar>
        </cube-scroll>
      </div>
      <transition name="fade">
        <div class="right-panel" v-if="currentData" :key="currentData.id">
          <cube-scroll class="scroll-wrap">
            <img class="head-img" :src="currentData.headImgUrl" alt="">
            <ul class="product-list">
              <li class="product"
                v-for="item in currentData.products"
                :key="item.id"
                @click="clickHandler(item)"
                >
                <img class="main-img" :src="item.mainImgUrl" alt="">
                <p class="name">{{item.name}}</p>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import { getCategories } from '@/api/api'
import { baseImgUrl } from '@/api/http'
import headBar from '@/components/header/header'
import Tab from '@/components/tab/tab'
export default {
  data () {
    return {
      nav: {
        title: '分类'
      },
      selectedLabel: '', // 当前导航active的key
      categories: []
    }
  },
  computed: {
    currentData () {
      return this.categories.filter(item => item.name === this.selectedLabel)[0]
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    changeHandler (label) {
      this.selectedLabel = label
    },
    getCategories () {
      getCategories().then(res => {
        if (res.errcode === 0) {
          const categories = res.categories
          categories.forEach(item => {
            item.headImgUrl = baseImgUrl + item.headImg.url
            item.products.forEach(pItem => {
              pItem.mainImgUrl = baseImgUrl + pItem.main_img_url
            })
          })
          this.selectedLabel = categories[0].name
          this.categories = this.categories.concat(categories)
        }
      })
    },
    clickHandler (item) {
      this.$router.push({
        path: `product/${item.id}`
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
.fade-enter-active
  // transition transform .8s ease
  transition opacity .5s ease
.fade-enter, .fade-leave-to
  // transform translateY(571px)
  opacity 0
.container
  height 100%
.category-container
  padding 46px 0 50px 0
  height calc(100% - 96px)
  .left-panel
    position absolute
    width 22%
    bottom 50px
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
    .scroll-wrap
      height 100%
      box-sizing border-box
      padding 15px
    .head-img
      width 100%
    .product-list
      display flex
      flex-wrap wrap
    .product
      flex-basis 33%
      font-size 12px
      margin-bottom 10px
    .main-img
      width 100%
    .name
      width 80%
      margin 0 auto
      text-align center
      line-height 20px
</style>
