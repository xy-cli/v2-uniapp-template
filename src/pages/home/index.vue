<!--
 * @Author: your name
 * @Date: 2021-11-26 13:45:13
 * @LastEditTime: 2022-08-08 11:06:51
 * @LastEditors: ss shangs@schbrain.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /uni-module/src/pages/index.vue
-->
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
