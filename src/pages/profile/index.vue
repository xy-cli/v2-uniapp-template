<template>
  <view class="profile">
    <scroll-view scroll-y :style="'height:'+vuex_sys.windowHeight+'px'">
      <view class="header">
        <view class="avatar">
          <view class="avatar-img">
            <u-image width="170rpx" height="170rpx" :src="vuex_user.avatar" :fade="false">
              <view slot="loading">{{avatarName}}</view>
              <view slot="error">{{avatarName}}</view>
            </u-image>
          </view>
          {{vuex_user.name || '未知'}}{{vuex_isStudent ? '' : '老师'}}
        </view>
      </view>
      <view class="body">
        <view class="options">
          <navigator :url="item.path"
                     v-for="(item,index) in options"
                     :key="index"
                     hover-class="navigator-hover"
                     :class="{'disabled' : !item.path}"
                     class="options-line">
            {{ item.title }}
            <view class="options-line--content">
              {{item.name || ''}}
              <image class="icon_arrow-right" src="../../static/image/profile/arrow-right.png"></image>
            </view>
          </navigator>
        </view>
        <view class="btn_logout" @click="$u.outLogin">
          退出当前账号
        </view>
      </view>
    </scroll-view>
    <TabBar/>
  </view>
</template>

<script>
import TabBar from '@/components/zz-tabbar'
export default {
  name: 'index',
  components: { TabBar },
  data () {
    return {
      weeklyGroupList: [],
      height: ''
    }
  },
  onShow () {
    this.$setNavTitle('我的')
    uni.getSystemInfo({
      success: res => {
        this.height = res.windowHeight
      }
    })
  },
  computed: {
    avatarName () {
      try {
        const arr = this.vuex_user?.name?.split('')
        return arr.splice(-2, 2).join('') || '未知'
      } catch (e) {
        return '未知'
      }
    },
    options () {
      const campusName = '未选择'
      const list = [
        // 0--管理员权限 1--普通老师权限 2--学生账号a
        { title: '校区', path: '/pages/profile/switchCampus', name: campusName, roleType: [0, 1] },
        { title: '小组管理', path: '/pages/profile/selectGroup/index', roleType: [0] },
        { title: '模板管理', path: '/pages/profile/templateManage/index', roleType: [0] },
        { title: '学生值周账号', path: '/pages/profile/studentManage/index', roleType: [0] },
        { title: '值周小结记录', path: '/pages/profile/weekSummary/index', roleType: [0, 1, 2] },
        { title: '流动红旗管理', path: '/pages/profile/flowRedManage/index', roleType: [0] },
        { title: '流动红旗记录', path: '/pages/profile/flowRedRecord/index', roleType: [0, 1, 2] }
        // { title: '数据大屏', path: '', roleType: [0, 1] }
      ]
      return list.filter(item => item.roleType.includes(Number(this.vuex_user.roleType)))
    }
  }
}
</script>

<style scoped lang="scss">

.icon {
  &_arrow-right {
    @include wh(28rpx, 28rpx);
  }
}
.disabled {
  pointer-events: none;
  opacity: .3;
}
.profile {
  @include wh(100%, auto);
  @include flexCenterCol;
  font-size: 28rpx;
  font-weight: 400;
  color: #081C38;
  position: relative;
  .header {
    @include wh(100%, 510rpx);
    background: url('../../static/image/profile/avatar-bg.png') no-repeat center;
    background-size: 100% 510rpx;
    .avatar {
      @include wh(100%, auto);
      @include flexCenterCol;
      font-size: 36rpx;
      font-weight: 500;
      color: #FFF;
      padding-top: 62rpx;
      &-img {
        @include wh(170rpx, 170rpx);
        @include flexCenter;
        overflow: hidden;
        border-radius: 85rpx;
        margin-bottom: 20rpx;
        font-size: 50rpx;
        border: 8rpx solid rgba($color: #FFF, $alpha: .07);
        color: #FFF;
        background-color: rgba($color: #FFF, $alpha: .07) !important;
      }
    }
  }
  .body {
    @include wh(100%, auto);
    @include flexCenterCol;
    padding:0 36rpx 200rpx;
    position: absolute;
    top: 340rpx;
    .options {
      @include wh(100%, auto);
      background: #FFFFFF;
      box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(8,28,56,0.07);
      border-radius: 24rpx;
      border: 2rpx solid #EFF2F6;
      padding: 10rpx 0;
      &-line{
        @include wh(auto, 100rpx);
        @include flexCenter;
        justify-content: space-between;
        padding:0 38rpx;
        position: relative;
        &:before{
          content: '';
          position: absolute;
          bottom:0;
          left:38rpx;
          right:38rpx;
          border-bottom: 1px solid rgba($color: #081C38, $alpha: .05);

        }
        &:last-child {
          &:before{border:none}
        }
        &--content{
          display: flex;
          align-items: center;
          color: rgba($color: #081C38, $alpha: .3);
          .icon_arrow-right {
            margin-left: 16rpx;
          }
        }
      }
    }
    .btn_logout {
      @include wh(100%, 90rpx);
      @include flexCenter;
      background: #FFFFFF;
      box-shadow: 0 0 16rpx 0 rgba(8,28,56,0.07);
      color: rgba($color: #081C38, $alpha: .3);
      border-radius: 24rpx;
      border: 2rpx solid #EFF2F6;
      margin-top: 20rpx;
    }
  }
}
</style>
