<template>
    <div class="container">
        <headBar :nav="nav"></headBar>
        <div class="add-adddress-container">
          <addressForm :type="type" :data="addressData" @add="addAddress"></addressForm>
        </div>
    </div>
</template>

<script>
import headBar from '@/components/header/header'
import addressForm from '@/components/addressForm/addressForm'
import { mapGetters } from 'vuex'
import { addAddress } from '@/api/api'
export default {
  data () {
    return {
      nav: {
        title: '添加收货地址',
        back: true
      },
      type: 'add',
      addressData: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  components: {
    headBar,
    addressForm
  },
  methods: {
    addAddress (data) {
      data.province = data.location[0]
      data.city = data.location[1]
      data.country = data.location[2]
      data.user_id = this.userInfo.id
      addAddress(data).then(res => {
        if (res.errcode === 0) {
          this.$createToast({
            type: 'correct',
            txt: '添加地址成功'
          }).show()
          this.$router.push('address')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
.add-adddress-container
  height calc(100% - 46px)
  background #f4f4f4
  padding-top 46px
  font-size 14px
</style>
