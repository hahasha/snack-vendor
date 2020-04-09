<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="shopcart-container">
            <div class="cart-list-wrap">
              <div class="cart-item" v-for="(item, index) in cartList" :key="index">
                <div class="check-wrap">
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
                      <span class="reduce">-</span>
                      <span class="count">{{item.count}}</span>
                      <span class="add">+</span>
                    </div>
                    <span class="delete cubeic-close"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="operate-wrap">
              <div class="select-all">
                <span class="iconfont icon-check" v-if="checkedAll"></span>
                <span class="iconfont icon-unchecked" v-else></span>
                <span class="total-count">全选(0)</span>
              </div>
              <span class="total-price">合计：¥0</span>
              <span class="place-order">去结算</span>
            </div>
        </div>
        <tab></tab>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import Tab from '@/components/tab/tab'
export default {
  data () {
    return {
      nav: {
        title: '购物车'
      },
      cartList: [{
        id: 2,
        name: '春生龙眼',
        img_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1145245586,2546465794&fm=26&gp=0.jpg',
        price: '19.9',
        spec: '500g',
        isChecked: true,
        isDelete: false,
        count: 1
      }, {
        id: 4,
        name: '贵妃笑',
        img_url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1582476418,2211105839&fm=26&gp=0.jpg',
        price: '59.9',
        spec: '500g',
        isChecked: false,
        isDelete: false,
        count: 2
      }],
      checkedAll: true
    }
  },
  components: {
    topBar,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
.shopcart-container
    margin 46px 0 60px 0
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
        flex-basis 54%
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
