<!--
 * @Author: your name
 * @Date: 2021-11-30 10:14:41
 * @LastEditTime: 2021-12-01 09:24:00
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 * @FilePath: /dingtalk-homeVisiting/src/pages/login/index.vue
-->
<template>
  <view class="login">
    <StudentLogin v-if="vuex_isStudent"/>
    <Login v-else/>
  </view>
</template>

<script>
import Login from './components/login'
import StudentLogin from './components/studentLogin'
export default {
  name: 'index',
  components: { Login, StudentLogin },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.login {
  @include flexCenter;
  @include wh(100%, 100%);
  position: relative;
  &--btn {
    @include wh(632rpx, 614rpx);
    position: fixed;
    top:50%;
    left:50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    &__img{
      @include wh(100%, 100%);
    }
    &__text{
      @include wh(100%, auto);
      @include flexCenter;
      position: absolute;
      top:330rpx;
      left:-10rpx;
      right:0;
      font-size: 32rpx;
      color:#fff;
    }
  }
  &--bg{
    @include fixed(bottom, 0);
    @include wh(1000rpx, 302rpx);
    left:50%;
    margin-left:-500rpx;
  }
}
</style>
