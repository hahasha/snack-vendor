<template>
  <div class="container">
    <headBar :nav="nav"></headBar>
    <div class="login-container">
      <cube-form :model="model" @submit.prevent="submitHandler">
        <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
          <cube-form-item :field="fields[1]"></cube-form-item>
          <!-- <cube-form-item>
            <cube-input
              v-model="value"
              :placeholder="placeholder"
              :type="type"
              :maxlength="maxlength"
              :readonly="readonly"
              :disabled="disabled"
              :autofocus="autofocus"
              :autocomplete="autocomplete"
              :eye="eye"
            ></cube-input>
          </cube-form-item> -->
        </cube-form-group>
        <cube-form-group>
          <cube-button type="submit" class="btn-login">登录</cube-button>
        </cube-form-group>
      </cube-form>
      <p class="text">温馨提示：未注册过的用户，登录时将自动注册</p>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/api'
import headBar from '@/components/header/header'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      redirectPath: '',
      nav: {
        title: '账号登录',
        back: true
      },
      model: {
        name: '',
        password: ''
      },
      fields: [
        {
          type: 'input',
          rules: {
            required: true
          },
          modelKey: 'name',
          label: '用户名',
          props: {
            placeholder: '请输入用户名'
          }
        },
        {
          type: 'input',
          rules: {
            required: true
          },
          modelKey: 'password',
          label: '密码',
          props: {
            type: 'password',
            placeholder: '请输入密码',
            eye: {
              open: true,
              reverse: false
            }
          }
        }
      ]
    }
  },
  created () {
    this.redirectPath = this.$route.query.redirect
  },
  methods: {
    submitHandler () {
      login({
        username: this.model.name,
        password: this.model.password
      }).then(res => {
        if (res.errcode === 0) {
          this.saveToken(res.token)
          this.saveUserInfo(res.userInfo)
          this.$createToast({
            type: 'correct',
            txt: '登录成功'
          }).show()
          const redirectPath = this.redirectPath ? this.redirectPath : '/'
          this.$router.push(redirectPath) // 登录重定向
        } else if (res.errcode === 60000) {
          this.$createToast({
            type: 'error',
            txt: '密码不正确'
          }).show()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    ...mapMutations({
      saveToken: 'SET_TOKEN',
      saveUserInfo: 'SET_USER_INFO'
    })
  },
  components: {
    headBar
  }
}
</script>

<style lang="stylus" scoped>
.container
  height 100%
  .login-container
    padding-top 46px
    background-color #f4f4f4
    height calc(100% - 46px)
    >>>.cube-form-label
      font-size 14px
    .btn-login
      font-size 14px
      background #ab956c
      color #fff
      border-top 10px solid #f4f4f4
    .text
      font-size 12px
      color #c9c9c5
      text-align center
      margin-top 10px
</style>
