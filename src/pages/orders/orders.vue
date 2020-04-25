<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="orders-container">
            <div class="tab-container">
              <cube-tab-bar v-model="selectedLabel" show-slider>
                <cube-tab v-for="(item,index) in tabs" :key="index" :label="item.label"></cube-tab>
              </cube-tab-bar>
            </div>
            <cube-tab-panels v-model="selectedLabel">
              <cube-tab-panel v-for="(item, index) in tabs" :key="index" :label="item.label">
                <div v-if="item.orders.length > 0">
                  <div class="order-wrap" v-for="(order, index) in item.orders" :key="index" @click="clickHandler(order.id)">
                    <div class="title-wrap">
                      <span class="order-num">订单编号: {{order.order_num}}</span>
                      <span class="status">{{statusTxt[order.status]}}</span>
                    </div>
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
                    <div class="operate-wrap">
                      <div class="total-wrap">
                        <span class="total-count">共{{order.total_count}}件商品</span>
                        <span class="total-price">实付: ¥{{order.total_price}}</span>
                      </div>
                      <span class="btn">{{btnTxt[order.status]}}</span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p class="text">您还没有相关的订单</p>
                </div>
              </cube-tab-panel>
            </cube-tab-panels>
        </div>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      nav: {
        title: '我的订单',
        back: true
      },
      selectedLabel: '全部',
      tabs: [
        {
          label: '全部',
          value: '0',
          orders: []
        },
        {
          label: '待付款',
          value: '1',
          orders: []
        },
        {
          label: '待发货',
          value: '2',
          orders: []
        },
        {
          label: '待收货',
          value: '3',
          orders: []
        },
        {
          label: '待评价',
          value: '4',
          orders: []
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'orderList'
    ]),
    statusTxt () {
      return ['', '待付款', '等待卖家发货', '卖家已发货', '交易成功']
    },
    btnTxt () {
      return ['', '去付款', '提醒发货', '确认收货', '评价']
    }
  },
  created () {
    this.tabs[0].orders = this.orderList
    this.tabs[1].orders = this.orderList.filter(item => { return item.status === 1 }) // 待付款
    this.tabs[2].orders = this.orderList.filter(item => { return item.status === 2 }) // 待发货
    this.tabs[3].orders = this.orderList.filter(item => { return item.status === 3 }) // 待收货
    this.tabs[4].orders = this.orderList.filter(item => { return item.status === 4 }) // 待评价
  },
  methods: {
    clickHandler (id) {
      this.$router.push({
        name: 'orderDetail',
        query: {
          id
        }
      })
    }
  },
  components: {
    topBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  .orders-container
    min-height 100%
    background #f4f4f4
    padding-top 46px
    box-sizing border-box
    font-size 14px
    .tab-container
      position: fixed;
      top 46px
      left 10px
      right 10px
      z-index 1000
      height 50px
      background: #f4f4f4
    .cube-tab-panels
      margin-top 50px
    >>>.cube-tab
      margin 10px 0
    >>>.cube-tab_active
      color #ab956c
    >>>.cube-tab-bar-slider
      background-color #ab956c
    .text
      text-align center
      margin 10px
      color #333
    .order-wrap
      background #fff
      margin 10px 10px 0 10px
      border-radius 10px
      color #333
      .title-wrap
        padding 15px 10px
        display flex
        align-items center
        justify-content space-between
        border-bottom 1px solid #f4f4f4
        .status
          color #ab956c
      .product-wrap
        padding 10px
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
          margin-top 10px
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
      .operate-wrap
        padding 10px
        display flex
        align-items center
        justify-content space-between
        .total-count
          margin-right 10px
        .btn
          border 1px solid #bbb
          padding 6px 14px
          border-radius 20px
          color #989898
</style>
