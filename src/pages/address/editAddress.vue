<template>
    <div class="container">
        <headBar :nav="nav"></headBar>
        <div class="edit-address-container">
            <addressForm :type="type" :data="addressData" @edit="updateAddress"></addressForm>
        </div>
    </div>
</template>

<script>
import headBar from '@/components/header/header'
import addressForm from '@/components/addressForm/addressForm'
import { updateAddress } from '@/api/api'
export default {
  data () {
    return {
      nav: {
        title: '编辑收货地址',
        back: true
      },
      type: 'edit',
      addressData: this.$route.params.data
    }
  },
  components: {
    headBar,
    addressForm
  },
  methods: {
    updateAddress (data) {
      data.province = data.location[0]
      data.city = data.location[1]
      data.country = data.location[2]
      updateAddress(data).then(res => {
        if (res.errcode === 0) {
          this.$createToast({
            type: 'correct',
            txt: '修改地址成功'
          }).show()
        }
      })
      this.$router.push('address')
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
.edit-address-container
  height calc(100% - 46px)
  background #f4f4f4
  padding-top 46px
  font-size 14px
</style>
