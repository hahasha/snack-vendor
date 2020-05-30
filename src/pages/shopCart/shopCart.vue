<template>
    <div class="container">
        <headBar :nav="nav"></headBar>
        <div class="shopcart-container" v-if="cartList.length">
          <cube-scroll>
              <div class="cart-list-wrap">
                <div class="cart-item" v-for="(item, index) in cartList" :key="index">
                  <div class="check-wrap" @click="checkHandler(item)">
                    <span class="iconfont icon-checked" v-if="item.isChecked"></span>
                    <span class="iconfont icon-unchecked" v-else></span>
                  </div>
                  <div class="img-wrap">
                    <img :src="item.main_img_url | toFullPath" alt="">
                  </div>
                  <div class="right-box">
                    <div class="info-wrap">
                      <span class="name">{{item.name}}</span>
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
            </cube-scroll>
            <div class="operate-wrap">
              <div class="select-all" @click="checkAll">
                <span class="iconfont icon-check" v-if="allChecked"></span>
                <span class="iconfont icon-unchecked" v-else></span>
                <span class="total-count">全选({{totalCount}})</span>
              </div>
              <span class="total-price">合计：¥{{totalPrice | toFixed}}</span>
              <span class="place-order" @click="confirmOrder">去结算</span>
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
import headBar from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Popup from '@/components/popup/popup'
import { baseImgUrl } from '@/api/http'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      nav: {
        title: '购物车'
      }
    }
  },
  computed: {
    ...mapGetters([
      'cartList',
      'checkedCartList',
      'totalCount',
      'totalPrice',
      'allChecked'
    ])
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
  methods: {
    checkHandler (item) {
      item.isChecked = !item.isChecked
      this.updateCart(item)
    },
    deleteHandler (item) {
      this.$createDialog({
        type: 'confirm',
        content: '确认删除该商品吗？',
        confirmBtn: {
          text: '确定',
          active: true
        },
        cancelBtn: {
          text: '取消',
          active: false
        },
        onConfirm: () => {
          this.deleteCart(item)
          this.$createToast({
            type: 'correct',
            time: 1000,
            txt: '删除成功'
          }).show()
        },
        onCancel: () => {
        }
      }).show()
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
      if (!this.allChecked) {
        this.updateAll('check')
      } else {
        this.updateAll('unCheck')
      }
    },
    confirmOrder () {
      if (this.checkedCartList.length > 0) {
        this.$router.push('confirmOrder')
      } else {
        this.$createToast({
          type: 'warn',
          txt: '请至少选择一件商品！',
          time: 1000
        }).show()
      }
    },
    ...mapMutations({
      updateCart: 'UPDATE_CART',
      deleteCart: 'DELETE_CART',
      updateAll: 'UPDATE_CART_ALL'
    })
  },
  components: {
    headBar,
    Tab,
    Popup
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
.shopcart-container
  height calc(100% - 142px)
  padding 46px 0 96px 0
  .text
    text-align center
    font-size 14px
    color #c7c4c4
    margin-top 20px
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
        flex-basis 10%
        .iconfont
          font-size 24px
        .icon-checked
          color #e83d3e
      .img-wrap
        display flex
        align-items center
        justify-content center
        width 80px
        height 80px
        background #f7f7f7
        img
          width 100%
      .right-box
        flex 1
        display flex
        flex-direction column
        justify-content space-between
        height 60px
        color #666
        font-size 14px
        margin-left 14px
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
