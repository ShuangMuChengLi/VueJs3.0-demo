<template>
  <div class="clearfix">
    <div class="left">
      <canvas
        id="canvas"
        :width="canvasWidth"
        :height="canvasHeight"
        class="open-3D"
        :style="canvasStyle"
        @mousedown.left.prevent="mousedown"
        @mousemove.left.prevent="mousemove"
        @mouseup.left.prevent="mouseup"
        @mouseleave.left.prevent="mouseup"
        @contextmenu.prevent="clear"
      />
    </div>

    <div
      v-if="!isMultiSelecter"
      class="right"
    >
      <!--<div class="right">-->
      <img
        :src="regionDataUrl"
        :width="targetWidth"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    src: {
      type: String,
      default: null
    },
    isHoverTrigger: {
      type: Boolean,
      default: false
    },
    isInit: {
      type: Boolean,
      default: false
    },
    targetWidth: {
      type: Number,
      default: null
    },
    // 多选
    isMultiSelecter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      canvas: null, // 在线画布
      ctx: null,
      offCanvas: null, // 离线画布
      offCtx: null,
      preCanvas: null, // 上一次框选结果画布
      preCtx: null,

      img: null,
      drawing: false,
      beginDrawPoint: null,
      drawingPoint: null,
      centerPoint: null,

      rectWidthHeight: [],
      regionDataUrl: '', // 框选的dataUrl（base64）

      canvasWidth: 0,
      canvasHeight: 0,
      regionResultList: [] // 框选结果列表
    };
  },
  computed: {
    canvasStyle () {
      return `width:${this.canvasWidth}px;height:${this.canvasHeight}px`;
    }
  },
  watch: {
    src: {
      immediate: true,
      handler () {
        this.initCanvas();
      }
    }
  },
  created: function () {

  },
  mounted: function () {
  },
  methods: {
    reset () {
      this.canvas = null;// 在线画布
      this.ctx = null;
      this.offCanvas = null;// 离线画布
      this.offCtx = null;
      this.preCanvas = null;// 上一次框选结果画布
      this.preCtx = null;

      this.img = null;
      this.drawing = false;
      this.beginDrawPoint = null;
      this.drawingPoint = null;
      this.centerPoint = null;

      this.rectWidthHeight = [];
      this.regionDataUrl = '';// 框选的dataUrl（base64）

      this.canvasWidth = 0;
      this.canvasHeight = 0;
      this.regionResultList = []; // 框选结果列表
    },
    initCanvas () {
      this.reset();
      if (!this.src) {
        return;
      }

      this.img = new Image();
      // this.img.crossOrigin = 'Anonymous';
      this.img.addEventListener('load', () => {
        const imgWidth = this.img.width;
        const imgHeight = this.img.height;
        const imgRate = imgWidth / imgHeight;
        const canvasRate = this.width / this.height;
        if (imgRate > canvasRate) {
          let width = null;
          if (imgWidth > this.width) {
            width = this.width;
          } else {
            width = imgWidth;
          }
          this.canvasWidth = width;
          this.canvasHeight = width * imgHeight / imgWidth;
        } else if (imgRate <= canvasRate) {
          let height = null;
          if (imgHeight > this.height) {
            height = this.height;
          } else {
            height = imgHeight;
          }
          this.canvasWidth = height * imgWidth / imgHeight;
          this.canvasHeight = height;
        } else {
          this.canvasWidth = imgWidth;
          this.canvasHeight = imgHeight;
        }
        this.$nextTick(() => {
          this.canvas = document.getElementById('canvas');
          this.ctx = this.canvas.getContext('2d');

          this.offCanvas = document.createElement('canvas');
          this.offCanvas.width = this.canvasWidth;
          this.offCanvas.height = this.canvasHeight;
          this.offCtx = this.offCanvas.getContext('2d');
          this.offCtx.strokeStyle = '#ee5051';
          this.offCtx.strokeWidth = 2;
          this.offCtx.drawImage(this.img, 0, 0, this.offCanvas.width, this.offCanvas.height);

          this.ctx.drawImage(this.offCanvas, 0, 0);

          if (this.isInit) {
            this.centerPoint = [250, 250];
            this.getLeftImage();
          }
        });
      });
      this.img.src = this.src;
    },
    /**
       *                 drawing:false,
       beginDrawPoint:0,
       drawingPoint:0,
       */
    mousedown (e) {
      if (this.isHoverTrigger) {
        return;
      }

      this.drawing = true;
      this.beginDrawPoint = [e.offsetX, e.offsetY];
    },
    mousemove (e) {
      if (this.isHoverTrigger) {
        this.centerPoint = [e.offsetX, e.offsetY];
        this.getLeftImage('center');
        // this.draw();
        return;
      }

      if (this.drawing) {
        this.drawingPoint = [e.offsetX, e.offsetY];
        this.draw();
      }
    },
    mouseup (e) {
      if (this.isHoverTrigger) {
        return;
      }

      this.drawingPoint = [e.offsetX, e.offsetY];
      if (this.drawing) {
        this.drawing = false;
        this.draw(true);
        if (this.beginDrawPoint[0] === this.drawingPoint[0] && this.beginDrawPoint[1] === this.drawingPoint[1]) {
          this.beginDrawPoint = null;
          this.drawingPoint = null;
          this.regionDataUrl = '';
        } else {
          this.getLeftImage();
        }
      }
    },
    // 获取框选的图片
    getLeftImage () {
      const tempCanvas = document.createElement('canvas');
      const rate = this.img.width / this.offCanvas.width;
      let rectWidthHeight = [];
      let tempBeginPoint = [];
      const tempEndPoint = [];
      if (this.isHoverTrigger) {
        for (let i = 0; i < this.centerPoint.length; i++) {
          tempBeginPoint[i] = this.centerPoint[i] * rate - 56;
          tempEndPoint[i] = this.centerPoint[i] * rate + 50;
        }
        rectWidthHeight = [116, 100];
      } else {
        for (let i = 0; i < this.drawingPoint.length; i++) {
          tempBeginPoint[i] = this.beginDrawPoint[i] * rate;
          tempEndPoint[i] = this.drawingPoint[i] * rate;
        }
        for (let i = 0; i < tempBeginPoint.length; i++) {
          rectWidthHeight[i] = Math.abs(tempEndPoint[i] - tempBeginPoint[i]);
        }
      }

      tempCanvas.width = rectWidthHeight[0];
      tempCanvas.height = rectWidthHeight[1];
      const tempCtx = tempCanvas.getContext('2d');
      if (tempEndPoint[0] - tempBeginPoint[0] < 0) {
        tempBeginPoint = tempEndPoint;
      }
      tempCtx.drawImage(this.img, ...tempBeginPoint, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);
      this.regionDataUrl = tempCanvas.toDataURL();
      this.regionResultList.push(this.regionDataUrl);
      this.$emit('region', this.regionResultList);
    },
    draw (isEnd) {
      if (this.preCanvas) {
        this.offCtx.drawImage(this.preCanvas, 0, 0, this.offCanvas.width, this.offCanvas.height);
      } else {
        this.offCtx.drawImage(this.img, 0, 0, this.offCanvas.width, this.offCanvas.height);
      }
      const rectWidthHeight = [];
      for (let i = 0; i < this.drawingPoint.length; i++) {
        rectWidthHeight[i] = this.drawingPoint[i] - this.beginDrawPoint[i];
      }
      this.rectWidthHeight = rectWidthHeight;
      this.offCtx.strokeRect(...this.beginDrawPoint, ...rectWidthHeight);
      this.ctx.drawImage(this.offCanvas, 0, 0);
      if (isEnd && this.isMultiSelecter) {
        if (!this.preCanvas) {
          this.preCanvas = document.createElement('canvas');
          this.preCanvas.width = this.canvasWidth;
          this.preCanvas.height = this.canvasHeight;
          this.preCtx = this.preCanvas.getContext('2d');
          this.preCtx.strokeStyle = '#ee5051';
          this.preCtx.strokeWidth = 2;
        }
        this.preCtx.drawImage(this.offCanvas, 0, 0);
      }
    },
    clear () {
      this.offCtx.drawImage(this.img, 0, 0, this.offCanvas.width, this.offCanvas.height);
      this.beginDrawPoint = null;
      this.drawingPoint = null;
      this.regionResultList = [];
      this.preCanvas = null;
      this.preCtx = null;
      this.ctx.drawImage(this.offCanvas, 0, 0);
      // this.reset();
    }
  }

};
</script>

<!-- Add 'scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
