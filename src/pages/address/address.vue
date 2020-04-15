<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="address-container">
            <div class="add-address" @click="addAddress">添加新地址</div>
            <div class="address-item" v-for="(item, index) in address" :key="index">
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
                            {{item.province + ' ' + item.city + ' ' + item.area + ' ' + item.detail}}
                        </p>
                    </div>
                </div>
                <span class="edit" @click="editAddress">编辑</span>
            </div>
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
      },
      address: [{
        id: 1,
        name: 'liusha',
        tel: '18210587582',
        province: '北京',
        city: '北京市',
        area: '朝阳区',
        detail: '香江北路瑞平家园1号院1号楼1单元2806',
        label: '家',
        isDefault: true,
        isDelete: false
      }, {
        id: 2,
        name: 'sasa',
        tel: '13701141845',
        province: '北京',
        city: '北京市',
        area: '朝阳区',
        detail: '来广营东路朝来科技产业园36号院北京快道网络有限公司',
        label: '公司',
        isDefault: false,
        isDelete: false
      }, {
        id: 3,
        name: 'zxq',
        tel: '13701141845',
        province: '湖南省',
        city: '长沙市',
        area: '芙蓉区',
        detail: '长郡中学',
        label: '学校',
        isDefault: false,
        isDelete: false
      }, {
        id: 4,
        name: '刘莎',
        tel: '18210587582',
        province: '贵州省',
        city: '铜仁市',
        area: '碧江区',
        detail: '江华小区',
        label: '',
        isDefault: false,
        isDelete: false
      }, {
        id: 5,
        name: '张新成',
        tel: '18210587582',
        province: '湖南省',
        city: '长沙市',
        area: '开福区',
        detail: '湘雅路街道',
        label: '',
        isDefault: false,
        isDelete: false
      }]
    }
  },
  methods: {
    addAddress () {
      this.$router.push('/addAddress')
    },
    editAddress () {
      this.$router.push('/editAddress')
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
