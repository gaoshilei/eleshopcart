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
              <cartcontrol
                :food="food"
                v-show="food.count>0"
              ></cartcontrol>
            </div>
            <div
              class="buy"
              v-show="!food.count || food.count===0"
              @click="addFirst"
            >加入购物车
            </div>
          </div>
          <split v-show="food.info"></split>
          <div class="infoWrapper" v-show="food.info">
            <h1 class="title">{{ food.name }}</h1>
            <p class="info">{{ food.info }}</p>
          </div>
          <split></split>
          <div class="ratingsWrapper">
            <h1 class="title">商品评价</h1>
            <ratingselect
              :ratings="food.ratings"
              :contentOnly="contentOnly"
              :selectedType="selectedType"
              :desc="desc"
              @select-type='selectType'
              @select-contentOnly='selectContentOnly'
            ></ratingselect>
            <div class="ratingsContent">
              <ul>
                <li
                  v-for="rating in food.ratings"
                  class="ratingItem border-1px"
                  v-show="ratingShow(rating)"
                >
                  <div class="user">
                    <div class="name">{{ rating.username }}</div>
                    <img class="avatar" :src="rating.avatar" width="12px" height="12px">
                  </div>
                  <div class="rateTime">{{ rating.rateTime }}</div>
                  <div :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></div>
                  <div class="text">{{ rating.text }}</div>
                </li>
              </ul>
            </div>
          </div>
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
  import ratingselect from '../../components/ratingselect/ratingselect.vue';

  const ALL = 2;

  export default {
    data () {
      return {
        showDetail: false,
        contentOnly: false,
        selectedType: ALL,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
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
      },
      ratingShow (rating) {
        if (this.contentOnly && !rating.text) {
          return false;
        }
        if (this.selectedType === ALL) {
          return true;
        } else {
          return rating.rateType === this.selectedType;
        }
      },
      selectType (type) {
        this.selectedType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      selectContentOnly () {
        this.contentOnly = !this.contentOnly;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

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
    .ratingsWrapper
      .title
        padding: 18px 0 0 18px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .ratingsContent
        padding: 0 18px
        .ratingItem
          padding: 16px 0
          font-size: 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            top: 16px
            right: 0
            font-size: 0
            .name
              margin-right: 6px
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              display: inline-block
              border-radius: 50%
          .rateTime
            margin-bottom: 6px
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
          .icon-thumb_up, .icon-thumb_down
            display: inline-block
            margin-right: 4px
            font-size: 12px
            line-height: 24px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .icon-thumb_down
            color: rgb(147, 153, 159)
          .text
            display: inline-block
            font-size: 12px
            line-height: 16px
            color: rgb(7, 17, 27)
</style>
