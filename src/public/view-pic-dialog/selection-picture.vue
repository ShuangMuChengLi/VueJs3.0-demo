<!--图片放大  框选组件 -->
<template>
  <div class="clearfix">
    <div class="left">
      <div class="canvas-box">
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
        <span
          v-if="platePosition"
          class="region-style"
          :style="platePosition"
        />
      </div>
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
  props:{
    'width':{
      type:Number,
      default:0
    },
    'height':{
      type:Number,
      default:0
    },
    'src':{
      type:String,
      default:null
    },
    // 是否鼠标hover就触发放大效果
    'isHoverTrigger':{
      type:Boolean,
      default:false
    },
    // 是否初始化放大某个点
    'isInit':{
      type:Boolean,
      default:false
    },
    'targetWidth':{
      type:Number,
      default:null
    },
    // 多选
    'isMultiSelecter':{
      type:Boolean,
      default:false
    },
    //当前车辆的所有信息
    'regionPosition':{
      type:Object,
      default:()=>{
        return null;
      }
    },
  },
  data() {
    return {
      platePosition:null, //车牌框选位置
      canvas: null, // 在线画布
      ctx: null,

      offCanvas: null, // 离线画布：在内存中的画布，一系列操作后，将整个离线画布渲染到在线画布中显示，提高性能
      offCtx: null,
      preCanvas: null, // 上一次框选结果画布
      preCtx: null,

      img: null,
      drawing: false,
      beginDrawPoint: null,
      drawingPoint: null,
      centerPoint: null,

      rectWidthHeight: [],
      regionDataUrl: '', //框选的dataUrl（base64）

      canvasWidth :0,
      canvasHeight :0,
      regionResultList:[], // 框选结果列表
      toPositionArray:['0,0,0,0'], //框选结果的坐标
    };
  },
  computed: {
    canvasStyle(){
      return `width:${this.canvasWidth}px;height:${this.canvasHeight}px`;
    }
  },
  watch: {
    src:{
      immediate:true,
      handler(){
        this.init();
      }
    }
  },
  created: function () {

  },
  mounted: function () {
  },
  methods: {
    /**
     * 初始化
     * */
    async init() {
      this.reset();
      if(!this.src){
        return;
      }

      this.img = new Image();
      this.platePosition = {};
      // this.img.crossOrigin = 'Anonymous';
      this.img.addEventListener('load', () => {
        this.initCanvasWidthHeight();// 初始化画布宽高
        this.$nextTick(()=>{
          this.initCanvas();
          this.getRegionPosition();
        });
      });
      this.img.src = this.src;
    },
    /**
     * 获取框选车牌的位置
     */
    getRegionPosition(){
      if (!this.regionPosition)return;

      if (this.regionPosition.plateRectLeft || this.regionPosition.plateRectTop) {
        let top = Math.round((this.regionPosition.plateRectTop / this.regionPosition.picheight) * this.canvasHeight);
        let left = Math.round((this.regionPosition.plateRectLeft / this.regionPosition.picwidth) * this.canvasWidth);
        let width = Math.ceil((this.regionPosition.plateRectWidth / this.regionPosition.picwidth) * this.canvasWidth);
        let height = Math.ceil((this.regionPosition.plateRectHeight / this.regionPosition.picheight) * this.canvasHeight);
        this.platePosition = {
          'top':top + 'px',
          'left':left + 'px',
          'width':width + 'px',
          'height':height + 'px',
          'border':'1px red solid'
        };
        return;
      }

      this.platePosition = null;
    },
    /**
     * 重置data
     * */
    reset(){
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
      this.regionDataUrl = '';//框选的dataUrl（base64）

      this.canvasWidth = 0;
      this.canvasHeight = 0;
      this.regionResultList = []; // 框选结果列表
      this.toPositionArray = ['0,0,0,0']; //框选的坐标
      this.$emit('toPosition', this.toPositionArray);//更换图片时候，需要在传递一次值
    },
    /**
     * 初始化画布宽高
     * */
    initCanvasWidthHeight(){
      let imgWidth = this.img.width;
      let imgHeight = this.img.height;
      let imgRate = imgWidth / imgHeight;
      let canvasRate = this.width / this.height;
      if(imgRate > canvasRate){
        // 图片比外框要扁，宽度设置为外框一致，高度按比例计算
        let width = null;
        if(imgWidth > this.width){
          width = this.width;
        }else{
          width = imgWidth;
        }
        this.canvasWidth = width;
        this.canvasHeight = width * imgHeight / imgWidth;
      }else if(imgRate <= canvasRate){
        // 图片比外框要瘦，高度设置为外框一致，宽度按比例计算
        let height = null;
        if(imgHeight > this.height){
          height = this.height;
        }else{
          height = imgHeight;
        }
        this.canvasWidth = height * imgWidth / imgHeight;
        this.canvasHeight = height;
      }
    },
    /**
     * 初始化画布
     * */
    initCanvas(){
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');

      this.offCanvas = document.createElement('canvas');
      this.offCanvas.width = this.canvasWidth;
      this.offCanvas.height = this.canvasHeight;
      this.offCtx = this.offCanvas.getContext('2d');
      this.offCtx.strokeStyle = '#ee5051';
      this.offCtx.lineWidth = 2;
      this.offCtx.drawImage(this.img, 0, 0, this.offCanvas.width, this.offCanvas.height);

      this.drawToRealCanvasFromOffCanvas();
      // 是否初始化放大某个点
      if(this.isInit){
        this.centerPoint = [250, 250 ];
        this.getMagnifyImage();
      }
    },
    /**
     *                 drawing:false,
     beginDrawPoint:0,
     drawingPoint:0,
     */
    mousedown(e) {
      if(this.isHoverTrigger){
        return;
      }

      this.drawing = true;
      this.beginDrawPoint = [e.offsetX, e.offsetY];
    },
    mousemove(e) {
      if(this.isHoverTrigger){
        this.centerPoint = [e.offsetX, e.offsetY ];
        this.getMagnifyImage('center');
        return;
      }

      if (this.drawing) {
        this.drawingPoint = [e.offsetX, e.offsetY];
        this.draw();
      }
    },
    mouseup(e) {
      if(this.isHoverTrigger){
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
          this.getMagnifyImage();
        }
      }
    },
    //获取框选的原图图片
    getMagnifyImage() {
      let [tempCanvas, tempBeginPoint] = this.getTempCanvas();
      let tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(
        this.img,
        ...tempBeginPoint,
        tempCanvas.width,
        tempCanvas.height,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      this.getBeginEndPoint(tempCanvas, tempBeginPoint);
      this.regionDataUrl = tempCanvas.toDataURL();
      this.regionResultList.push(this.regionDataUrl);
      this.$emit('region', this.regionResultList);
    },
    /**
     * 获取起始点结束点
     * */
    getBeginEndPoint(tempCanvas, tempBeginPoint){
      if(!tempCanvas || !tempBeginPoint){
        return;
      }

      for (let i = 0; i < tempBeginPoint.length; i++){
        tempBeginPoint[i] = parseInt(tempBeginPoint[i]);
      }
      let tempBeginPointString = tempBeginPoint.join(',');
      let tempEndPointString = parseInt((tempBeginPoint[0] + tempCanvas.width)) +
        ',' +
        parseInt(tempBeginPoint[1] + tempCanvas.height);
      let toPosition = tempBeginPointString + ',' + tempEndPointString;
      this.toPositionArray.push(toPosition);
      this.$emit('toPosition', this.toPositionArray);
    },
    /**
     * 获取框选的图片的临时画布
     * @return
     * {
        canvas:tempCanvas,
        tempCanvasBeginPoint:tempBeginPoint
      }
     * */
    getTempCanvas(){
      // 矩形中心点离右上角的偏移量
      const OFFSET = [285, 245];
      let tempCanvas = document.createElement('canvas');// 临时画布，放置框选的原图
      let rate = this.img.width / this.offCanvas.width;
      let rectWidthHeight = [];
      let tempBeginPoint = [];
      let tempEndPoint = [];
      if(this.isHoverTrigger){
        // 鼠标hover就触发放大图片的模式下
        for (let i = 0; i < this.centerPoint.length; i++) {
          tempBeginPoint[i] = this.centerPoint[i] * rate - OFFSET[i];
        }
        rectWidthHeight = [OFFSET[0] * 2, OFFSET[1] * 2];
      }else{
        // 鼠标框选才触发放大图片的模式下
        for (let i = 0; i < this.drawingPoint.length; i++) {
          tempBeginPoint[i] = this.beginDrawPoint[i] * rate;
          tempEndPoint[i] = this.drawingPoint[i] * rate;
        }
        // 获取矩形宽高
        for (let i = 0; i < tempBeginPoint.length; i++) {
          rectWidthHeight[i] = Math.abs(tempEndPoint[i] - tempBeginPoint[i]);
        }
        let offsetX = tempEndPoint[0] - tempBeginPoint[0];
        let offsetY = tempEndPoint[1] - tempBeginPoint[1];
        if(offsetX * offsetY >= 0){
          if(offsetX < 0){
            [tempBeginPoint, tempEndPoint] = [tempEndPoint, tempBeginPoint];
          }
        }else{
          if(offsetX > 0){
            tempBeginPoint[1] = tempBeginPoint[1] - rectWidthHeight[1];
          }else{
            tempBeginPoint[0] = tempBeginPoint[0] - rectWidthHeight[0];
          }
        }
      }
      tempCanvas.width = rectWidthHeight[0];
      tempCanvas.height = rectWidthHeight[1];
      return [tempCanvas, tempBeginPoint];
    },
    /**
     * 画框框
     * @param isEnd 框选结束
     * */
    draw(isEnd) {
      if(this.preCanvas){
        this.offCtx.drawImage(this.preCanvas, 0, 0, this.offCanvas.width, this.offCanvas.height);
      }else{
        this.offCtx.drawImage(this.img, 0, 0, this.offCanvas.width, this.offCanvas.height);
      }
      let rectWidthHeight = [];
      for (let i = 0; i < this.drawingPoint.length; i++) {
        rectWidthHeight[i] = this.drawingPoint[i] - this.beginDrawPoint[i];
      }
      this.rectWidthHeight = rectWidthHeight;
      this.offCtx.strokeRect(...this.beginDrawPoint, ...rectWidthHeight);
      this.drawToRealCanvasFromOffCanvas();

      if(isEnd && this.isMultiSelecter){
        if(!this.preCanvas){
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
    clear() {
      this.offCtx.drawImage(this.img, 0, 0, this.offCanvas.width, this.offCanvas.height);
      this.beginDrawPoint = null;
      this.drawingPoint = null;
      this.regionResultList = [];
      this.preCanvas = null;
      this.preCtx = null;
      this.drawToRealCanvasFromOffCanvas();
      // this.reset();
    },
    /**
     * 将离线画布渲染到在线画布
     */
    drawToRealCanvasFromOffCanvas(){
      this.ctx.drawImage(this.offCanvas, 0, 0);
    }
  }

};
</script>

<!-- Add 'scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
