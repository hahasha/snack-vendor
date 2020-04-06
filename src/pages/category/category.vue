<template>
  <div class="category-container">
    <div class="left-panel">
        <cube-scroll>
            <cube-tab-bar v-model="selectedLabel" :data="categories" @change="changeHandler"></cube-tab-bar>
        </cube-scroll>
    </div>
    <div class="right-panel">
        <cube-scroll ref="scroll">
            <div class="head-img-wrap">
                <img :src="category.src" alt="">
            </div>
            <ul class="product-wrap">
                <li class="product" v-for="(item, index) in category.products" :key="index">
                    <div class="img-wrap">
                        <img :src="item.src" alt="">
                    </div>
                    <p class="desc">
                        <span class="name">{{item.name}}</span>
                        <span class="spec">{{item.spec}}</span>
                    </p>
                </li>
            </ul>
        </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedLabel: '果味',
      category: {},
      categories: [{
        label: '果味',
        src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1627503492,4129003238&fm=26&gp=0.jpg',
        products: [{
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3797977393,2684712832&fm=26&gp=0.jpg',
          name: '梨花带雨',
          spec: '3个'
        }, {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1145245586,2546465794&fm=26&gp=0.jpg',
          name: '春生龙眼',
          spec: '500g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=214537324,1753204075&fm=26&gp=0.jpg',
          name: '夏日芒果',
          spec: '3个'
        }, {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3797977393,2684712832&fm=26&gp=0.jpg',
          name: '梨花带雨',
          spec: '3个'
        }, {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1145245586,2546465794&fm=26&gp=0.jpg',
          name: '春生龙眼',
          spec: '500g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=214537324,1753204075&fm=26&gp=0.jpg',
          name: '夏日芒果',
          spec: '3个'
        }, {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3797977393,2684712832&fm=26&gp=0.jpg',
          name: '梨花带雨',
          spec: '3个'
        }, {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1145245586,2546465794&fm=26&gp=0.jpg',
          name: '春生龙眼',
          spec: '500g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=214537324,1753204075&fm=26&gp=0.jpg',
          name: '夏日芒果',
          spec: '3个'
        }, {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3797977393,2684712832&fm=26&gp=0.jpg',
          name: '梨花带雨',
          spec: '3个'
        }, {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1145245586,2546465794&fm=26&gp=0.jpg',
          name: '春生龙眼',
          spec: '500g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=214537324,1753204075&fm=26&gp=0.jpg',
          name: '夏日芒果',
          spec: '3个'
        }, {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3797977393,2684712832&fm=26&gp=0.jpg',
          name: '梨花带雨',
          spec: '3个'
        }, {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1145245586,2546465794&fm=26&gp=0.jpg',
          name: '春生龙眼',
          spec: '500g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=214537324,1753204075&fm=26&gp=0.jpg',
          name: '夏日芒果',
          spec: '3个'
        }, {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3797977393,2684712832&fm=26&gp=0.jpg',
          name: '梨花带雨',
          spec: '3个'
        }, {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1145245586,2546465794&fm=26&gp=0.jpg',
          name: '春生龙眼',
          spec: '500g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=214537324,1753204075&fm=26&gp=0.jpg',
          name: '夏日芒果',
          spec: '3个'
        }]
      }, {
        label: '蔬菜',
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=562313376,2720304216&fm=11&gp=0.jpg',
        products: [{
          src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2481257848,1542323099&fm=26&gp=0.jpg',
          name: '西红柿',
          spec: '3个'
        }, {
          src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2956037402,2418020945&fm=26&gp=0.jpg',
          name: '土豆',
          spec: '500g'
        }, {
          src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1652803613,3944909903&fm=26&gp=0.jpg',
          name: '青椒',
          spec: '300g'
        }]
      }, {
        label: '炒货',
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=562313376,2720304216&fm=11&gp=0.jpg',
        products: [{
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3234145165,2168254717&fm=26&gp=0.jpg',
          name: '瓜子',
          spec: '500g'
        }, {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3234145165,2168254717&fm=26&gp=0.jpg',
          name: '瓜子',
          spec: '500g'
        }, {
          src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3234145165,2168254717&fm=26&gp=0.jpg',
          name: '瓜子',
          spec: '500g'
        }]
      }, {
        label: '点心',
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=562313376,2720304216&fm=11&gp=0.jpg',
        products: [{
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3636890683,2513385364&fm=26&gp=0.jpg',
          name: '蛋挞',
          spec: '3个'
        }, {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3636890683,2513385364&fm=26&gp=0.jpg',
          name: '蛋挞',
          spec: '3个'
        }, {
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3636890683,2513385364&fm=26&gp=0.jpg',
          name: '蛋挞',
          spec: '3个'
        }]
      }, {
        label: '粗茶',
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=562313376,2720304216&fm=11&gp=0.jpg',
        products: [{
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820872614,3768339621&fm=26&gp=0.jpg',
          name: '龙井',
          spec: '5g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820872614,3768339621&fm=26&gp=0.jpg',
          name: '龙井',
          spec: '5g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1820872614,3768339621&fm=26&gp=0.jpg',
          name: '龙井',
          spec: '5g'
        }]
      }, {
        label: '淡饭',
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=562313376,2720304216&fm=11&gp=0.jpg',
        products: [{
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3939440367,1047120324&fm=26&gp=0.jpg',
          name: '绿豆',
          spec: '500g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3939440367,1047120324&fm=26&gp=0.jpg',
          name: '绿豆',
          spec: '500g'
        }, {
          src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3939440367,1047120324&fm=26&gp=0.jpg',
          name: '绿豆',
          spec: '500g'
        }]
      }]
    }
  },
  created () {
    this.categories.forEach((item) => {
      if (item.label === this.selectedLabel) {
        this.category = item
      }
    })
  },
  methods: {
    changeHandler (value) {
      this.categories.forEach((item) => {
        if (item.label === this.selectedLabel) {
          this.category = item
        }
      })
      this.$nextTick(() => {
        this.$refs.scroll.scrollTo(0, 0)
        this.$refs.scroll.refresh()
      })
    }
  },
  watch: {
    selectedLabel (newV) {
      console.log(newV)
    }
  }
}
</script>

<style lang="stylus" scoped>
.category-container
    margin 46px 0 60px 0
    .left-panel
        position absolute
        width 22%
        height 100%
        box-sizing border-box
        top 46px
        left 0
        border-right 1px solid #dddddd
    .cube-tab-bar
        flex-direction column
        justify-content flex-start
        font-size 14px
    >>> .cube-tab
        position relative
        flex none
        width 100%
        padding 18px 0
    >>> .cube-tab_active
        color #ab956c
    >>> .cube-tab_active:after
            content ''
            width 2px
            height 100%
            position absolute
            top 0
            left 0
            background-color #ab956c
    .right-panel
        margin-left 22%
        box-sizing border-box
        padding 20px
    .head-img-wrap
        width 100%
    .head-img-wrap img
        width 100%
        height 100px
        border-radius 2px
    .product
        width 33%
        display inline-block
    .product .img-wrap
        width 100%
        text-align center
    .product img
        width 50%
        height 50px
    .product .desc
        font-size 12px
        text-align center
        margin 8px 0 20px 0
    .product .desc .name
        margin-right 2px
</style>
