<template>
  <div class="container">
    <headBar :nav="nav"></headBar>
    <div class="reset-container" v-if="userInfo">
      <cube-form :model="model" @submit.prevent="submitHandler">
        <cube-form-group>
          <cube-form-item :field="usernameFiled">
            <cube-input :placeholder="userInfo.username" :disabled="true"></cube-input>
          </cube-form-item>
        </cube-form-group>
         <cube-form-group :fields="fields">
         </cube-form-group>
      </cube-form>
    </div>
  </div>
</template>

<script>
import headBar from '@/components/header/header'
import { resetPassword } from '@/api/api'
import { mapGetters } from 'vuex'
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
      usernameFiled: {
        type: 'input',
        label: '用户名'
      },
      fields: [
        {
          type: 'input',
          modelKey: 'password',
          label: '旧密码',
          props: {
            type: 'password',
            placeholder: '请输入密码'
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
            type: 'password',
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
            type: 'password',
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
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    submitHandler () {
      resetPassword({
        id: this.userInfo.id,
        password: this.model.password,
        newPassword: this.model.newPassword
      }).then(res => {
        if (res.errcode === 0) {
          this.$createToast({
            type: 'correct',
            txt: '密码重置成功'
          }).show()
          this.$router.go(-1)
        } else {
          this.$createToast({
            type: 'error',
            txt: '密码不正确'
          }).show()
        }
      })
    }
  },
  components: {
    headBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
.reset-container
  padding-top 46px
  height calc(100% - 46px)
  background-color #f4f4f4
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
    background #ab956c
</style>
