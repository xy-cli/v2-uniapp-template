<template>
  <u-popup :value.sync="visible"
           :mode="mode"
           :mask-close-able="maskCloseAble"
           :border-radius="borderRadius"
           @close="close">
    <view class="header">
      <text class="header-cancel" @click="close">取消</text>
      <text class="header-title elp">{{title}}</text>
      <text class="header-confirm" @click="confirm">确定</text>
    </view>
   <slot/>
  </u-popup>
</template>

<script>
export default {
  name: 'index',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '学生账号'
    },
    mode: {
      type: String,
      default: 'bottom'
    },
    borderRadius: {
      type: [String, Number],
      default: '28'
    },
    maskCloseAble: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    confirm () {
      this.$u.debounce(() => {
        this.$emit('confirm')
      }, 500, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  @include wh(100%, 100rpx);
  @include flexCenter;
  justify-content: space-between;
  line-height: 100rpx;
  &-title{
    flex: 1;
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
    color: #081C38;
  }
  &-cancel,
  &-confirm{
    height:100%;
    padding:0 36rpx;
    font-size: 28rpx;
    color: #8C939D;
  }
  &-confirm{
    color:$uni-color;
  }
}
</style>
