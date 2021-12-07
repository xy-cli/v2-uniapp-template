<template>
  <view class="defaultLogin">
    <view class="defaultLogin-btn" @click="$u.debounce(login, 3000, true)">
      <image class="defaultLogin-btn__img" src="../../../static/image/user/login_btn.png"></image>
      <text class="defaultLogin-btn__text">{{platform === 'dingTalk' ? '钉钉' : platform === 'wx' ? '微信' : ''}}授权登录</text>
    </view>
    <image class="defaultLogin-bg" src="../../../static/image/user/login_bg.png"></image>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      platform: '',
    }
  },
  methods: {
    /**
     * 登录
     */
    login() {
      if(process.env.VUE_APP_ENV === 'dev') {
        this.setLoginInfo({
          token: "mocktoken",
          name: "李白",
          avatar: 'https://up.enterdesk.com/edpic_source/3c/71/e5/3c71e52376ccf6dd8687e60e7a9e3515.jpg',
          unionid: null,
          campusId: '879751027299332096',
          userId: "887343620064595968",
          corpid: "dingb7ace041c733167cf2c783f7214b6d69",
          appInfoId: 3352,
          roleType: 0
        })
        console.log(this.vuex_user)
        console.log(this.vuex_sys)
        console.log(this.vuex_isStudent)
      } else {
        const { formType } = this.vuex_sys
        if (formType === 'wx') {
          this.wxLogin();
        } else if (formType === 'dingTalk') {
          this.dingTalkLogin();
        } else {
          this.$toast.none('仅支持在钉钉或微信环境在登录');
        }
      }
      console.log('login')
    },
    /**
     * 微信环境登录，未开发
     */
    wxLogin() {
      console.log('微信登录！')
    },
    /**
     * 钉钉环境登录
     */
    dingTalkLogin() {
      const onlyCorpId = this.vuex_onlyCorpId;
      console.log('钉钉登录！');
      console.log('登录前取onlyCorpId：' + onlyCorpId);
      if (onlyCorpId) {
        this.$u.vuex('vuex_user.corpid', onlyCorpId);
        dd.ready(() => {
          dd.runtime.permission.requestAuthCode({
            corpId: onlyCorpId, // 企业id
            onSuccess: ({ code }) => {
              console.log(code);
              this.$toast.none('获取授权码成功，正在登录中');
              this.$u.api.getCodeInfo({
                authCode: code, // 通过该免登授权码可以获取用户身份
                corpid: onlyCorpId,
                sid: this.config.sid || ''
              }).then(({ data }) => {
                this.setLoginInfo(data);
              })
            },
            onFail: (err) => {
              this.$toast.none(err.errorMessage || '钉钉授权不允许！')
            }
          })
        })
      } else {
        this.$toast.none('登录失效，请退出重进！')
      }
    },
    /**
     * 设置登录信息存入缓存
     * @param info
     */
    async setLoginInfo(info) {
      await this.$u.vuex('vuex_user', info);
      await this.$u.getAuthorityByUser();
    },
  }
}
</script>

<style lang="scss">

.defaultLogin {
  @include flexCenter;
  @include wh(100%, 100%);
  position: relative;
  &-btn {
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
      top:370rpx;
      left:-10rpx;
      right:0;
      font-size: 32rpx;
      color:#fff;
    }
  }
  &-bg{
    @include fixed(bottom, 0);
    @include wh(1000rpx, 302rpx);
    left:50%;
    margin-left:-500rpx;
  }
}
</style>
