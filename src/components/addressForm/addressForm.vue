<template>
  <cube-form :model="model" @submit.prevent="submitHandler">
      <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
          <cube-form-item :field="fields[1]"></cube-form-item>
          <cube-form-item :field="fields[2]">
              <cube-button @click="showAddressPicker" :class="{'selected' : model.location}">
                <div class="location-wrap" v-if="model.location">
                  <p class="location-item" v-for="(item, index) in model.location" :key="index">
                    {{item}}
                  </p>
                </div>
                <span v-else>所在地区</span>
                <span class="cubeic-arrow"></span>
              </cube-button>
          </cube-form-item>
          <cube-form-item :field="fields[3]"></cube-form-item>
          <cube-form-item :field="fields[4]">
            <div class="label-wrap">
              <span class="label"
                v-for="(item, index) in labels"
                :class="{'active' : model.label === item.text }"
                :key="index"
                @click="selectLabel(item)
              ">
                {{item.text}}
              </span>
            </div>
          </cube-form-item>
          <cube-form-item :field="fields[5]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
          <cube-button class="btn" type="submit">保存</cube-button>
          <cube-button class="btn btn-delete" v-show="this.operate.type === 'edit'" @click="deleteHandler">删除收货地址</cube-button>
      </cube-form-group>
  </cube-form>
</template>

<script>
import { provinceList, cityList, areaList } from '@/assets/js/area.js'
import { mapMutations } from 'vuex'
const addressData = provinceList
addressData.forEach(province => {
  province.children = cityList[province.value]
  province.children.forEach(city => {
    city.children = areaList[city.value]
  })
})
const EVENT_ADD = 'add'
const EVENT_EDIT = 'edit'

export default {
  name: 'addressForm',
  data () {
    return {
      model: {
        name: '',
        tel: '',
        location: '',
        detail: '',
        label: '',
        isDefault: false
      },
      labels: [
        {
          value: 'home',
          text: '家'
        },
        {
          value: 'company',
          text: '公司'
        },
        {
          value: 'school',
          text: '学校'
        }
      ],
      fields: [
        {
          type: 'input',
          modelKey: 'name',
          props: {
            placeholder: '收货人'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'tel',
          props: {
            placeholder: '手机号码'
          },
          rules: {
            required: true
          }
        },
        {
          modelKey: 'location',
          rules: {
            required: true
          }
        },
        {
          type: 'textarea',
          modelKey: 'detail',
          props: {
            placeholder: '详细地址：如道路、门牌号、小区、楼栋号、单元室等'
          },
          rules: {
            required: true
          }
        },
        {
          modelKey: 'label',
          label: '地址标签'
        },
        {
          type: 'switch',
          modelKey: 'isDefault',
          label: '设为默认地址'
        }
      ]
    }
  },
  props: {
    operate: {
      type: Object,
      default: function () {
        return null
      }
    }
  },
  created () {
    if (this.operate.type === EVENT_EDIT && this.operate.data) {
      const { id, isDelete } = this.operate.data
      this.model = this.operate.data
      this.model.id = id
      this.model.isDelete = isDelete
    }
  },
  mounted () {
    this.addressPicker = this.$createCascadePicker({
      title: '请选择',
      data: addressData,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle
    })
  },
  methods: {
    showAddressPicker () {
      this.addressPicker.show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      this.model.location = selectedText
    },
    cancelHandle () {},
    selectLabel (item) {
      const label = item.value
      this.model.label = label
        ? label === 'home'
          ? '家'
          : label === 'company'
            ? '公司'
            : label === 'school'
              ? '学校'
              : ''
        : ''
    },
    submitHandler () {
      if (this.operate.type === EVENT_ADD) {
        this.addAddress(this.model)
        this.$router.push('address')
      }
      if (this.operate.type === EVENT_EDIT) {
        this.updateAddress(this.model)
        this.$router.push('address')
      }
    },
    deleteHandler () {
      this.model.isDelete = true
      this.updateAddress(this.model)
      this.$router.push('address')
    },
    ...mapMutations([
      'addAddress',
      'updateAddress'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.cube-form
  font-size 14px
  >>>.cube-textarea
    font-family 'Microsoft YaHei'
  >>>.cube-btn
    background #fff
    color #d5d5d5
    font-size 14px
    padding-left 0
    padding-right 0
    display flex
    align-items center
    justify-content space-between
  .cube-btn.selected
    color #666
  .cubeic-arrow
    font-size 12px
  .location-item
    margin-bottom 8px
    text-align left
  .location-item:last-of-type
    margin-bottom 0
  >>>.cube-form_standard .cube-form-label
    font-size 14px
    color #666
  .label-wrap
    text-align right
    .label
      display inline-block
      width 50px
      height 26px
      line-height 26px
      border 1px solid #e0e0e0
      border-radius 16px
      text-align center
      color #999
      margin-left 10px
      font-size 12px
    .label.active
      background #d1bf9d
      color #fff
  >>>.cube-switch .cube-switch-ui
    height 24px
  >>>.cube-switch
    float right
  >>>.cube-switch .cube-switch-ui::before, .cube-switch .cube-switch-ui::after
    background-color #e5e5e5
  >>>.cube-switch .cube-switch-input:checked + .cube-switch-ui
    border-color #d1bf9d
    background-color #d1bf9d
  .btn
    justify-content center
    background-color #fff
    color #666
    border-bottom 1px solid #eee
  .btn:first-of-type
    border-top 10px solid #f4f4f4
  .btn.btn-delete
    color #f41d1d
</style>
