<!--
 * @Author: your name
 * @Date: 2021-11-26 13:45:13
 * @LastEditTime: 2021-11-26 13:48:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /uni-module/src/pages/index.vue
-->
<template>
  <view class="home" :style="{height: vuex_sys.windowHeight+'px'}">
    <view>{{title}}</view>
    <TabBar/>
  </view>
</template>
<script>
import TabBar from '@/components/zz-tabbar'
export default {
  components: { TabBar },
  data () {
    return {
      title: '每日一练'
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  @include flexCenter;
}
</style>
