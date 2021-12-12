<template>
  <view class="noAccess">
    <!-- 无权限 -->
    <image src="../../static/image/home/privilege-bak.png"></image>
    <text class="h2">很抱歉，您暂时无法使用成绩管理</text>
    <text>您可以在钉钉工作台中，找到“家校通迅录”<br> 按提示配置班级信息。</text>
  </view>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

.noAccess{
  @include wh(100vw, 100vh);
  @include flexCenter;
  flex-direction: column;
  image{
    @include wh(340rpx,300rpx);
    margin-bottom:48rpx;
  }
  text{
    font-size: 28rpx;
    color: #8C939D;
    line-height: 50rpx;
    text-align: center;
    &.h2{
      font-size: 30rpx;
      color: #081C38;
      line-height: 48rpx;
      margin-bottom: 16rpx;
    }
  }
}
</style>
