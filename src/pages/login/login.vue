<template>
  <div class="login-container">
    <cube-form>
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">登录</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      fields: [
        {
          type: 'input',
          rules: {
            required: true
          },
          modalKay: 'inputValue',
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
          modalKay: 'inputValue',
          label: '密码',
          props: {
            placeholder: '请输入密码'
          }
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-container
  padding 20px
</style>
