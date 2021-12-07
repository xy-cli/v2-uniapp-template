<script>
import { getQueryStringArgs } from "./utils/utils";
import { mapMutations } from 'vuex';
// 测试2
export default {
  data() {
    return {
      userInfo: {},
    }
  },
  async onLaunch() {
    this.userInfo = this.vuex_user;
    console.log('onLaunch')
    // tabBar隐藏
    uni.hideTabBar({
      success: (res) => {
        console.log(res)
      }
    });
    await this.getIsLogin(); // 获取账号状态
    await this.setIsStudent(); // 设置学生账号状态
    await this.setWindowInfo(); // 设置全局适配信息
  },
  onHide() {
    console.log('App Hide')
  },
  onUnload() {
    console.log('onUnload')
  },
  mounted() {
    window.addEventListener('orientationchange', () => {
      const lenovo = window.navigator.userAgent.includes('Lenovo');
      if (window.orientation === 180 || window.orientation === 0) {
        sessionStorage.setItem('screenStatus', lenovo ? 'y' : 'x')
      }
      if (window.orientation === 90 || window.orientation === -90) {
        sessionStorage.setItem('screenStatus', lenovo ? 'x' : 'y')
      }
      history.go(0)
      location.reload()
      location = location
      location.assign(location)
      window.navigate(location)
      location.replace(location)
      document.URL = location.href
    })
  },
  methods: {
    ...mapMutations(['$setIsStudent']),
    /**
     * 获取账号状态
     */
    getIsLogin() {
      // 比对corpid是否相等
      // 不相等表示已切换账户，退出登录
      const vuex_onlyCorpId = this.vuex_onlyCorpId;
      const corpId = getQueryStringArgs().corpid;
      const { token } = this.vuex_user
      if (corpId && corpId !== vuex_onlyCorpId) {
        this.$u.vuex('vuex_onlyCorpId', corpId || '');
        this.$u.outLogin();
      } else {
        // 未登录情况下跳转到登录页
        if (!token) {
          this.$u.route({
            type: 'reLaunch',
            url: '/pages/login/index'
          })
        }
      }
    },
    /**
     * 设置学生账号状态
     */
    setIsStudent() {
      const isStudent = JSON.parse(window.localStorage.getItem('isStudent'))
          || JSON.parse(window.sessionStorage.getItem('isStudent'))
          || JSON.parse(this.$route.query.isStudent || 'false')
      if (!isStudent && this.userInfo.studentFlag === 0) { // 如果是学生账号，
        this.$u.outLogin();
      }
      this.$setIsStudent(isStudent || false);
    },
    /**
     * 设置全局适配信息
     */
    setWindowInfo() {
      uni.getSystemInfo({
        success: res => {
          console.log(res)
          const platform = res.platform;
          const ua = navigator.userAgent;
          const isAndroid = /(?:Android)/.test(ua);
          const isFireFox = /(?:Firefox)/.test(ua);
          const isSafari = ua.includes('Safari') && ua.includes('Version');
          const isIphone = ua.includes('iPhone') && ua.includes('Version')
          const isPhone6p = (function(){
            const h = window.innerHeight;
            const w = window.innerWidth;
            const useragent = navigator.userAgent.toLowerCase();
            let isP6p = false;
            if (useragent.match(/mobile/i)!==null &&
                useragent.match(/iphone/i)!==null &&
                ( h > w ? (Math.abs(w - 414) < 10 && h <= 736) : (Math.abs(w - 736) < 10) && h <= 414)) {
              isP6p = true
            };
            return isP6p;
          })();
          let isTablet = false;
          const screenStatus = sessionStorage.getItem('screenStatus' || 'x')
          if ((ua.includes('iPad') || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))) && screenStatus === 'x') {
            isTablet = true
          }
          if ((isSafari && !isIphone && 'ontouchend' in document) && screenStatus === 'x') {
            isTablet = true
          }
          let formType = 'browser' // 默认浏览器环境
          if (dd && dd.env.platform !== 'notInDingTalk') {
            formType = 'dingTalk'
          }
          if (String(ua.match(/MicroMessenger/i)) === 'micromessenger') {
            formType ='wx'
          }
          console.log('pad竖屏：'+isTablet)
          // const wHeight = isTablet ? res.windowHeight - 230 : platform === 'ios' ? res.windowHeight - 50 : res.windowHeight - 46
          const reduceHeight = isTablet ? 230 : isPhone6p ? 60 : platform === 'ios' ? 50 : res.model === 'MI 9' ? 55 : 46
          const wHeight = res.windowHeight - reduceHeight
          this.$u.vuex('vuex_sys', {
            formType,
            platform: res.platform,
            windowWidth: res.windowWidth,
            windowHeight: wHeight
          });
        }
      })
    }
  }
}
</script>

<style lang="scss">
.uni-body{
  //width:100vw;
  background: url("./static/image/backgroundWhite.png")no-repeat 100% 100%;
}
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index";
.uni-app--maxwidth{
  max-width: 1000rpx;
  margin: 0 auto;
  background: #FFFFFF;
  position: relative;
}
.u-tabbar__content{
  max-width:1000rpx!important;
  position: fixed;
  left:50% !important;
  transform: translate(-50%, 0);
}
</style>
