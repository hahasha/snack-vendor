<template>
<div class="container">
  <headBar :nav="nav"></headBar>
  <cube-scroll>
    <div class="product-container">
      <div class="head-wrap">
          <div class="icon-cart-wrap" @click="goCart">
              <bubble :num="cartCount"></bubble>
              <span class="iconfont icon-cart"></span>
          </div>
          <div class="head-img-wrap">
              <img :src="productInfo.main_img_url | toFullPath" alt="">
          </div>
          <div class="operate-wrap">
              <div class="like" @click="collect">
                  <div v-if="like">
                    <span>已收藏</span>
                    <span class="iconfont icon-star-active"></span>
                  </div>
                  <div else>
                    <span>收藏</span>
                    <span class="iconfont icon-star"></span>
                  </div>
              </div>
              <div class="cart" @click="addCart">
                  <span>加入购物车</span>
                  <span class="iconfont icon-cart"></span>
              </div>
          </div>
          <div class="info-wrap">
              <span class="stock">{{showStock}}</span>
              <span class="price">¥{{productInfo.price}}</span>
          </div>
      </div>
      <div class="tab-wrap">
          <cube-tab-bar v-model="selectedTab" :data="tabs" show-slider></cube-tab-bar>
          <cube-tab-panels v-model="selectedTab">
              <cube-tab-panel label="商品详情" >
                  <div class="detail-wrap" v-if="!isEmpty(productInfo.details)">
                      <div v-for="item in productInfo.details" :key="item.id">
                          <img :src="item.url | toFullPath" alt="">
                      </div>
                  </div>
                  <div class="detail-wrap none" v-else>暂无详细信息</div>
              </cube-tab-panel>
              <cube-tab-panel label="产品参数">
                  <div class="attr-wrap" v-if="!isEmpty(productInfo.properties)">
                    <div v-for="item in productInfo.properties" :key="item.id">
                      <div class="attr-item"><span>{{item.name}}</span>{{item.detail}}</div>
                    </div>
                  </div>
                  <div class="detail-wrap none" v-else>暂无详细信息</div>
              </cube-tab-panel>
              <cube-tab-panel label="售后保证">
                  <div class="after-sale-wrap">七天无理由退换</div>
              </cube-tab-panel>
          </cube-tab-panels>
      </div>
    </div>
  </cube-scroll>
</div>
</template>

<script>
import { getProductById } from '@/api/api'
import { baseImgUrl } from '@/api/http'
import headBar from '@/components/header/header'
import Bubble from '@/components/bubble/bubble'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      nav: {
        title: '商品详情',
        back: true
      },
      like: false,
      cartCount: 0, // 当前商品加购数量
      productInfo: {},
      selectedTab: '商品详情',
      tabs: [{
        label: '商品详情'
      }, {
        label: '产品参数'
      }, {
        label: '售后保证'
      }],
      currentId: Number(this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters([
      'cartList'
    ]),
    showStock () {
      return this.productInfo.stock && this.productInfo.stock > 0 ? '有货' : '缺货'
    }
  },
  created () {
    this.getProductInfo()
    this.setCartCount()
  },
  filters: {
    toFullPath (value) {
      if (!value) return ''
      return baseImgUrl + value
    }
  },
  methods: {
    setCartCount () {
      const product = this.cartList.filter(item => item.id === this.currentId)[0]
      if (this.isEmpty(product)) {
        this.cartCount = 0
      } else {
        this.cartCount = product.count
      }
    },
    getProductInfo () {
      getProductById({
        id: this.currentId
      }).then((res) => {
        if (res.errcode === 0) {
          this.productInfo = res.product
        }
      })
    },
    collect () {
      this.like = !this.like
    },
    addCart () {
      this.cartCount++
      this.updateCart(Object.assign(this.productInfo, {
        count: this.cartCount,
        isChecked: false
      }))
    },
    goCart () {
      this.$router.push('/shopCart')
    },
    isEmpty (e) {
      var t
      for (t in e) {
        return !1
      }
      return !0
    },
    ...mapMutations({
      updateCart: 'UPDATE_CART'
    })
  },
  components: {
    headBar,
    Bubble
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
.product-container
    margin-top 46px
    height calc(100% - 46px)
    background-color #f9f9f9
    .head-wrap
        padding 40px 20px 20px 20px
        background-color #fff
        position relative
    .head-wrap .icon-cart-wrap
        position absolute
        top 30px
        right 30px
    .head-wrap .icon-cart
        font-size 24px
    .head-img-wrap
        width 200px
        height 180px
        margin 0 auto
    .head-img-wrap img
        width 100%
        height 100%
        border-radius 50%
    .operate-wrap
        display flex
        width 100%
        height 50px
        line-height 50px
        margin-top 40px
        border-radius 30px
        font-size 14px
        color #fff
        background-color #ab956c
        letter-spacing 1px
    .operate-wrap .like
        position relative
        flex-basis 50%
        text-align center
    .operate-wrap .like:after
        content ''
        height 20px
        border-right 1px dotted #fff
        position absolute
        top 15px
        right 0
    .operate-wrap .cart
        flex 1
        text-align center
    .operate-wrap .icon-star, .operate-wrap .icon-star-active, .operate-wrap .icon-cart
        font-size 14px
        margin-left 14px
    .info-wrap
        width 100%
        margin-top 20px
        display flex
        flex-direction column
        align-items center
        font-size 14px
        color #666
    .info-wrap .price
        margin-top 10px
    .tab-wrap
        margin-top 14px
        height 100%
        background-color #fff
        font-size 14px
        color #666
    >>> .cube-tab-bar
        height 44px
        border-bottom 1px solid #e3e2e5
    >>> .cube-tab_active
        color #bdaa8b
    >>> .cube-tab-bar-slider
        background-color #bdaa8b
    >>> .cube-tab-panel
        margin-top 8px
    .tab-wrap .detail-wrap.none
        text-align center
        margin-top 10px
    .tab-wrap .detail-wrap img
        width 100%
        vertical-align middle
    .attr-wrap
        margin 10px 0 0 24px
    .attr-wrap .attr-item
        margin-bottom 14px
    .attr-wrap .attr-item span
        display inline-block
        width 60px
    .after-sale-wrap
        text-align center
        margin-top 10px
</style>
