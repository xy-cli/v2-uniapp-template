<template>
  <view class="home">
    <view class="test">{{title}}</view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      title: '首页'
    }
  },
  async onShow () {
    console.log('<%=localName%>')
  }
}
</script>
<style lang="scss" scoped>
.home{
  @include wh(100%, 100vh);
  @include flexCenter;
  font-size: 40rpx;
}
</style>
