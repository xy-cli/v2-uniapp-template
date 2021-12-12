<template>
  <view v-show="footer">
    <!-- 留空，防止页面内容碰底被fixed按钮区域遮住 -->
    <view class="blank"></view>
    <view class="fixedFooter ipx-bottom">
      <view class="btns-area">
        <template v-if="fixedBtns.length > 0">
          <view class="btns-area--item"
                v-for="(item, index) in fixedBtns"
                :key="index"
                :class="[item.style, item.disabled ? 'disabled' : '']"
                @click="!item.disabled && clickBtn(item)">
            {{item.content}}
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script>
var _self
export default {
  name: 'fixedFooter',
  props: {
    fixedBtns: {
      type: Array,
      default: () => []
      // fixedBtns: [
      //   {
      //     content: '上一篇',//按钮内容
      //     style: 'plain', //按钮样式
      //     event: 'previous' //自定义的发送事件
      //   },
      // ]
    }
  },
  data () {
    return {
      // 处理软键盘顶起底部fixed元素
      footer: true,
      windowHeight: '',
      timer_ff: null
    }
  },
  mounted () {
    /**
     * 添加页面布局大小改变监听，使底部fixed元素显隐
     * 处理当手机软件盘弹起时，fixed在底部的元素被顶起的问题
     */
    _self = this
    uni.getSystemInfo({
      success: (res) => {
        _self.windowHeight = res.windowHeight
      }
    })
    uni.onWindowResize((res) => {
      if (res.size.windowHeight < _self.windowHeight) {
        _self.footer = false
      } else {
        _self.footer = true
      }
    })
  },
  watch: {
    'show_add' (newval, oldval) {
      if (!newval) {
        this.nameValue = ''
      }
    }
  },
  methods: {
    clickBtn (item) {
      if (this.timer_ff) {
        // 定时器正在执行中，跳过
        return
      }
      const eventName = item.event
      this.$emit(eventName)
      this.timer_ff = setTimeout(() => {
        clearTimeout(this.timer_ff)
        this.timer_ff = null
      }, 500)
    }
  }
}
</script>

<style scoped lang='scss'>

.disabled {
  pointer-events: none;
  cursor: default;
  opacity: .3;
}
.blank {
  @include wh(100%, calc(92rpx + env(safe-area-inset-bottom)));
}
.fixedFooter {
  @extend .fixed_bottom-area; // from src/uni.scss
  z-index: 10000;
  .btns-area {
    display: flex;
    &--item {
      @include wh(192rpx, 68rpx);
      @include flexCenter;
      font-size: 28rpx;
      font-weight: 500;
      border-radius: 33rpx;
      margin-left: 32rpx;
      cursor: pointer;
    }
  }
}
.plain {
  // border-radius: 33rpx;
  border: 2rpx solid #EBEFF4;
  color: $uni-color;
}
.color {
  // border-radius: 33rpx;
  color: #FFFFFF;
  @extend .btn-gradient
}
</style>
