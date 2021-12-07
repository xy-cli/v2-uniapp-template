<template>
  <view class="myPopup">
    <u-popup
      :value.sync="visible"
      :mode="options.mode"
      :zoom="options.zoom"
      :border-radius="options.radius"
      :mask-close-able="maskCloseAble"
      :width="size.width"
      :height="size.height"
      :negative-top="options.offsetTop"
      @close="close">
			<view class="view-box">
        <view class="content">
          <slot><view class="content-text" v-html="content"></view></slot>
        </view>
        <view class="btns">
          <view class="btn btn_cancel" @click.stop="cancel">{{cancelBtnText}}</view>
          <view class="btn btn_confirm" @click.stop="confirm">{{confirmBtnText}}</view>
        </view>
      </view>
		</u-popup>
  </view>
</template>

<script>
export default {
  name: 'myPopup',
  props: {
    visible: { type: Boolean, default: false },
    content: { type: String, default: '空内容'},
    cancelBtnText: { type: String, default: '取消' },
    confirmBtnText: { type: String, default: '确认' },
    size: { type: Object, default: () => {return {width: '536rpx', height: 'auto'}} },
    maskCloseAble: { type: Boolean, default: true }
  },
  components: {
  },
  data() {
    return {
      options: {
        mode: 'center',
        zoom: true,
        radius: 24,
        offsetTop: 0
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
      this.close();
    },
    confirm() {
      this.$u.debounce(() => {
        this.$emit('confirm');
      }, 500, true);
      // this.close();
    },
    close() {
      this.$emit('update:visible', false);
    }
  }
}
</script>

<style scoped lang="scss">

.myPopup {
  .view-box {
    @include wh(100%, 100%);
    @include flexCenterCol;
    position: relative;
    .content {
      @include wh(100%, auto);
      @include flexCenterCol;
      font-size: 28rpx;
      font-weight: 500;
      color: #081C38;
      margin-bottom: 166rpx;
      &-text {
        @include wh(364rpx, auto);
        @include flexCenterCol;
        margin-top: 78rpx;
        text-align: justify;
      }
    }
    .btns {
      @include wh(100%, auto);
      @include flexCenter;
      position: absolute;
      bottom: 54rpx;
      left: 0;
      right: 0;
    }
  }
}
.btn {
  @include wh(192rpx, 68rpx);
  @include flexCenter;
  font-size: 28rpx;
  font-weight: 500;
  border-radius: 33rpx;
  cursor: pointer;
  &_cancel {
    border: 2rpx solid #EBEFF4;
    color: $uni-color;
    margin-right: 26rpx;
  }
  &_confirm {
    color: #FFFFFF;
    @extend .btn-gradient;
  }
}
</style>
