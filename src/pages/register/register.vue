<template>
  <div class="register-container">
    <cube-form>
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
        <cube-form-item :field="fields[2]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">用户注册</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      fields: [
        {
          type: 'input',
          rules: {
            required: true
          },
          modelKey: 'inputValue',
          label: '姓名',
          props: {
            placeholder: '请输入姓名'
          }
        },
        {
          type: 'input',
          rules: {
            required: true
          },
          modelKey: 'inputValue',
          label: '密码',
          props: {
            placeholder: '请输入密码'
          }
        },
        {
          type: 'input',
          rules: {
            required: true
          },
          modelKey: 'inputValue',
          label: '确认密码',
          props: {
            placeholder: '请再次确认密码'
          }
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.register-container
  padding 20px
</style>
