<template>
<div class="container">
  <topBar :nav="nav"></topBar>
  <div class="product-container">
    <div class="head-wrap">
        <div class="icon-cart-wrap" @click="goCart">
            <bubble :num="cartCount"></bubble>
            <span class="iconfont icon-cart"></span>
        </div>
        <div class="head-img-wrap">
            <img :src="productInfo.img_url" alt="">
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
                <div class="detail-wrap" v-if="details">
                    <div v-for="(item, index) in details" :key="index">
                        <img :src="item.d_img_url" alt="">
                    </div>
                </div>
                <div class="detail-wrap none" v-else>暂无详细信息</div>
            </cube-tab-panel>
            <cube-tab-panel label="产品参数">
                <div class="attr-wrap">
                  <div class="attr-item"><span>品名</span>{{attrs.name}}</div>
                  <div class="attr-item"><span>口味</span>{{attrs.taste}}</div>
                  <div class="attr-item"><span>产地</span>{{attrs.origin}}</div>
                  <div class="attr-item"><span>保质期</span>{{attrs.shelf_life}}</div>
                </div>
            </cube-tab-panel>
            <cube-tab-panel label="售后保证">
                <div class="after-sale-wrap">{{productInfo.after_sale}}</div>
            </cube-tab-panel>
        </cube-tab-panels>
    </div>
  </div>
</div>
</template>

<script>
import { getProductById } from '@/api/api'
import topBar from '@/components/top-bar/top-bar'
import Bubble from '@/components/bubble/bubble'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      nav: {
        title: '商品详情',
        back: true
      },
      like: false,
      cartCount: 0,
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
    showStock () {
      return this.productInfo.stock && this.productInfo.stock > 0 ? '有货' : '缺货'
    },
    attrs () {
      return this.productInfo.attrs ? this.productInfo.attrs : {}
    },
    details () {
      return this.productInfo.details && this.productInfo.details.length > 0 ? this.productInfo.details : ''
    },
    cartList () {
      return this.$store.state.cartList
    }
  },
  created () {
    this.getProductInfo()
    const index = this.cartList.findIndex(item => { return item.id === this.currentId })
    if (index !== -1) {
      this.cartCount = this.cartList[index].isDelete ? 0 : this.cartList[index].count
    }
  },
  methods: {
    getProductInfo () {
      getProductById({
        id: this.currentId
      }).then((data) => {
        this.productInfo = data
      })
    },
    collect () {
      this.like = !this.like
    },
    addCart () {
      this.cartCount++
      this.updateCart(Object.assign(this.productInfo, {
        count: this.cartCount,
        isDelete: false,
        isChecked: false
      }))
    },
    goCart () {
      this.$router.push('/shopCart')
    },
    ...mapMutations([
      'updateCart'
    ])
  },
  components: {
    topBar,
    Bubble
  }
}
</script>

<style lang="stylus" scoped>
.product-container
    margin-top 46px
    height 100%
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
        height 160px
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
