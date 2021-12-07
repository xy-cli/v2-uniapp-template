<!--
 * @Author: your name
 * @Date: 2021-11-26 13:45:13
 * @LastEditTime: 2021-11-26 13:48:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /uni-module/src/pages/index.vue
-->
<template>
  <view class="home">
    <template v-if="false">
      <view>业务代码</view>
    </template>
    <!-- 无小组 -->
    <template v-else>
      <zz-empty v-if="Number(vuex_user.roleType) === 0"
                :height="vuex_sys.windowHeight"
                text="当前无小组">
        <view class="addGroup" @click="addGroup">
          <image src="../../static/image/home/addGroup.png"></image>
          <text>添加小组</text>
        </view>
      </zz-empty>
      <zz-empty v-else text="您的账号没有班级权限<br>请与管理员核实相关信息"/>
    </template>
    <TabBar/>
  </view>
</template>
<script>
import TabBar from '@/components/zz-tabbar';
export default {
  components: { TabBar },
  data() {
    return {
      title: 'hello uni-app'
    }
  },
  methods: {
    addGroup() {
      console.log('添加小组')
    },
  }
}
</script>
<style lang="scss" scoped>
.home{
  .addGroup{
    @include wh(460rpx, 90rpx);
    background: $uni-color;
    border-radius: 53rpx;
    @include flexCenter;
    font-size: 32rpx;
    color:#FFFFFF;
    margin-top:72rpx;
    image{
      @include wh(28rpx,28rpx);
      margin-right:10rpx;
    }
  }
}
</style>
