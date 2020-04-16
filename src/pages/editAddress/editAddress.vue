<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="edit-address-container">
            <addressForm :operate="operate"></addressForm>
        </div>
    </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import addressForm from '@/components/addressForm/addressForm'
export default {
  data () {
    return {
      nav: {
        title: '编辑收货地址',
        back: true
      },
      operate: {
        type: 'edit',
        data: this.$route.params.data
      }
    }
  },
  components: {
    topBar,
    addressForm
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
.edit-address-container
  height 100%
  background #f4f4f4
  margin-top 46px
  font-size 14px
</style>
