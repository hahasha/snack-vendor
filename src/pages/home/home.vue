<template>
    <div class="home-container">
        <cube-slide :data="slides"></cube-slide>
        <div class="theme-wrap">
            <h2 class="title">精选主题</h2>
            <div class="theme-content">
                <div class="theme-item" v-for="(item, index) in themes" :key="index">
                    <img :src="item.src" alt="">
                </div>
            </div>
        </div>
        <div class="new-product-wrap">
            <h2 class="title">最近新品</h2>
            <div class="product-content">
                <div class="product" v-for="(item, index) in products" :key="index">
                    <img :src="item.src" alt="">
                    <div class="desc">
                        <p class="name-wrap">
                            <span class="name">{{item.desc.name}}</span>
                            <span class="spec">{{item.desc.spec}}</span>
                        </p>
                        <span class="price">¥{{item.desc.price}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      slides: [{
        url: '/',
        image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=179253925,1991244828&fm=26&gp=0.jpg'
      }, {
        url: '/',
        image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1242481022,2205374762&fm=26&gp=0.jpg'
      }, {
        url: '/',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=212927095,691126906&fm=26&gp=0.jpg'
      }, {
        url: '/',
        image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2179136077,2541367481&fm=26&gp=0.jpg'
      }],
      themes: [{
        src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2879600121,3244445369&fm=26&gp=0.jpg'
      }, {
        src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1777725305,2802666167&fm=26&gp=0.jpg'
      }, {
        src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=179253925,1991244828&fm=26&gp=0.jpg'
      }],
      products: [{
        src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2885912154,5422214&fm=26&gp=0.jpg',
        desc: {
          name: '秀色瓜子',
          spec: '100克',
          price: '9.9'
        }
      }, {
        src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2102853231,3067344161&fm=26&gp=0.jpg',
        desc: {
          name: '梨花带雨',
          spec: '3个',
          price: '19.9'
        }
      }, {
        src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2885912154,5422214&fm=26&gp=0.jpg',
        desc: {
          name: '秀色瓜子',
          spec: '100克',
          price: '9.9'
        }
      }, {
        src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2102853231,3067344161&fm=26&gp=0.jpg',
        desc: {
          name: '梨花带雨',
          spec: '3个',
          price: '19.9'
        }
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-container
    margin 46px 0 60px 0
.cube-slide
    height 5.6rem
    >>> .cube-slide-item > a > img
        width 100%
    >>> .cube-slide-dots
        bottom .25rem
    >>> .cube-slide-dots > span
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        margin: 0 .1rem;
        background-color: #a2a1a6;
    >>> .cube-slide-dots > span.active
        background-color #010101
.title
    margin 20px 0
    font-size 16px
    text-align center
    color #ada084
.theme-content
    font-size 0
    .theme-item
        display inline-block
        box-sizing border-box
        width 50%
        height 4.6rem
    .theme-item:nth-of-type(1)
        border-right 2px solid #fff
    .theme-item:nth-of-type(3)
        width 100%
        margin-top: 2px
    .theme-item img
        width 100%
        height 100%
.product-content
    padding 0 8px
    .product
        position relative
        display inline-block
        box-sizing border-box
        width 50%
        margin-bottom 1px
    .product:nth-of-type(2n+1)
        border-right 4px solid #fff
    .product img
        width 100%
        height 4.5rem
        border-radius 4px
    .product .desc
        width 100%
        position absolute
        bottom 10px
        font-size 14px
        text-align center
    .product .desc .name-wrap
        margin-bottom 2px
    .product .desc .name
        margin-right 4px
</style>
