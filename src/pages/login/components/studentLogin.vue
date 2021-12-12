<template>
  <view class="bindTel">
    <view class="bindTel_blank">
      <view class="boxshadow phoneNumber">
        <u-input
            v-model="accountName"
            type="text"
            v-emoji="'isNumAlpha'"
            :border="false"
            :clearable="false"
            :maxlength="15"
            placeholder="请输入学生账号"/>
      </view>
      <view class="tip">学校值周学生账号</view>
      <view class="codeArea">
        <view class="boxshadow codeNumber">
          <u-input
              v-model="accountPwd"
              type="password"
              v-emoji="'isNumAlpha'"
              :border="false"
              :clearable="false"
              :maxlength="8"
              placeholder="请输入密码"/>
        </view>
<!--        <view @click="$u.debounce(getCode, 600, true)" class="boxshadow code_btn">-->
<!--          <view v-show="!sendWait">-->
<!--            获取验证码-->
<!--          </view>-->
<!--          <view v-show="sendWait" class="code_btn-text_wait">-->
<!--            &lt;!&ndash; <u-count-down ref="uCountDown" :timestamp="timestamp" :autoplay="false" :show-minutes="false" :show-hours="false" @change="counting" @end="countEnd"></u-count-down> &ndash;&gt;-->
<!--            &lt;!&ndash; 秒后重发 &ndash;&gt;-->
<!--            {{tips}}-->
<!--            <u-verification-code-->
<!--                :seconds="seconds"-->
<!--                :keep-running="true"-->
<!--                @end="end"-->
<!--                @start="start"-->
<!--                ref="uCode"-->
<!--                @change="codeChange"-->
<!--                end-text="获取验证码"-->
<!--                change-text="X秒重发"></u-verification-code>-->
<!--          </view>-->
<!--        </view>-->
      </view>
      <view class="confirm_btn" :class="{disabled: !accountName.length || !accountPwd.length}" @click="$u.debounce(studentLogin, 2000, true)">
        <text>登录学生账号</text>
      </view>
    </view>
  </view>
</template>

<script>
import Ras from '@/utils/rasKey'
export default {
  data () {
    return {
      accountName: '',
      accountPwd: ''
    }
  },
  methods: {
    /**
     * 学生账号登录
     */
    async studentLogin () {
      if (this.accountPwd.length < 5) {
        this.$toast.none('密码不能少于5位')
      } else {
        const { data } = await this.$u.api.getStudentInfo({
          accountName: this.accountName,
          accountPwd: Ras.encrypted(this.accountPwd)
        })
        this.$u.vuex('vuex_user', Object.assign({}, {
          roleType: 2 // 学生账号，默认给3
        }, data))
        uni.switchTab({
          url: '/pages/home/index'
        })
      }
    }
  },
  mounted () {
    if (this.vuex_user.token) { // 登录页打开，判断有无token
      uni.switchTab({
        url: '/pages/home/index'
      })
    }
    if (process.env.VUE_APP_ENV === 'dev') {
      this.accountName = 'qzxq24588'
      this.accountPwd = '12234'
    }
  }
}
</script>

<style scoped lang="scss">

.disabled {
  pointer-events: none;
  cursor: default;
  opacity: .3;
}
.boxshadow {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(8,28,56,0.07);
  border-radius: 20rpx;
  border: 2rpx solid #EFF2F6;
}
.bindTel {
  display: flex;
  justify-content: center;
  &_blank {
    @include wh(622rpx, 96rpx);
    .phoneNumber {
      @include wh(622rpx, 96rpx);
      @include flexCenter;
      padding: 0 20rpx 0 40rpx;
      margin: 30rpx 0 14rpx;
    }
    .tip {
      display: flex;
      align-items: center;
      padding-left: 40rpx;
      font-size: 26rpx;
      font-weight: 400;
      color: #081C38;
      opacity: .3;
    }
    .codeArea {
      display: flex;
      justify-content: space-between;
      margin: 42rpx 0 48rpx;
      .codeNumber {
        @include wh(622rpx, 96rpx);
        @include flexCenter;
        padding: 0 20rpx 0 40rpx;
      }
      .code_btn {
        @include wh(234rpx, 96rpx);
        @include flexCenter;
        border: 2rpx solid rgba(8, 28, 56, 0.15);
        font-size: 32rpx;
        font-weight: 400;
        color: $uni-color;
        &-text_wait {
          opacity: .4;
          color: #081C38;
        }
      }
    }
    .confirm_btn {
      @include wh(622rpx, 100rpx);
      @include flexCenter;
      background: linear-gradient(270deg, #3E82E0 0%, #9080DF 100%);
      box-shadow: 0rpx 8rpx 10rpx 0rpx rgba(121,130,220,0.32);
      border-radius: 20rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #FFFFFF;
    }
  }
}
// uview样式穿透修改
::v-deep .uni-input-placeholder {
  font-size: 32rpx;
  font-weight: 400;
  color: rgba(8, 28, 56, .3);
  line-height: 44rpx;
}
::v-deep .uni-input-input {
  font-size: 32rpx;
  font-weight: 400;
  color: #081C38;
  line-height: 44rpx;
}
</style>
