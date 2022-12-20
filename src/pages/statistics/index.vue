<template>
  <view class="home">
    <view class="test">{{title}}</view>
    <Test></Test>
  </view>
</template>
<script>
import Test from '@/components/test'
export default {
  components: { Test },
  data () {
    return {
      title: '统计'
    }
  },
  async onShow () {
    console.log('<%=pascalCasedName%>')
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
