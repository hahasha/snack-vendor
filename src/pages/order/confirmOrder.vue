<template>
  <div class="container">
    <headBar :nav="nav"></headBar>
    <div class="confirm-container">
      <cube-scroll>
        <div class="address-wrap" @click="changeAddress">
          <span class="iconfont icon-location"></span>
          <div class="address" v-if="!isEmpty(address)">
            <div class="info-wrap">
              <span class="name">{{address.name}}</span>
              <span class="tel">{{address.mobile}}</span>
            </div>
            <p class="detail">{{fullAddress}}</p>
          </div>
          <div class="address" v-else>请选择收货地址</div>
          <span class="cubeic-arrow"></span>
        </div>
        <ul class="product-list">
          <li v-for="(item, index) in checkedCartList" :key="index">
            <div class="head-img-wrap">
              <img :src="item.main_img_url | toFullPath" alt="">
            </div>
            <div class="desc">
              <span class="name">{{item.name}}</span>
              <span class="price">¥{{item.price}}</span>
            </div>
            <div class="count">x{{item.count}}</div>
          </li>
        </ul>
      </cube-scroll>
      <div class="operate-wrap">
        <div class="total-wrap">
          <span class="totalcount">共{{totalCount}}件</span>
          <span class="totalprice">合计: ¥{{totalPrice | toFixed}}</span>
        </div>
        <cube-button :inline="true" @click="placeOrder">提交订单</cube-button>
      </div>
    </div>
  </div>
</template>

<script>
import headBar from '@/components/header/header'
import { mapGetters, mapMutations } from 'vuex'
import { baseImgUrl } from '@/api/http'
import { getDefault, placeOrder } from '@/api/api'
export default {
  data () {
    return {
      nav: {
        title: '确认订单',
        back: true
      },
      address: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'checkedCartList',
      'totalCount',
      'totalPrice'
    ]),
    fullAddress () {
      const { province, city, country, detail } = this.address
      return province + ' ' + city + ' ' + country + ' ' + detail
    }
  },
  filters: {
    toFullPath (value) {
      if (!value) return ''
      return baseImgUrl + value
    },
    toFixed (value) {
      return value.toFixed(2)
    }
  },
  created () {
    const address = this.$route.params.address
    if (address) {
      this.address = address // 修改当前地址为所选地址
    } else {
      this.getAddress()
    }
  },
  methods: {
    getAddress () {
      getDefault({
        id: this.userInfo.id
      }).then(res => {
        if (res.errcode === 0 && res.address) {
          this.address = res.address
        }
      })
    },
    changeAddress () {
      this.$router.push({
        name: 'address',
        params: {
          name: this.$route.name
        }
      })
    },
    placeOrder () { // 下单
      if (this.isEmpty(this.address)) {
        this.$createDialog({
          type: 'alert',
          content: '请选择收货地址'
        }).show()
      }
      placeOrder({
        user_id: this.userInfo.id,
        total_price: this.totalPrice,
        total_count: this.totalCount,
        snap_address: this.address,
        snap_items: this.checkedCartList
      }).then(res => {
        if (res.errcode === 0) {
          this.deleteChecked(this.checkedCartList) // 购物车删除下单成功的商品
          this.$router.push(`orderDetail?id=${res.order_id}`)
        } else {
          this.$createToast({
            type: 'error',
            txt: res.msg,
            time: 1000
          }).show()
        }
      })
    },
    isEmpty (e) {
      var t
      for (t in e) {
        return !1
      }
      return !0
    },
    ...mapMutations({
      deleteChecked: 'DELETE_CART_CHECKED'
    })
  },
  components: {
    headBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  .confirm-container
    height calc(100% - 46px)
    padding-top 46px
    background #f4f4f4
    font-size 14px
    color #333
    .address-wrap
      height: 70px;
      box-sizing: border-box;
      background #fff
      padding 20px 10px
      display flex
      align-items center
      justify-content space-between
      .icon-location
        flex-basis 8%
        font-size 32px
        color #baaa8d
      .address
        flex-basis 80%
        .info-wrap
          margin-bottom 8px
          .name
            margin-right 6px
          .tel
            color #b2b2b2
            font-size 12px
        .detail
          line-height 20px
      .cubeic-arrow
        color #b2b2b2
    .product-list
      margin-top 10px
      background #fff
      margin-bottom 50px
      li
        display flex
        align-items center
        justify-content space-between
        padding 10px 14px
        border-bottom 1px solid #f4f4f4
        .head-img-wrap
          flex-basis 20%
          height 60px
          img
            width 100%
            height 100%
            border-radius 50%
        .desc
          flex-basis 65%
          display flex
          flex-direction column
          line-height 22px
          .title-wrap
            margin-bottom 10px
            .name
              margin-right 4px
    .operate-wrap
      position fixed
      left 0
      right 0
      bottom 0
      z-index 99
      border-top 1px solid #f4f4f4
      padding 6px 10px
      background #fff
      display flex
      align-items center
      justify-content space-between
      height: 50px;
      box-sizing: border-box;
      .totalcount, .totalprice
        margin-left 15px
        color #a80c0c
      >>>.cube-btn
          background-color #ab956c
          padding 12px 20px
          border-radius 20px
          font-size 14px
</style>
