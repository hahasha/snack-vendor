<template>
  <div class="container">
    <topBar :nav="nav"></topBar>
    <div class="order-detail-container">
      <div class="status-wrap">
        <span class="status">{{statusTxt[order.status]}}</span>
      </div>
      <div class="address-wrap">
        <span class="iconfont icon-location"></span>
        <div class="address">
          <div class="info-wrap">
            <span class="name">{{address.name}}</span>
            <span class="tel">{{address.tel}}</span>
          </div>
          <p class="detail">{{address.location.join(' ') + address.detail}}</p>
        </div>
      </div>
      <div class="order-wrap">
        <div class="product-wrap" v-for="(product, index) in order.product_list" :key="index">
          <div class="img-wrap">
            <img class="img" :src="product.img_url" alt="">
          </div>
          <p class="name-wrap">
            <span class="name">{{product.name}}</span>
            <span class="spec">{{product.spec}}</span>
          </p>
          <div class="price-wrap">
            <span class="price">¥{{product.price}}</span>
            <span class="count">x{{product.count}}</span>
          </div>
        </div>
        <div class="total-wrap">
          <span class="text">实付款</span>
          <span class="total-price">¥{{order.total_price}}</span>
        </div>
      </div>
      <div class="order-info">
        <span class="title">订单信息</span>
        <span class="order-num">订单编号 : {{order.order_num}}</span>
        <span class="create-time">创建时间 : {{formatTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      nav: {
        title: '订单详情',
        back: true
      },
      order: {},
      address: {}
    }
  },
  computed: {
    ...mapState([
      'addressList',
      'orderList'
    ]),
    statusTxt () {
      return ['', '待付款', '等待卖家发货', '卖家已发货', '交易成功']
    },
    btnTxt () {
      return ['', '去付款', '提醒发货', '确认收货', '评价']
    },
    formatTime () {
      return moment(this.order.create_time).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  created () {
    this.order = this.orderList.filter(item => item.id === Number(this.$route.query.id))[0]
    this.address = this.addressList.filter(item => item.id === this.order.address_id)[0]
  },
  components: {
    topBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  .order-detail-container
    padding-top 46px
    height 100%
    background #f4f4f4
    font-size 14px
    color #333
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
      justify-content space-between
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
        margin-bottom 10px
        display flex
        justify-content space-between
        .img-wrap
          flex-basis 22%
          height 80px
        .img
          width 100%
          height 100%
          border-radius 10px
        .name-wrap, .price-wrap
          margin-top 20px
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
        margin-top 30px
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
      .order-num, .create-time
        padding-left 6px
        color #666
</style>
