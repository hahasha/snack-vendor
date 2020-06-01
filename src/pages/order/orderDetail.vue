<template>
  <div class="container">
    <headBar :nav="nav"></headBar>
    <div class="order-detail-container" v-if="!isEmpty(order)">
      <div class="scroll-wrap">
        <cube-scroll>
          <div class="status-wrap">
            <span class="status">{{statusTxt[order.status]}}</span>
          </div>
          <div class="address-wrap">
            <span class="iconfont icon-location"></span>
            <div class="address">
              <div class="info-wrap">
                <span class="name">{{address.name}}</span>
                <span class="tel">{{address.mobile}}</span>
              </div>
              <p class="detail">{{fullAddress}}</p>
            </div>
          </div>
          <div class="order-wrap">
            <div class="product-wrap"
              v-for="(item, index) in productList"
              :key="index"
              @click="clickHandler(item.id)"
              >
              <div class="img-wrap">
                <img class="img" :src="item.main_img_url | toFullPath" alt="">
              </div>
              <p class="name-wrap">
                <span class="name">{{item.name}}</span>
              </p>
              <div class="price-wrap">
                <span class="price">¥{{item.price}}</span>
                <span class="count">x{{item.count}}</span>
              </div>
            </div>
            <div class="total-wrap">
              <span class="text">实付款</span>
              <span class="total-price">¥{{order.total_price}}</span>
            </div>
          </div>
          <div class="order-info">
            <span class="title">订单信息</span>
            <span class="info-item">订单编号 : {{order.order_no}}</span>
            <span class="info-item" v-if="order.trade_no">支付宝交易号 : {{order.trade_no}}</span>
            <span class="info-item">创建时间 : {{formatTime}}</span>
            <span class="info-item" v-if="order.gmt_payment">付款时间 : {{order.gmt_payment}}</span>
          </div>
        </cube-scroll>
      </div>
      <div class="operate-wrap">
        <div class="btn" v-if="order.status === 1" @click="goPay">去付款</div>
        <div class="btn" v-else-if="order.status === 2">提醒发货</div>
        <div class="btn" v-else-if="order.status === 3">确认收货</div>
        <div class="btn" v-else>评价</div>
      </div>
    </div>
  </div>
</template>

<script>
import headBar from '@/components/header/header'
import { getOrderDetail, pay } from '@/api/api'
import { baseImgUrl } from '@/api/http'
import moment from 'moment'
export default {
  data () {
    return {
      nav: {
        title: '订单详情',
        back: true
      },
      order: {},
      address: {},
      productList: []
    }
  },
  computed: {
    statusTxt () {
      return ['', '待付款', '支付成功！等待卖家发货', '卖家已发货', '交易成功']
    },
    formatTime () {
      return moment(this.order.create_time).format('YYYY-MM-DD hh:mm:ss')
    },
    fullAddress () {
      const { province, city, country, detail } = this.address
      return province + ' ' + city + ' ' + country + ' ' + detail
    }
  },
  filters: {
    toFullPath (value) {
      if (!value) return ''
      return baseImgUrl + value
    }
  },
  created () {
    this.getOrder()
  },
  methods: {
    getOrder () {
      getOrderDetail({
        orderNo: this.$route.query.orderNo
      }).then(res => {
        if (res.errcode === 0) {
          console.log(res)
          this.address = JSON.parse(res.order.snap_address)
          this.productList = JSON.parse(res.order.snap_items)
          this.order = res.order
        } else {
          this.$createToast({
            type: 'error',
            txt: res.msg,
            time: 1000
          })
        }
      })
    },
    clickHandler (id) {
      this.$router.push(`product/${id}`)
    },
    isEmpty (e) {
      var t
      for (t in e) {
        return !1
      }
      return !0
    },
    goPay () {
      pay({
        body: '零食商贩', // 订单描述
        subject: this.productList.length >= 1 ? this.productList[0].name + '等' : this.productList[0].name, // 订单标题
        outTradeId: this.order.order_no + '', // 订单号
        amount: this.order.total_price + '',
        returnPath: this.$route.fullPath
      }).then(res => {
        if (res.errcode === 0 && res.url) {
          window.location = res.url
        }
      })
    }
  },
  components: {
    headBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  .order-detail-container
    padding-top 46px
    height calc(100% - 46px)
    background #f4f4f4
    font-size 14px
    color #333
    .scroll-wrap
      height calc(100% - 50px)
    .status-wrap
      background #fff
      padding 20px 0
      margin-bottom 10px
      color #ab956c
      text-align center
    .address-wrap
      background #fff
      margin-bottom 10px
      padding 20px 10px
      display flex
      align-items center
      .iconfont
        flex-basis 12%
        font-size 30px
        color #ab956c
      .name
        margin-right 6px
      .tel
        color #666
        font-size 12px
      .detail
        line-height 18px
      .info-wrap
        margin-bottom 6px
    .order-wrap
      background #fff
      padding 20px 10px
      margin-bottom 10px
      .product-wrap
        display flex
        justify-content space-between
        align-items center
        .img-wrap
          flex-basis 22%
          height 80px
        .img
          width 100%
          height 100%
          border-radius 10px
        .name-wrap
          flex-basis 50%
          .name
            margin-right 6px
        .price-wrap
          display flex
          flex-direction column
          align-items flex-end
          .count
            margin-top 6px
            font-size 12px
            color #999
      .total-wrap
        margin-top 20px
        font-size 16px
        display flex
        align-items center
        justify-content space-between
        .total-price
          color #d73636
    .order-info
      background #fff
      padding 20px 10px
      display flex
      flex-direction column
      line-height 30px
      .title
        position relative
        font-size 16px
        margin-bottom 10px
        padding-left 6px
      .title:before
        position absolute
        top 6px
        left 0
        content: ''
        width 2px
        height 16px
        background #d73636
      .info-item
        padding-left 6px
        color #666
    .operate-wrap
      position fixed
      bottom 0
      left 0
      right 0
      z-index 99
      width 100%
      height 50px
      border-top 1px solid #e5e5e5
      box-sizing border-box
      background #fff
      display flex
      align-items center
      justify-content flex-end
      padding 0 20px
      .btn
        width 70px
        height 30px
        line-height 30px
        text-align center
        border 1px solid #ab956c
        border-radius 20px
        color #ab956c
</style>
