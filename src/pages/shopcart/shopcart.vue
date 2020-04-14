<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="shopcart-container" v-if="!isEmpty">
            <div class="cart-list-wrap">
              <div class="cart-item" v-for="(item, index) in cartList" :key="index">
                <div class="check-wrap" @click="checkHandler(item)">
                  <span class="iconfont icon-checked" v-if="item.isChecked"></span>
                  <span class="iconfont icon-unchecked" v-else></span>
                </div>
                <div class="img-wrap">
                  <img :src="item.img_url" alt="">
                </div>
                <div class="right-box">
                  <div class="info-wrap">
                    <div class="title">
                      <span class="name">{{item.name}}</span>
                      <span class="spec">{{item.spec}}</span>
                    </div>
                    <span class="price">¥{{item.price}}</span>
                  </div>
                  <div class="control-wrap">
                    <div class="count-wrap">
                      <span class="reduce" @click="reduce(item)">-</span>
                      <span class="count">{{item.count}}</span>
                      <span class="add" @click="add(item)">+</span>
                    </div>
                    <span class="delete cubeic-close" @click="deleteHandler(item)"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="operate-wrap">
              <div class="select-all" @click="checkAll">
                <span class="iconfont icon-check" v-if="allChecked"></span>
                <span class="iconfont icon-unchecked" v-else></span>
                <span class="total-count">全选({{totalCount}})</span>
              </div>
              <span class="total-price">合计：¥{{totalPrice}}</span>
              <span class="place-order">去结算</span>
            </div>
        </div>
        <div class="shopcart-container" v-else>
          <p class="text">您还没有添加任何商品</p>
        </div>
        <tab></tab>
        <popup ref="popup"></popup>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import Tab from '@/components/tab/tab'
import Popup from '@/components/popup/popup'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      nav: {
        title: '购物车'
      }
    }
  },
  computed: {
    cartList () {
      return this.$store.state.cartList.filter(item => { return item.isDelete === false })
    },
    isEmpty () {
      return this.cartList.length === 0
    },
    checkedCartList () {
      return this.cartList.filter((item) => { return item.isChecked === true })
    },
    totalCount () {
      let count = 0
      this.checkedCartList.forEach((item) => {
        count += item.count
      })
      return count
    },
    totalPrice () {
      let totalPrice = 0
      this.checkedCartList.forEach((item) => {
        totalPrice += item.count * Number(item.price)
      })
      return totalPrice.toFixed(2)
    },
    allChecked () {
      return this.cartList.every((item) => { return item.isChecked === true })
    }
  },
  methods: {
    checkHandler (item) {
      item.isChecked = !item.isChecked
      this.updateCart(item)
    },
    deleteHandler (item) {
      item.isDelete = true
      this.updateCart(item)
    },
    reduce (item) {
      if (item.count > 1) {
        item.count--
      } else {
        this.show()
      }
      this.updateCart(item)
    },
    add (item) {
      item.count++
      this.updateCart(item)
    },
    show () {
      this.$refs.popup.show()
    },
    checkAll () {
      if (this.allChecked) {
        this.updateAll({
          isChecked: false
        })
      } else {
        this.updateAll({
          isChecked: true
        })
      }
    },
    ...mapMutations([
      'updateCart',
      'updateAll'
    ])
  },
  components: {
    topBar,
    Tab,
    Popup
  }
}
</script>

<style lang="stylus" scoped>
.shopcart-container
    margin 46px 0 60px 0
    .text
      text-align center
      font-size 14px
      color #c7c4c4
      margin-top 70px
    .cart-list-wrap
      width 100%
      .cart-item
        display flex
        align-items center
        width 100%
        padding 10px 20px 10px 10px
        box-sizing border-box
        border-bottom 1px solid #e1e1e1
        .check-wrap
          flex-basis 8%
          .iconfont
            font-size 26px
          .icon-checked
            color #e83d3e
        .img-wrap
          display flex
          align-items center
          justify-content center
          width 80px
          height 80px
          img
            width 80%
            border-radius 50%
        .right-box
          flex 1
          display flex
          flex-direction column
          justify-content space-between
          height 60px
          color #666
          font-size 14px
          margin-left 10px
          .info-wrap, .control-wrap
            display flex
            justify-content space-between
          .info-wrap .name
            margin-right 6px
          .control-wrap .count-wrap
            flex-basis 40%
            display flex
            justify-content space-between
            align-items center
            font-size 12px
          .count-wrap .reduce, .count-wrap .add
            font-size 16px
    .operate-wrap
      position fixed
      left 0
      right 0
      bottom 50px
      width 100%
      height 46px
      padding 0 10px
      background-color #ac956c
      font-size 14px
      color #fff
      display flex
      align-items center
      .select-all
        flex-basis 50%
        display flex
        align-items center
        .iconfont
          font-size 20px
          margin-right 10px
      .total-price
        flex 1
      .place-order
        flex-basis 20%
</style>
