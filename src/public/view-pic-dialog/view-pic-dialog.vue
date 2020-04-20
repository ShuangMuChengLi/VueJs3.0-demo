<!--
放大镜大图弹窗
demo:demo/view-pic-dialog-demo.vue
:visible.sync="bigPicVisible"
true
:index="index"
Number
:list="tableData"
[
  {
    src: carPic,
    license:'粤222222',
    passTime:'2019-07-7 14:30:46',
    bayonet:'石星路与路口',
    carBrand: '品牌',
    carColor:'黑色',
    carType:'卡车'
  },
  {
    src: carPic,
    license:'粤222233',
    passTime:'2019-07-7 14:30:46',
    bayonet:'石星路与路口',
    carBrand: '卡车',
    carColor:'黑色',
    carType:'卡车'
  },
]
 -->
<template>
  <el-dialog
    class="common-table view-pic-dialog"
    title="查看图片"
    width="1200px"
    :visible.sync="dialogVisible"
    @close="cancel"
  >
    <div class="content">
      <div class="pic-wrapper">
        <!--:src="getImg(currentItem && currentItem['secondPicPath'])"-->
        <selection-picture
          :src="currentItem && currentItem['src']"
          :region-position="currentItem"
          :is-hover-trigger="true"
          :width="570"
          :height="509"
          :target-width="570"
          :is-init="true"
        />
      </div>
      <div class="info">
        <ul class="info-list clearfix">
          <li
            v-if="nonMotorLayout === 'nonMotor'"
            class="info-item"
          >
            <span class="info-title">车辆类型：</span>
            <span>{{ currentItem.vehicleType }}</span>
          </li>
          <li
            v-if="nonMotorLayout === 'all'"
            class="info-item"
          >
            <span class="info-title">车牌号码：</span>
            <span>{{ currentItem.plateNumber }}</span>
          </li>
          <li
            v-if="nonMotorLayout === 'nonMotor' || nonMotorLayout === 'all'"
            class="info-item"
          >
            <span class="info-title">过车时间：</span>
            <span>{{ currentItem.passTime }}</span>
          </li>
          <li
            v-if="nonMotorLayout === 'nonMotor' || nonMotorLayout === 'all'"
            class="info-item"
          >
            <span class="info-title">点位：</span>
            <span :title="currentItem.passPortName">{{ util.beyondShowDot(currentItem.passPortName, 20) }}</span>
          </li>
          <li
            v-if="nonMotorLayout === 'all'"
            class="info-item"
          >
            <span class="info-title">车辆品牌：</span>
            <span>{{ currentItem.brandName }} </span>
          </li>
          <li
            v-if="nonMotorLayout === 'all'"
            class="info-item"
          >
            <span class="info-title">车身颜色：</span>
            <span
              class="color-block"
              style="background-color: #fff"
            />
            <span />
          </li>
          <li
            v-if="nonMotorLayout === 'all'"
            class="info-item"
          >
            <span class="info-title">车辆类型：</span>
            <span>{{ currentItem.vehicleType }}</span>
          </li>
        </ul>
      </div>
    </div>
    <footer
      v-if="isShowFooter"
      class="footer"
    >
      <el-button
        class="footer-btn"
        type="primary"
        @click="prev"
      >
        上一条
      </el-button>
      <el-button
        class="footer-btn"
        type="primary"
        @click="next"
      >
        下一条
      </el-button>
      <el-button
        class="footer-btn"
        type="primary"
      >
        以图搜车
      </el-button>
      <el-button
        class="footer-btn"
        type="primary"
      >
        下载图片
      </el-button>
      <el-button
        v-if="!unreal"
        class="footer-btn"
        type="primary"
      >
        违章检测
      </el-button>
      <el-button
        v-if="!isTrack"
        class="footer-btn"
        type="primary"
      >
        轨迹重现
      </el-button>
      <el-button
        v-if="unreal"
        class="footer-btn"
        type="primary"
      >
        加入假套牌车库
      </el-button>
      <el-button
        v-if="unreal"
        class="footer-btn"
        type="primary"
      >
        布控详情
      </el-button>
    </footer>
  </el-dialog>
</template>

<script>
import SelectionPicture from './selection-picture';
import carColor from './car_color.json';
import { util } from '../../js/tools/util';

/**
 * <view-pic-dialog
 :list="list"
 />
 list:[
 {
               car: '/resource/images/common/1.png',
          license:'粤222222',
          passTime:'2019-07-7 14:30:46',
          bayonet:'石星路与路口',
          carBrand: '品牌',
          carColor:'黑色',
          carType:'卡车'
        },
 {
          car: '/resource/images/common/1.png',
          license:'粤222222',
          passTime:'2019-07-7 14:30:46',
          bayonet:'石星路与路口',
          carBrand: '卡车',
          carColor:'黑色',
          carType:'卡车'
        },
 ]
 */
export default {
  name: 'ViewPicDialog',
  components: {SelectionPicture},
  props:{
    'list':{
      type:Array,
      default: null
    },
    'index':{
      type: Number,
      default:0
    },
    'visible':{
      type:Boolean,
      default:false
    },
    'unreal': {
      type: Boolean,
      default: false
    },
    'isTrack': {
      type: Boolean,
      default: false
    },
    // 非机动车样式 为 nonMotor
    nonMotorLayout:{
      type:String,
      default:'all'
    },
    isShowFooter:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return {
      util:util,
      dialogVisible: false,
      currentIndex: 0,
      carColor: carColor, //车身颜色
      regionPosition:null,
    };
  },
  computed:{
    currentItem(){
      if(!this.list)return {};

      return this.list[this.currentIndex] || {};
    },
  },
  watch:{
    visible:{
      immediate:true,
      handler(){
        this.dialogVisible = this.visible;

      }
    },
    index(){
      this.currentIndex = this.index;
    },
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      if(!this.list || !this.list.length){
        return;
      }

      this.currentIndex = this.index;
    },
    prev(){
      if(!this.list){
        return;
      }

      if(this.currentIndex === 0){
        return;
      }

      this.currentIndex --;
    },
    next(){
      if(!this.list){
        return;
      }

      if(this.currentIndex === this.list.length - 1){
        return;
      }

      this.currentIndex ++;
    },
    cancel(){
      this.$emit('update:visible', false);
    },
  }
};
</script>

<style scoped lang="less">
  @import "./view-pic-dialog.less";
</style>
