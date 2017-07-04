<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ 'hightlight': totalCount>0}">
            <i class="icon-shopping_cart" :class="{ 'hightlight': totalCount>0}"></i>
          </div>
          <div class="badge" v-show="totalCount>0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{ 'hightlight': totalPrice>0}">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
        <div v-for="ball in balls" :key="ball.id" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    data () {
      return {
        balls: [
          {
            show: false,
            id: 1
          },
          {
            show: false,
            id: 2
          },
          {
            show: false,
            id: 3
          },
          {
            show: false,
            id: 4
          },
          {
            show: false,
            id: 5
          },
          {
            show: false,
            id: 6
          }
        ],
        dropBalls: []
      };
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let totalCount = 0;
        this.selectFoods.forEach((food) => {
          totalCount += food.count;
        });
        return totalCount;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    },
    methods: {
      drop (target) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            Vue.set(ball, 'element', target);
            Vue.set(ball, 'show', true);
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.element.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
            console.log('beforeEnter');
          }
        }
      },
      enter (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        done();
        console.log('enter');
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.dispaly = 'none';
        }
        console.log('afterEnter');
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.hightlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
              &.hightlight
                color: #fff
          .badge
            position: absolute
            top: 0px
            right: 0px
            width: 24px
            height: 16px
            line-height: 16px
            border-radius: 16px
            text-align: center
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          box-sizing: border-box
          &.hightlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
          &.not-enough
            background: #2b333b
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-enter-to
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.4s linear
</style>
