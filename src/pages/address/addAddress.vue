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
  components: {
    headBar,
    addressForm
  },
  methods: {
    addAddress (data) {
      console.log(data)
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
