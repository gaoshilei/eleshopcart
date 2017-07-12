<template>
  <div class="foodWrapper">
    <transition name="move">
      <div class="food" v-show="showDetail" ref="foodDetail">
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
            <div class="shopcartWrapper">
              <cartcontrol :food="food" v-show="food.count>0"></cartcontrol>
            </div>
            <div @click="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </div>
          <split v-show="food.info"></split>
          <div class="infoWrapper" v-show="food.info">
            <h1 class="title">{{ food.name }}</h1>
            <p class="info">{{ food.info }}</p>
          </div>
          <split></split>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import split from '../../components/split/split.vue';

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
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodDetail, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide () {
        this.showDetail = false;
      },
      addFirst () {
        Vue.set(this.food, 'count', 1);
      }
    },
    components: {
      cartcontrol,
      split
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
      position: relative
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
          font-size: 14px
          color: rgb(240, 20, 20)
        .oldPrice
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .shopcartWrapper, .buy
        position: absolute
        right: 18px
      .shopcartWrapper
        bottom: 12px
      .buy
        height: 24px
        bottom: 18px
        padding: 0 12px
        line-height: 24px
        font-size: 10px
        box-sizing: border-box
        border-radius: 12px
        color: #fff
        background: rgb(0, 160, 220)
    .infoWrapper
      padding: 18px
      .title
        margin-bottom: 6px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .info
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        font-weight: 200
        color: rgb(77, 85, 93)
</style>
