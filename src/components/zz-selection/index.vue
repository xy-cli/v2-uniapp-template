<template>
  <view class="selection" v-if="list.length">
    <view class="selection-group" @click.stop="toggle">
      <text class="elp">{{ list.filter(item => item[vals] === value)[0][keys] }}</text>
      <u-icon name="arrow-down-fill"
              class="select-icon"
              :class="visible ? 'active' : ''"
              color="#7d8896"
              size="18rpx"></u-icon>
    </view>
    <view class="selection-list"
          :class="{active: activeFLag}"
          :style="{
    top: top+ 'rpx',
    zIndex: zIndex,
    maxHeight: visible ? '1000px' : '0'
  }">
      <view class="list">
        <view class="list-item" v-for="(item, index) in list"
              :class="value === item[vals] ? 'active' : ''"
              :key="index"
              @click="$emit('change', item[vals])">{{item[keys]}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'selection',
  props: {
    value: {
      type: [String, Number],
      default: '0'
    },
    visible: { // 显示，隐藏
      type: Boolean,
      default: false
    },
    keys: {
      type: String,
      default: ''
    },
    vals: {
      type: String,
      default: ''
    },
    top: { // 父元素高度
      type: String,
      default: 88
    },
    list: { // 列表
      type: Array,
      default: () => []
    },
    zIndex: {
      type: String,
      default: '1000'
    }
  },
  data() {
    return {
      activeFLag: true
    }
  },
  mounted() {
    // 设置搜索穿透，点击关闭
    document.body.addEventListener('click', () => {
      this.$emit('update:visible', false);
    });
  },
  methods: {
    toggle() {
      this.$emit('update:visible', !this.visible);
      setTimeout(() => {
        this.activeFLag = !this.visible
      }, 300)
    },
  }
}
</script>

<style lang="scss" scoped>

.selection{
  &-group{
    @include flexCenter;
    @include wh(206rpx, 72rpx);
    text{
      color:rgba(8, 28, 56, 1);
      font-size: 30rpx;
      font-weight: 500;
      margin-right:16rpx;
      max-width: 80%;
    }
    .select-icon{
      transition: all .3s;
      &.active{
        transform: rotate(180deg);
      }
    }
  }
  &-list{
    position: absolute;
    top:0;
    left:0;
    right:0;
    background:rgba(246, 248, 250, 1);
    box-shadow: 0 8rpx 16rpx 0 rgba(8,28,56,0.08);
    z-index: 100;
    transition: all .2s;
    overflow: hidden;
    &.active{display:none}
    .list{
      padding:26rpx 36rpx;
      &-item{
        @include wh(100%, 68rpx);
        @include flexCenter;
        justify-content: flex-start;
        &.active{
          color: $uni-color;
        }
      }
    }
  }
}
</style>
