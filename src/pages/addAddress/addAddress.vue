<template>
    <div class="container">
        <topBar :nav="nav"></topBar>
        <div class="adddress-add-container">
            <cube-form :model="model">
                <cube-form-group>
                    <cube-form-item :field="fields[0]"></cube-form-item>
                    <cube-form-item :field="fields[1]"></cube-form-item>
                    <cube-form-item :field="fields[2]">
                        <cube-button @click="showAddressPicker">{{'所在地区'}}</cube-button>
                    </cube-form-item>
                    <cube-form-item :field="fields[3]"></cube-form-item>
                    <cube-form-item :field="fields[4]"></cube-form-item>
                    <cube-form-item :field="fields[5]"></cube-form-item>
                </cube-form-group>
                <cube-form-group>
                    <cube-button type="reset">重置</cube-button>
                    <cube-button type="submit">保存</cube-button>
                </cube-form-group>
            </cube-form>
        </div>
    </div>
</template>

<script>
import { provinceList, cityList, areaList } from '@/assets/js/area.js'
import topBar from '@/components/top-bar/top-bar'

const addressData = provinceList
addressData.forEach(province => {
  province.children = cityList[province.value]
  cityList.forEach(city => {
    city.children = areaList[city.value]
  })
})

export default {
  data () {
    return {
      nav: {
        title: '添加收货地址',
        back: true
      },
      model: {
        name: '',
        telephone: '',
        location: '',
        detail: '',
        label: '',
        isDefault: false
      },
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
          modelKey: 'telephone',
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
          type: 'input',
          modelKey: 'detail',
          props: {
            placeholder: '详细地址：如道路、门牌号、小区、楼栋号、单元室等'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'radio-group',
          modelKey: 'label',
          props: {
            options: ['家', '公司', '学校']
          },
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
    selectHandle (selectedText) {
      console.log(selectedText)
    },
    cancelHandle () {}
  },
  components: {
    topBar
  }
}
</script>

<style lang="stylus" scoped>
.adddress-add-container
    margin-top 46px
</style>
