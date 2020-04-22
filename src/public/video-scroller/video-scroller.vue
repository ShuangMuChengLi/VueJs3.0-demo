<!--
时间段选择滑块组件
输入timeData
{
  videoDate:日期(字符串YYYY-MM-DD)
  videoStartTime:开始时间(字符串 HH:mm:ss)
  videoEndTime:结束时间(字符串 HH:mm:ss)
}
输出计算后的时间，抛出getResultTime，值Object
{
  start:startTime(字符串YYYY-MM-DD HH:mm:ss),
  end:endTime(字符串YYYY-MM-DD HH:mm:ss)
}
-->
<template>
  <div class="video-scroller-component-div">
    <!--上部刻度尺部分-->
    <div
      ref="canvasBox"
      class="top-div"
    >
      <canvas
        id="myCanvas"
        :width="canvasWidth"
        :height="canvasHeight"
      />
      <!--刻度尺滑块区域-->
      <div
        class="ruler-scroller"
        :style="rulerScrollStyle"
        @mousedown="handleScrollerMouseDown($event,'rulerInfo')"
        @mouseenter="isRealTimeShow = true"
        @mousemove="isRealTimeShow = true"
        @mouseleave="isRealTimeShow = false"
      >
        <span
          v-show="isRealTimeShow"
          class="float-span-space float-left-top"
        >{{ result.start }}</span>
        <span
          v-show="isRealTimeShow"
          class="float-span-space float-right-top"
        >{{ result.end }}</span>
        <!--左边-->
        <div
          class="icon-triangle-div"
          @mousedown.stop="handleWidthChangeMouseDown($event,'left','rulerInfo')"
        >
          <i class="icon-special" />
          <i class="icon-triangle" />
        </div>
        <!--右边-->
        <div
          class="icon-triangle-div icon-triangle-div-right"
          @mousedown.stop="handleWidthChangeMouseDown($event,'right','rulerInfo')"
        >
          <i class="icon-special icon-special-right" />
          <i class="icon-triangle icon-triangle-right" />
        </div>
      </div>
    </div>
    <!--下部2滑动槽部分-->
    <div class="bottom-div">
      <!--滚动槽-->
      <div
        ref="scrollerOutBox"
        class="scroller-out-box"
      >
        <!--内部滚动条-->
        <div
          class="scroller-in-box"
          :style="scrollerStyle"
          @mousedown="handleScrollerMouseDown($event,'scrollerInfo')"
        >
          <i
            class="icon-drag"
            @mousedown.stop="handleWidthChangeMouseDown($event,'left','scrollerInfo')"
          />
          <span>|||</span>
          <i
            class="icon-drag"
            @mousedown.stop="handleWidthChangeMouseDown($event,'right','scrollerInfo')"
          />
        </div>
      </div>
      <span class="float-span-space float-left-style">{{ timeData.videoStartTime }}</span>
      <span class="float-span-space float-right-style">{{ timeData.videoEndTime }}</span>
    </div>
  </div>
</template>

<script>
const moment = require('moment');
const _ = require('lodash');
let mouseMoveFn, mouseUpFn, widthMouseMove, widthMouseUp;
export default {
  name: 'VideoScroller',
  props: {
    // 时间数据
    /**
       * {
       *   videoDate:日期(字符串YYYY-MM-DD)
       *   videoStartTime:开始时间(字符串 HH:mm:ss)
       *   videoEndTime:结束时间(字符串 HH:mm:ss)
       * }
       */
    timeData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      // 刻度尺信息信息
      rulerInfo: {
        isDrag: false,
        isWidthChange: false,
        start: 0, // 滑块开始横坐标
        prePosition: 0, // 滑块上一次left的值
        nowPosition: 0, // 滑块最新的left值
        preWidth: 200, // 上一次滑块的宽度
        width: 200, // 滑块最新宽度
        maxScrollerWidth: 0
      },

      // 底下滑块相关数据
      scrollerInfo: {
        isDrag: false,
        isWidthChange: false,
        start: 0,
        prePosition: 0, // 滑块上一次left的值
        nowPosition: 0, // 滑块最新的left值
        preWidth: 200, // 上一次滑块的宽度
        width: 200, // 滑块最新宽度
        maxScrollerWidth: 0
      },

      canvasWidth: 0, // 画布宽度
      canvasHeight: 0, // 画布高度
      rulerRange: 95, // 根据效果图得出刻度尺共有95格刻度

      ready: false,
      // 待处理事件
      pendingEvent: [],

      // 计算结果
      isRealTimeShow: false, // 是否显示真实时间
      result: {
        start: '',
        end: ''
      }
    };
  },
  computed: {
    /**
       * 刻度尺滑块样式
       */
    rulerScrollStyle () {
      return {
        width: this.rulerInfo.width + 'px',
        left: this.rulerInfo.nowPosition + 10 + 'px'
      };
    },
    /**
       * 滑块样式
       */
    scrollerStyle () {
      return {
        width: this.scrollerInfo.width + 'px',
        left: this.scrollerInfo.nowPosition + 'px'
      };
    }
  },
  watch: {
    // 这里需要使用到深度监听，监听到对象内部的变化
    timeData: {
      handler (val) {
        if (val) {
          this.calculateResult();
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    this.initComponent();
  },
  methods: {
    /**
       * 初始化组件
       */
    initComponent () {
      this.rulerInfo.maxScrollerWidth = this.$refs.scrollerOutBox.offsetWidth - 20;
      this.scrollerInfo.maxScrollerWidth = this.$refs.scrollerOutBox.offsetWidth;
      this.initCanvas();
    },
    /**
       * 初始化canvas
       */
    initCanvas () {
      this.canvasWidth = this.$refs.canvasBox.offsetWidth;
      // 因为用了border-box的布局这里需要多剪去border的像素点
      this.canvasHeight = this.$refs.canvasBox.offsetHeight - 2;
      this.$nextTick(() => {
        this.drawGraduationRuler();
        this.ready = true;// 组件加载成功，DOM元素加载完毕
        if (this.pendingEvent.length) {
          const tempAry = [];
          const length = this.pendingEvent.length;
          for (let i = 0; i < length; i++) {
            this[this.pendingEvent[i]]();
            tempAry.push(i);
          }
          for (const item of tempAry) {
            this.pendingEvent.splice(item);
          }
        }
      });
    },
    /**
       * 画刻度尺
       */
    drawGraduationRuler () {
      const canvas = document.getElementById('myCanvas');
      const ctx = canvas.getContext('2d');
      const offCanvas = document.createElement('canvas');
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      const offCtx = offCanvas.getContext('2d');

      let startX = 0;// canvas 起始坐标
      const space = Math.floor(this.canvasWidth / 96);// 刻度之间的距离
      const translateX = (this.canvasWidth - (space * 96)) / 2 + space;

      offCtx.translate(translateX, 0);
      for (let i = 0; i < this.rulerRange; i++) {
        offCtx.beginPath();
        let translateY = 0; // Y轴的起点坐标值
        if (i % 5 === 0 && i !== 0) {
          translateY = this.canvasHeight - 34;
        } else {
          translateY = this.canvasHeight - 24;
        }

        offCtx.moveTo(startX, translateY);
        offCtx.lineTo(startX, this.canvasHeight - 2);
        offCtx.lineWidth = 1;
        offCtx.strokeStyle = '#d0dbdf';
        offCtx.stroke();

        startX = startX + space;
      }

      ctx.drawImage(offCanvas, 0, 0);
    },
    /**
       * 处理点击滑块
       */
    handleScrollerMouseDown (e, source) {
      this[source].isDrag = true;
      this[source].start = e.clientX;
      mouseMoveFn = (e) => {
        this.handleScrollerMouseMove(e, source);
      };
      mouseUpFn = (e) => {
        this.handleScrollerMouseUp(e, source);
      };
      document.addEventListener('mousemove', mouseMoveFn);
      document.addEventListener('mouseup', mouseUpFn);
    },

    /**
       * 处理滑块的移动
       */
    handleScrollerMouseMove (e, source) {
      e.preventDefault();
      if (this[source].isDrag) {
        const posX = e.clientX;
        this[source].nowPosition = this[source].prePosition + (posX - this[source].start);
        this.checkScrollerCrossBorder(source);
      }
    },
    /**
       * 处理鼠标弹起
       */
    handleScrollerMouseUp (e, source) {
      this[source].isDrag = false;
      this[source].prePosition = this[source].nowPosition;
      document.removeEventListener('mousemove', mouseMoveFn);
      document.removeEventListener('mouseup', mouseUpFn);
      this.$nextTick(() => {
        this.calculateResult();
      });
    },
    /**
       * 检查滑块是否越界
       */
    checkScrollerCrossBorder (source) {
      const maxScrollerBorder = this[source].maxScrollerWidth - this[source].width;
      if (this[source].nowPosition >= 0 && this[source].nowPosition <= maxScrollerBorder) {
        return;
      }

      if (this[source].nowPosition < 0) {
        this[source].nowPosition = 0;
      } else {
        this[source].nowPosition = maxScrollerBorder;
      }
    },
    /**
       * 处理滑块宽度变化的鼠标按下事件
       * @param e 原生属性
       * @param direction 拖动方向
       */
    handleWidthChangeMouseDown (e, direction, source) {
      this[source].start = e.clientX;
      this[source].isWidthChange = true;
      widthMouseMove = (e) => {
        this.handleScrollerWidthMouseMove(e, direction, source);
      };
      widthMouseUp = (e) => {
        this.handleScrollerWidthMouseUp(e, direction, source);
      };
      document.addEventListener('mousemove', widthMouseMove);
      document.addEventListener('mouseup', widthMouseUp);
    },
    /**
       * 处理滑块宽度变化，鼠标移动事件
       * @param e 原生属性
       * @param direction 拖动方向
       */
    handleScrollerWidthMouseMove (e, direction, source) {
      e.preventDefault();
      if (this[source].isWidthChange) {
        const posX = e.clientX;
        // 拖动方向为左边的时候还需要改变滑块的left值
        if (direction === 'left') {
          this[source].nowPosition = this[source].prePosition + (posX - this[source].start);
          this.checkScrollerCrossBorder(source);
          // 当滑块到最左边不允许改变宽度了
          if (this[source].nowPosition <= 0) {
            return;
          }

          this[source].width = this[source].preWidth - (posX - this[source].start);
        } else {
          this[source].width = this[source].preWidth + (posX - this[source].start);
        }
        this.checkScrollerWidthCrossBorder(source);
      }
    },
    /**
       * 判断当前滑块宽度是否越界
       */
    checkScrollerWidthCrossBorder (source) {
      const maxWidth = this[source].maxScrollerWidth;
      const minWidth = 100;// 手动设置最小宽度为100

      const viewWidth = this[source].width + this[source].nowPosition;// 滑块宽度加上left
      if (viewWidth <= maxWidth && this[source].width > minWidth) {
        return;
      }

      if (viewWidth > maxWidth) {
        this[source].width = maxWidth - this[source].nowPosition;
      } else {
        this[source].width = minWidth;
      }
    },
    /**
       * 处理滑块宽度变化，鼠标弹起事件
       * @param e 元素属性
       * @param direction 拖动方向
       */
    handleScrollerWidthMouseUp (e, direction, source) {
      this[source].isWidthChange = false;
      if (direction === 'left') {
        this[source].prePosition = this[source].nowPosition;
      }
      this[source].preWidth = this[source].width;
      document.removeEventListener('mousemove', widthMouseMove);
      document.removeEventListener('mouseup', widthMouseUp);
      this.$nextTick(() => {
        this.calculateResult();
      });
    },
    /**
       * 计算结果
       */
    calculateResult () {
      // 当组件还未加载成功，但是又触发了计算的方法
      // 这里采用延后处理，先将此事件放入待处理事件栈中，等到组件加载完成后再去触发执行
      if (!this.ready) {
        this.pendingEvent.push('calculateResult');
        return;
      }

      const startSends = moment(_.get(this.timeData, 'videoDate', '') + ' ' + _.get(this.timeData, 'videoStartTime')).valueOf();
      const endSeconds = moment(_.get(this.timeData, 'videoDate', '') + ' ' + _.get(this.timeData, 'videoEndTime')).valueOf();
      const timeRange = endSeconds - startSends; // 时间差值（毫秒）

      // 算出底下滚动条每一个像素点时间对应长度
      const pixelTimeScroller = timeRange / this.scrollerInfo.maxScrollerWidth;
      const scrollerStartTime = pixelTimeScroller * this.scrollerInfo.nowPosition;

      // 刻度尺的时间范围
      const rulerTimeRange = pixelTimeScroller * this.scrollerInfo.width;
      // 刻度尺每个像素对应的时间长度
      const pixelRuler = rulerTimeRange / this.rulerInfo.maxScrollerWidth;
      const rulerStartTime = this.rulerInfo.nowPosition * pixelRuler;
      const rulerEndTime = (this.rulerInfo.nowPosition + this.rulerInfo.width) * pixelRuler;

      // 根据计算得出正确的时间是
      const resultStartTime = Math.ceil(scrollerStartTime + rulerStartTime + startSends);
      const resultEndTime = Math.ceil(rulerEndTime + startSends + scrollerStartTime);

      const startTime = moment(resultStartTime).format('YYYY-MM-DD HH:mm:ss');
      const endTime = moment(resultEndTime).format('YYYY-MM-DD HH:mm:ss');

      console.log(startTime, endTime);
      this.result.start = moment(startTime).format('HH:mm:ss');
      this.result.end = moment(endTime).format('HH:mm:ss');
      this.$emit('getResultTime', {
        start: startTime,
        end: endTime
      });
    }
  }
};
</script>

<style scoped lang="less">
  @import "./video-scroller";
</style>
