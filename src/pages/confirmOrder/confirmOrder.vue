<template>
  <div class="container">
    <topBar :nav="nav"></topBar>
    <div class="confirm-container">
      <div class="address-wrap" @click="selectAddress">
        <span class="iconfont icon-location"></span>
        <div class="address" v-if="selectedAddress">
          <div class="info-wrap">
            <span class="name">{{selectedAddress.name}}</span>
            <span class="tel">{{selectedAddress.tel}}</span>
          </div>
          <p class="detail">{{selectedAddress.location.join('') + selectedAddress.detail}}</p>
        </div>
        <div class="address" v-else>请添加一个收货地址</div>
        <span class="cubeic-arrow"></span>
      </div>
      <ul class="product-list">
        <li v-for="(item, index) in checkedList" :key="index">
          <div class="head-img-wrap">
            <img :src="item.img_url" alt="">
          </div>
          <div class="desc">
            <p class="title-wrap">
              <span class="name">{{item.name}}</span>
              <span class="spec">{{item.spec}}</span>
            </p>
            <span class="price">¥{{item.price}}</span>
          </div>
          <div class="count">x{{item.count}}</div>
        </li>
      </ul>
      <div class="operate-wrap">
        <div class="total-wrap">
          <span class="totalcount">共{{totalCount}}件</span>
          <span class="totalprice">合计: ¥{{totalPrice}}</span>
        </div>
        <cube-button :inline="true" @click="placeOrder">提交订单</cube-button>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      nav: {
        title: '确认订单',
        back: true
      } //,
      // orderInfo: {
      //   id: 1,
      //   order_num: '',
      //   user_id: null,
      //   address_id: null,
      //   product_list: [],
      //   status: 1, // 1：待付款 2：待发货 3：待收货 4：待评价
      //   create_time: '',
      //   total_count: 0,
      //   total_price: 0,
      // }
    }
  },
  computed: {
    ...mapState([
      'currentUser',
      'cartList',
      'addressList'
    ]),
    selectedAddress () {
      if (this.$route.params.status === 'selected') {
        return this.$route.params.selectedAddress
      } else {
        return this.addressList.filter(item => { return item.isDefault === true })[0] || this.addressList[0] || null
      }
    },
    checkedList () {
      return this.cartList.filter(item => { return item.isChecked === true && item.isDelete === false })
    },
    totalCount () {
      let totalCount = 0
      this.checkedList.forEach(item => {
        totalCount += item.count
      })
      return totalCount
    },
    totalPrice () {
      let totalPrice = 0
      this.checkedList.forEach(item => {
        totalPrice += item.count * Number(item.price)
      })
      return totalPrice.toFixed(2)
    }
  },
  methods: {
    selectAddress () {
      this.$router.push({
        name: 'address',
        params: {
          type: 'select'
        }
      })
    },
    placeOrder () {
      if (!this.currentUser) {
        this.$createDialog({
          type: 'confirm',
          content: '请先登录',
          icon: 'cubeic-alert',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.$router.push('login')
          }
        }).show()
      } else {
        const orderInfo = {
          user_id: this.currentUser.id,
          address_id: this.selectedAddress.id,
          product_list: this.checkedList,
          total_count: this.totalCount,
          total_price: this.totalPrice
        }
        this.saveOrder(orderInfo)
        this.$router.push('orders')
      }
    },
    ...mapMutations([
      'saveOrder'
    ])
  },
  components: {
    topBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  .confirm-container
    height 100%
    background #f4f4f4
    padding-top 46px
    box-sizing border-box
    font-size 14px
    color #333
    .address-wrap
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
          line-height 16px
      .cubeic-arrow
        color #b2b2b2
    .product-list
      margin-top 10px
      background #fff
      height 100%
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
          .title-wrap
            margin-bottom 10px
            .name
              margin-right 4px
    .operate-wrap
      position fixed
      left 0
      right 0
      bottom 0
      border-top 1px solid #f4f4f4
      padding 6px 10px
      background #fff
      display flex
      align-items center
      justify-content space-between
      .totalcount, .totalprice
        margin-left 15px
        color #a80c0c
      >>>.cube-btn
          background-color #ab956c
          padding 12px 20px
          border-radius 20px
          font-size 14px
</style>
