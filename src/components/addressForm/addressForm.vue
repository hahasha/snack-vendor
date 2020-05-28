<template>
  <cube-form :model="model" @submit.prevent="saveHandler">
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
      </cube-form-group>
  </cube-form>
</template>

<script>
import { provinceList, cityList, areaList } from '@/assets/js/area.js'
import { isEmpty } from '@/assets/js/util'
const addressData = provinceList
addressData.forEach(province => { // 处理AddressPicker数据
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
      validity: {},
      valid: undefined,
      model: {
        name: '',
        mobile: '',
        location: '',
        detail: '',
        label: '',
        is_default: false
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
          modelKey: 'mobile',
          props: {
            placeholder: '手机号码'
          },
          rules: {
            required: true,
            type: 'tel'
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
          modelKey: 'is_default',
          label: '设为默认地址'
        }
      ]
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created () {
    if (this.type === 'edit' && !isEmpty(this.data)) {
      this.model = this.data
    }
  },
  mounted () {
    // 初始化城市联动选择框
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
    saveHandler () {
      if (this.type === EVENT_ADD) {
        this.$emit(EVENT_ADD, this.model)
      }
      if (this.type === EVENT_EDIT) {
        this.$emit(EVENT_EDIT, this.model)
      }
    }
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
