<template>
  <div class="container">
    <topBar :nav="nav"></topBar>
    <div class="reset-container">
      <cube-form :model="model" :schema="schema" @submit.prevent="submitHandler" @validate="validateHandler">
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
        title: '重置密码',
        back: true
      },
      model: {
        password: '',
        newPassword: '',
        newPassword2: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            label: '用户名',
            props: {
              placeholder: this.$store.state.currentUser ? this.$store.state.currentUser.name : '',
              readonly: 'readonly'
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '旧密码',
            props: {
              placeholder: '请输入旧密码'
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'newPassword',
            label: '新密码',
            props: {
              placeholder: '请输入新密码'
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            modelKey: 'newPassword2',
            label: '确认新密码',
            props: {
              placeholder: '请再次输入新密码'
            },
            rules: {
              required: true,
              custom: (val) => {
                return val === this.model.newPassword
              }
            },
            messages: {
              custom: '两次输入的密码不一致'
            }
          },
          {
            type: 'submit',
            label: '确认修改'
          }
        ]
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
      this.user.password = this.model.newPassword
      this.updateUser(this.user)
      this.$router.go(-1)
    },
    validateHandler (result) {
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
.reset-container
  padding-top 46px
  height 100%
  background-color #f4f4f4
  box-sizing border-box
  >>>.cube-form-label
    font-size 14px
  >>>.cube-form-label:before
    content ''
    margin 0
  >>>.cube-form-group-legend:first-of-type
    padding 0
  >>>.cube-form-item.cube-form-item_btn
    padding 0
  >>>.cube-form-item_btn
    margin 0
  >>>.cube-btn
    border-top 10px solid #f4f4f4
    font-size 14px
</style>
