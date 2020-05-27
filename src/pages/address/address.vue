<template>
    <div class="container">
        <headBar :nav="nav"></headBar>
        <div class="address-container" v-if="addressList.length > 0">
          <div class="add-address" @click="addAddress">添加新地址</div>
          <cube-scroll>
            <cube-swipe>
              <transition-group class="swipe-wrap" name="swipe" tag="ul">
                <li class="swipe-item" v-for="(item, index) in addressList" :key="item.id">
                  <cube-swipe-item
                    ref="swipeItem"
                    :index="index"
                    :btns="btns"
                    @btn-click="onBtnClick">
                    <div class="address-item" @click="onItemClick(item, index)">
                      <div class="icon-wrap">
                          <span class="iconfont icon-address-home" v-if="item.label==='家'"></span>
                          <span class="iconfont icon-address-company2" v-else-if="item.label==='公司'"></span>
                          <span class="iconfont icon-address-school" v-else-if="item.label==='学校'"></span>
                          <span class="iconfont icon-default" v-else>{{item.name.slice(-1)}}</span>
                      </div>
                      <div class="info-wrap">
                          <p class="user-info">
                              <span class="name">{{item.name}}</span>
                              <span class="tel">{{item.mobile}}</span>
                          </p>
                          <div class="address-wrap">
                              <p class="detail">
                                  <span class="default" v-show="item.isDefault">默认</span>
                                  <span class="label" v-show="item.label">{{item.label}}</span>
                                  {{item | toFullAddress}}
                              </p>
                          </div>
                      </div>
                    </div>
                  </cube-swipe-item>
                </li>
              </transition-group>
            </cube-swipe>
          </cube-scroll>
        </div>
        <div class="address-container" v-else>
          <div class="add-address" @click="addAddress">添加新地址</div>
          <p class="add-text">请添加收货地址</p>
        </div>
    </div>
</template>

<script>
import headBar from '@/components/header/header'
import { getAddress, deleteAddress } from '@/api/api'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      nav: {
        title: '我的收货地址',
        back: true
      },
      btns: [
        {
          action: 'edit',
          text: '编辑',
          color: '#c8c7cd'
        },
        {
          action: 'delete',
          text: '删除',
          color: '#d41f13'
        }
      ],
      addressList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  filters: {
    toFullAddress (item) {
      if (!item) return ''
      return item.location.join(' ') + item.detail
    }
  },
  created () {
    this.getAddress()
  },
  methods: {
    onItemClick (item, index) { // 确认订单时选择地址
      const params = this.$route.params
      if (params.name) {
        this.$router.push({
          name: params.name,
          params: {
            address: item
          }
        })
      }
    },
    onBtnClick (btn, index) {
      if (btn.action === 'edit') {
        this.$router.push({
          name: 'editAddress',
          params: {
            data: this.addressList[index]
          }
        })
      }
      if (btn.action === 'delete') {
        this.$createDialog({
          type: 'confirm',
          icon: 'cubeic-alert',
          content: '确认要删除吗?',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false
          },
          onConfirm: () => {
            deleteAddress({
              id: this.addressList[index].id
            }).then(res => {
              if (res.errcode === 0) {
                this.$createToast({
                  type: 'correct',
                  txt: '删除成功'
                }).show()
                this.getAddress()
              }
            })
          },
          onCancel: () => {
            this.$refs.swipeItem[index].shrink() // 收缩滑块
          }
        }).show()
      }
    },
    addAddress () {
      this.$router.push('addAddress')
    },
    getAddress () {
      getAddress({
        id: this.userInfo.id
      }).then(res => {
        if (res.errcode === 0) {
          const addressList = res.addresses
          if (addressList.length > 0) {
            addressList.forEach(item => {
              item.location = []
              item.location.push(item.province, item.city, item.country)
              item.isDefault = !!item.is_default // 转成Boolen类型
            })
          }
          this.addressList = addressList
        }
      })
    }
  },
  components: {
    headBar
  }
}
</script>

<style lang="stylus">
.container
  height 100%
.address-container
  height calc(100% - 46px)
  padding-top 46px
  .add-text
    text-align center
    font-size 14px
    color #c7c4c4
    padding-top 20px
  .cube-swipe-btn
    text-align center
  .cube-swipe-btn .text
    font-size 14px
  .swipe-wrap
    padding-top 20px
  .swipe-item
    height 51.6px
    margin-bottom 15px
  .cube-swipe-item
    height 51.6px
    display flex
  .add-address
      position fixed
      top 18px
      right 10px
      font-size 12px
      color #fff
      z-index 1000
  .address-item
    flex 1
    display flex
    align-items center
    font-size 12px
    color #333
    .icon-wrap
        flex-basis 12%
        text-align center
        .iconfont
            font-size 28px
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
        flex 1
        padding 0 8px 0 4px
        box-sizing border-box
        .detail
          line-height 16px
        .user-info
          margin-bottom 4px
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
</style>
