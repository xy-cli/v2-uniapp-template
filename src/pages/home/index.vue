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
    <template v-if="true">
      <u-sticky offset-top="0" :enable="enable" h5-nav-height="0" z-index="1000">
        <!--小组切换，搜索 -->
        <view class="header">
          <view class="header--dropdown">
            <Selection :visible.sync="visible"
                       v-model="groupId"
                       height="88"
                       top="88"
                       zIndex="1001"
                       keys="label"
                       vals="value"
                       :list="groupList"/>
          </view>
          <view class="header--search">
            <u-search placeholder="搜学生"
                      :show-action="false"
                      search-icon-color="#BCC1C7"
                      border-color="#BCC1C7"
                      bg-color="#ffffff"
                      :height="60"
                      maxlength="6"
                      v-model="keyword"></u-search>
          </view>
        </view>
        <!-- 切换值周 -->
        <view class="header group">
          <view class="header--dropdown">
            <Selection :visible.sync="visible2"
                       v-model="groupId"
                       height="72"
                       top="160"
                       zIndex="1000"
                       keys="label"
                       vals="value"
                       :list="groupList"/>
          </view>
          <view class="header--search">
            <view class="header--search__btn">
              <view>按学号排序</view>
              <u-line color="#DDDDDD" length="26rpx" direction="col" margin="0 20rpx"/>
              <view>按首字母排序</view>
            </view>
          </view>
        </view>
      </u-sticky>
      <!-- 学生列表-->
      <view class="student">
        <view class="student--list">
          <view class="list" v-for="item in studentList" :key="item.number">
            <view class="list--item"
                  :class="{active: item.check}"
                  @click="studentCheck(item)">
              <view class="list--item__number">{{item.number}}</view>
              <view class="list--item__name">{{item.studentName}}</view>
              <view class="list--item__score"
                    :class="item.score | scoreFilter">{{item.score}}</view>
            </view>
          </view>
        </view>
      </view>
      <!--点评按钮-->
      <view class="footer">
        <view class="footer--check" @tap.stop="studentCheckAll">
          <img v-if="checkAll" src="../../static/image/home/check-btn_chose.png"></img>
          <img v-else src="../../static/image/home/check-btn.png"></img>
          <text>{{checkAll ? '取消' : ''}}全选</text>
        </view>
        <view class="footer--btn"
              @tap.stop="!disabled && change()"
              :class="disabled ? 'active' : ''">点评学生</view>
      </view>
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
import Selection from '@/components/zz-selection'
import TabBar from '@/components/zz-tabbar';
import json from '@/utils/json'
export default {
  components: { TabBar, Selection },
  data() {
    return {
      title: 'hello uni-app',
      visible: false,
      visible2: false,
      groupId: 1,
      keyword: '',
      groupList: json.groupList,
      studentList: [], // 学生列表
      enable: true, // 吸顶监听
      disabled: true, // 点评按钮是否可点击
      checkAll: false, // 是否全选
    }
  },
  async onShow() {
    this.enable = true
  },
  async onLoad() {
    await this.getCampusList()
    await this.getGroupInfo()
    await this.getStudentList()
  },
  onHide() {
    this.enable = false
  },
  filters: {
    scoreFilter(score) {
      const scoreStr = String(score);
      return scoreStr.includes('+') ? 'success' : scoreStr.includes('-') ? 'warning' : ''
    }
  },
  methods: {
    async getStudentList() {
      this.studentList = json.studentList.map((item, index) => {
        const n = index+1
        const number = n > 9 ? n : '0'+(n)
        item.studentName = item.studentName.substring(0, 4)
        this.$set(item, 'check', false)
        this.$set(item, 'number', number)
        return item
      })
    },
    async getCampusList() {
      const { data } = await this.$u.api.getCampusList()
      // console.log(data)
    },
    async getGroupInfo() {
      const { data } = await this.$u.api.getGroupInfo()
      // console.log(data)
    },
    studentCheck(item) {
      item.check = !item.check
      this.flagJudge();
    },
    studentCheckAll() {
      const checkList = this.studentList.filter(item => item.check);
      const flag = checkList.length < this.studentList.length; // 选中的小于全部，表示未全部选中
      this.studentList.map(item => {
        item.check = flag;
        return item;
      })
      this.flagJudge();
    },
    flagJudge() {
      this.$nextTick(() => {
        const check = this.studentList.filter(item => item.check);
        this.checkAll = check.length === this.studentList.length; // 选中的和总数据比较，判断是否全选
        this.disabled = !check.length; // 根据选中值判断是否可点击
      })
    },
    change() {
      const list = this.studentList.filter(item => item.check)
      this.$u.vuex('vuex_remarkOnList' ,{
        type: 'add', // 添加标识 add ,编辑edit
        list // 学生列表
      })
      uni.navigateTo({ url: '/pages/remarkOn/index' });
    },
    addGroup() {
      console.log('添加小组')
    },
  }
}
</script>
<style lang="scss" scoped>
.home{
  .header{
    height:88rpx;
    @include flexCenter;
    padding:0 30rpx;
    background-color: #FFFFFF;
    &--dropdown{
      flex:1.5;
      @include wh(100%, 100%);
    }
    &--search{
      flex:3;
      &__btn{
        @include wh(100%, auto);
        @include flexCenter;
        justify-content: flex-end;
        padding: 0 30rpx;
        font-size: 26rpx;
        font-weight: bolder;
        color:#081C38;
        //background: #F8F8F8;
      }
    }
    &.group{
      height:72rpx;
      @include flexCenter;
      justify-content: flex-start;
      background: #EFF0F2;
      position: relative;
    }
  }
  .student{
    padding: 30rpx 0 120rpx;
    &--list{
      @include flexCenter;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 0 21rpx;
      .list{
        width:20%;
        min-width: 20%;
        max-width: 20%;
        @include flexCenter;
        padding-bottom: 18rpx;
        &--item{
          @include flexCenter;
          justify-content: flex-start;
          flex-direction: column;
          @include wh(126rpx, 152rpx);
          @include bis('../../static/image/home/check-bg.png');
          //@include bis('../../static/image/home/check-bg_chose.png');
          transition: all .3s;
          &.active{
            @include bis('../../static/image/home/check-bg_chose.png');
            transition: all .3s;
            .list--item__number{
              color:#FFFFFF;
              transition: all .3s;
            }
          }
          &__number{
            line-height: 36rpx;
            font-size: 22rpx;
            font-weight: bolder;
            color:#434E5E;
            transition: all .3s;
          }
          &__name{
            width:90%;
            line-height: 36rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-size: 26rpx;
            color:#081C38;
            margin:20rpx 0 4rpx;
            text-align: center;
          }
          &__score{
            line-height: 34rpx;
            font-size: 24rpx;
            font-weight: bolder;
            &.success{color:$uni-color-success}
            &.warning{color: $uni-color-warning}
          }
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom:calc(100rpx + env(safe-area-inset-bottom));
    left:50%;
    @include wh(100%, 100rpx);
    max-width: 1000rpx;
    transform: translateX(-50%);
    @include flexCenter;
    justify-content: space-between;
    background: #FFFFFF;
    box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.08);
    padding:0 28rpx;
    &--check{
      @include flexCenter;
      img{
        @include wh(36rpx,36rpx);
      }
      text{
        margin-left: 15rpx;
      }
    }
    &--btn{
      @include wh(192rpx, 68rpx);
      @include flexCenter;
      background-color: #4FC3FF;
      border-radius: 33rpx;
      font-size: 28rpx;
      color: #FFFFFF;
      font-weight: bolder;
      &.active{
        opacity: .3;
      }
    }
  }
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
