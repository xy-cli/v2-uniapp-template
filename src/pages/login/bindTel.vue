<template>
  <view class="bindTel">
    <view class="bindTel_blank">
      <view class="boxshadow phoneNumber">
        <u-input
          v-model="phoneNumber"
          type="number"
          :border="false"
          :clearable="false"
          :maxlength="11"
          placeholder="请输入手机号"/>
      </view>
      <view class="tip">手机号需同钉钉登录手机号一致</view>
      <view class="codeArea">
        <view class="boxshadow codeNumber">
          <u-input
            v-model="codeNumber"
            type="number"
            :border="false"
            :clearable="false"
            :maxlength="6"
            placeholder="请输入验证码"/>
        </view>
        <view @click="$u.debounce(getCode, 600, true)" class="boxshadow code_btn">
          <view v-show="!sendWait">
            获取验证码
          </view>
          <view v-show="sendWait" class="code_btn-text_wait">
            <!-- <u-count-down ref="uCountDown" :timestamp="timestamp" :autoplay="false" :show-minutes="false" :show-hours="false" @change="counting" @end="countEnd"></u-count-down> -->
            <!-- 秒后重发 -->
            {{tips}}
            <u-verification-code
              :seconds="seconds"
              :keep-running="true"
              @end="end"
              @start="start"
              ref="uCode"
              @change="codeChange"
              end-text="获取验证码"
              change-text="X秒重发"></u-verification-code>
          </view>
        </view>
      </view>
      <view class="confirm_btn" :class="{disabled: phoneNumber.length<10 || codeNumber.length<6}" @click="$u.debounce(bindMobile, 800, true)">
        确认绑定
      </view>
      <u-toast ref="uToast"></u-toast>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: 'Wait',
      phoneNumber: '',
      codeNumber: '',
      tips: '',
      seconds: process.env.VUE_APP_ENV === 'development' ? 20 : 59,
      sendWait: false
    }
  },
  methods: {
    codeChange (text) {
      this.tips = text
    },
    getCode () {
      if (this.$refs.uCode.canGetCode) {
        if (!this.$u.test.mobile(this.phoneNumber)) {
          this.$toast.none('请输入正确的手机号码')
          return false
        }
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码'
        })
        const that = this
        setTimeout(() => {
          that.$u.api.sendCode({ mobile: that.phoneNumber }).then(() => {
            uni.hideLoading()
            // 这里此提示会被this.start()方法中的提示覆盖
            that.$u.toast('验证码已发送')
            // 通知验证码组件内部开始倒计时
            that.$refs.uCode.start()
          })
        }, Math.random() * 1000)
      } else {
        this.$u.toast('倒计时结束后再发送')
      }
    },
    /**
     * 绑定手机号
     */
    bindMobile () {
      uni.showLoading({
        title: '正在绑定手机号码'
      })
      const that = this
      setTimeout(() => {
        that.$u.api.bindMobile({ mobile: that.phoneNumber, code: that.codeNumber }).then(({ success, data }) => {
          uni.hideLoading()
          if (success === true) {
            that.$u.toast('手机号码绑定成功')
          } else {
            this.$toast.none('手机号码绑定失败')
            return false
          }
          setTimeout(() => {
            this.$u.vuex('vuex_user', data)
            uni.reLaunch({ url: '/pages/home/index' })
          }, 500)
        })
      }, Math.random() * 1000)
    },
    end () {
      // this.$u.toast('倒计时结束');
      this.sendWait = false
    },
    start () {
      // this.$u.toast('倒计时开始');
      this.sendWait = true
    }
  },
  onLoad () {
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
      padding-left: 40rpx;
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
        @include wh(364rpx, 96rpx);
        @include flexCenter;
        padding-left: 40rpx;
      }
      .code_btn {
        @include wh(234rpx, 96rpx);
        @include flexCenter;
        border: 2rpx solid rgba(8, 28, 56, 0.15);
        font-size: 32rpx;
        font-weight: 400;
        color: #3E82E0;
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
