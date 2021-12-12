import { mapState } from 'vuex'
import store from '@/store'
import { getQueryStringArgs } from '../utils/utils'
import variables from '../static/style/variables.scss'

// 尝试将用户在根目录中的store/login.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = []
try {
  $uStoreKey = store.state ? Object.keys(store.state) : []
} catch (e) {

}

module.exports = {
  beforeCreate () {
    // 将vuex方法挂在到$u中
    // 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$u.vuex('login.name', '史诗')
    // 如果要修改vuex的state的version变量为1.0.1 => this.$u.vuex('version', '1.0.1')
    this.$u.vuex = (name, value) => {
      this.$store.commit('$uStore', {
        name, value
      })
    }
    /**
     * 退出登录
     */
    this.$u.outLogin = () => {
      const config = getQueryStringArgs()
      const url = config.corpid ? `/pages/login/index?corpid=${config.corpid}&sid=${config.sid}&wpkbid=${config.wpkbid}` : '/pages/login/index'
      this.$u.vuex('vuex_user', {})
      uni.reLaunch({ url })
    }
    /**
     * 获取权限信息
     * 切换校区信息会更改，需要重新获取
     * 首次登录需要获取
     * 校区Id、roleType权限、name、avatar全部更新，校区改变，内容会变
     * 判断权限
     */
    this.$u.getAuthorityByUser = () => {
      this.$u.api.getAuthorityByUser().then(({ data }) => {
        let roleType = 0 // 开发环境权限全开。0--管理员权限 1--普通老师权限 2--学生账号
        if (!(process.env.VUE_APP_ENV === 'dev')) {
          roleType = this.$route.query.roleType || data.roleType
        }
        const userInfo = this.$u.deepMerge(this.vuex_user, data)
        this.$u.vuex('vuex_user', userInfo)
        this.$u.vuex('vuex_user.roleType', roleType) // 单独设置保持开发环境权限
        console.log('登录信息+校区信息', this.vuex_user)
        const { userId } = this.vuex_user
        if (userId) {
          if (Number(data.type) === 0) {
            uni.switchTab({
              url: '/pages/home/index'
            })
          } else {
            uni.reLaunch({
              url: '/pages/noAccess/index'
            })
          }
        } else {
          uni.reLaunch({
            url: '/pages/login/bindTel'
          })
        }
      })
    }
  },
  computed: {
    // 将vuex的state中的所有变量，解构到全局混入的mixin中
    ...mapState($uStoreKey),
    $variables: () => variables
  }
}
