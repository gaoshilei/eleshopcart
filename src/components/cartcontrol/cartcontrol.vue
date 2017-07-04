<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCount"
         transition="move"></div>
    <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
    <div class="cart-increase icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },

    methods: {
      /* eslint-disable no-unused-vars */
      addCart (event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cart-add', event.target);
      },
      decreaseCount () {
        this.food.count--;
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    .cart-decrease, .cart-increase
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-increase
      display: inline-block
</style>
