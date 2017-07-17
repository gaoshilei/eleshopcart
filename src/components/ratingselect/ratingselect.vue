<template>
  <div class="ratingselect">
    <div class="typeselect border-1px">
      <span @click="selectType(2)" class="block positive" :class="{'active':selectedType===2}">
        {{ desc.all }}
        <span class="count">{{ ratings.length }}</span>
      </span>
      <span @click="selectType(0)" class="block positive" :class="{'active':selectedType===0}">
        {{ desc.positive }}
        <span class="count">{{ positives.length }}</span>
      </span>
      <span @click="selectType(1)" class="block negative" :class="{'active':selectedType===1}">
        {{ desc.negative }}
        <span class="count">{{ negatives.length }}</span>
      </span>
    </div>
    <div @click="toggleRatings" class="switch">
      <span class="icon-check_circle" :class="{'active':contentOnly}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">

//  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;

  export default {
    data () {
      return {};
    },
    props: {
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '好评',
            negative: '差评'
          };
        }
      },
      ratings: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    methods: {
      selectType (type) {
        this.selectedType = type;
        this.$emit('select-type', type);
      },
      toggleRatings () {
        this.contentOnly = !this.contentOnly;
        this.$emit('select-contentOnly');
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      },
      contentOnly () {
        return this.$parent.contentOnly;
      },
      selectedType () {
        return this.$parent.selectedType;
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .ratingselect
    .typeselect
      padding: 18px 0
      margin-left: 18px
      font-size: 0 //inline-block 不这么设置会有多余的空隙
      border-1px(rgba(7, 17, 27, 0.1))
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      box-sizing: border-box
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      line-height: 24px
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        line-height: 24px
        font-size: 24px
        &.active
          color: #00c850
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>

