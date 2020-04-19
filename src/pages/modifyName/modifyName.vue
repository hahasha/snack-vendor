<template>
  <div class="container">
    <topBar :nav="nav"></topBar>
    <div class="modify-container">
      <cube-form :model="model" @submit.prevent="submitHandler">
        <cube-form-group>
          <cube-form-item :field="field"></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-button type="submit">确认修改</cube-button>
        </cube-form-group>
      </cube-form>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/top-bar/top-bar'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      nav: {
        title: '修改用户名',
        back: true
      },
      model: {
        name: ''
      },
      field: {
        type: 'input',
        modelKey: 'name',
        props: {
          placeholder: '请输入用户名'
        },
        rules: {
          required: true,
          min: 4,
          max: 20
        }
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    submitHandler () {
      this.user.name = this.model.name
      this.updateUser(this.user)
      this.$router.go(-1)
    },
    ...mapMutations([
      'updateUser'
    ])
  },
  components: {
    topBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  .modify-container
    height 100%
    background #f4f4f4
    padding-top 46px
    box-sizing border-box
    .cube-form
      margin 0 14px
    >>>.cube-form-group-legend
      height 20px
    >>>.cube-btn
      font-size 14px
</style>
