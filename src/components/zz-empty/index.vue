<template>
  <view class="empty" :style="{height: height + 'px'}">
    <image class="empty-img" src="../../static/image/home/privilege-bak.png"></image>
    <text class="empty-text" v-html="text"/>
    <slot/>
  </view>
</template>

<script>
export default {
  name: 'index',
  props: {
    height: {
      type: Number,
      default: 500
    },
    text: {
      type: String,
      default: '数据为空'
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

.empty{
  @include flexCenter;
  flex-direction: column;
  &-img{
    @include wh(382rpx, 290rpx);
  }
  &-text{
    color: rgba(8, 28, 56, .44);
    font-size: 28rpx;
    margin-top:50rpx;
    text-align: center;
  }
}
</style>
