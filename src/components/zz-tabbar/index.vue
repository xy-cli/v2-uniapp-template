<template>
  <!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
  <!-- vuex_isStudent 学生账号不显示tabbar -->
  <u-tabbar :list="lists"
            :active-color="$variables.mainColor"
            inactive-color="#808b9a"
            height="100"
            bg-color="#f9fafc"
            :border-top="false"/>
</template>

<script>
import tabBar from '@/utils/tabBar'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  computed: {
    lists () {
      const l = this.$u.deepClone(tabBar)
      const m = this.vuex_isStudent ? [l[0], l[2]] : l
      return m.map(item => {
        item.pagePath = `/${item.pagePath}`
        return item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//::v-deep .u-tabbar__content{
//  height:100rpx!important;
//}
::v-deep .u-tabbar__content{
  max-width:1000rpx;
  position: fixed;
  left:50%;
  transform: translate(-50%, 0);
}
</style>
