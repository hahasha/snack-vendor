<template>
  <div class="container">
    <topBar :nav="nav"></topBar>
    <div class="login-container">
      <cube-form :model="model" @submit.prevent="submitHandler">
        <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
          <cube-form-item :field="fields[1]"></cube-form-item>
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
import { loginOrRegister } from '@/api/api'
import topBar from '@/components/top-bar/top-bar'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
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
            placeholder: '请输入密码'
          }
        }
      ]
    }
  },
  computed: {
    userList () {
      return this.$store.state.userList
    }
  },
  methods: {
    submitHandler () {
      // const index = this.userList.findIndex(item => { return item.name === this.model.name })
      // if (index !== -1) {
      //   // 如果当前用户存在,再判断密码是否正确
      //   if (this.userList[index].password === this.model.password) {
      //     this.switchAccount(this.userList[index])
      //     this.$router.go(-1)
      //   } else {
      //     this.$createDialog({
      //       type: 'alert',
      //       content: '密码错误',
      //       icon: 'cubeic-alert'
      //     }).show()
      //   }
      // } else {
      //   this.addUser(this.model)
      //   this.switchAccount(this.userList[this.userList.length - 1])
      //   this.$router.go(-1)
      // }
      var userParam = {
        username: this.model.name,
        password: this.model.password
      }
      console.log(userParam)
      loginOrRegister(userParam).then((res) => {
        console.log(res)
        if (res.code !== 0) {
          this.$createDialog({
            type: 'alert',
            content: '密码错误',
            icon: 'cubeic-alert'
          }).show()
        } else {
          this.switchAccount(res.data.userdata)
          this.$router.go(-1)
        }
      })
    },
    ...mapMutations([
      'addUser',
      'switchAccount'
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
  .login-container
    margin-top 46px
    background-color #f4f4f4
    height 100%
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
