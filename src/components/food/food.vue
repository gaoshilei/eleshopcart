<template>
  <div class="foodWrapper">
    <transition name="move">
      <div class="food" v-show="showDetail">
        <div class="foodContent">
          <div class="header">
            <img :src="food.image"/>
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <div class="title">{{ food.name }}</div>
            <div class="detail">
              <span class="sellCount">月售{{ food.sellCount }}份</span>
              <span class="rating">好评率{{ food.rating}}%</span>
            </div>
            <div class="price">
              <span class="currentPrice">￥{{ food.price }}</span>
              <span v-show="food.oldPrice" class="oldPrice">￥{{ food.oldPrice }}</span>
            </div>

          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        showDetail: false
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showDetail = true;
      },
      hide () {
        this.showDetail = false;
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    width: 100%
    z-index: 1
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.35s
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      width: 100%
      height: 0
      padding-top 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 12px
          font-size: 20px
          color: #fff
    .content
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sellCount, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sellCount
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .currentPrice
          margin: 0 8px 18px 0
          font-size: 14px
          color: rgb(240, 20, 20)
        .oldPrice
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)

</style>
