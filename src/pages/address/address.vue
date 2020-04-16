<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="address-container" v-if="addressList.length">
            <div class="add-address" @click="addAddress">添加新地址</div>
            <div class="address-item" v-for="(item, index) in addressList" :key="index">
                <div class="icon-wrap">
                    <span class="iconfont icon-address-home" v-if="item.label==='家'"></span>
                    <span class="iconfont icon-address-company2" v-else-if="item.label==='公司'"></span>
                    <span class="iconfont icon-address-school" v-else-if="item.label==='学校'"></span>
                    <span class="iconfont icon-default" v-else>{{item.name.slice(-1)}}</span>
                </div>
                <div class="info-wrap">
                    <p class="user-info">
                        <span class="name">{{item.name}}</span>
                        <span class="tel">{{item.tel}}</span>
                    </p>
                    <div class="address-wrap">
                        <p class="detail">
                            <span class="default" v-show="item.isDefault">默认</span>
                            <span class="label" v-show="item.label">{{item.label}}</span>
                            {{item.location.join(' ') + ' ' + item.detail}}
                        </p>
                    </div>
                </div>
                <span class="edit" @click="editAddress(item)">编辑</span>
            </div>
        </div>
        <div class="address-container" v-else>
          <div class="add-address" @click="addAddress">添加新地址</div>
          <p class="text">请添加收货地址</p>
        </div>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
export default {
  data () {
    return {
      nav: {
        title: '我的收货地址',
        back: true
      }
    }
  },
  computed: {
    addressList () {
      return this.$store.state.addressList.filter(item => { return item.isDelete === false })
    }
  },
  methods: {
    addAddress () {
      this.$router.push('addAddress')
    },
    editAddress (item) {
      this.$router.push({
        name: 'editAddress',
        params: {
          data: item
        }
      })
    }
  },
  components: {
    topBar
  }
}
</script>

<style lang="stylus">
.address-container
    margin-top 66px
    .text
      text-align center
      font-size 14px
      color #c7c4c4
      margin-top 70px
    .add-address
        position fixed
        top 18px
        right 10px
        font-size 12px
        color #fff
        z-index 1000
    .address-item
        display flex
        align-items center
        font-size 12px
        color #333
        margin-bottom 30px
        .icon-wrap
            flex-basis 12%
            text-align center
            .iconfont
                font-size 30px
                color #fff
                background-color #e4d4b5
                border-radius 50%
            .icon-default
                font-size 16px
                background-color #d6d3d3
                display inline-block
                width 30px
                height 30px
                line-height 30px
                text-align center
        .info-wrap
            flex-basis 76%
            padding 0 8px 0 4px
            box-sizing border-box
            .user-info, .detail
                line-height 15px
            .user-info
                margin-bottom 2px
                .name
                    font-size 14px
                    margin-right 20px
                .tel
                    color #999
            .default, .label
                display inline-block
                padding 1px 5px
                background #f4f4f4
                color #666
            .default
                color #ec7734
                background #fff1ec
                margin-right 6px
        .edit
            display inline-block
            flex-basis 12%
            color #999
            text-align center
            padding 4px 0
            box-sizing border-box
            border-left 1px solid #e5e5e5
</style>
