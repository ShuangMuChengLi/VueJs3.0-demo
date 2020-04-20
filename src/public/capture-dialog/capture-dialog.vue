<!--
抓拍信息弹窗
author:zzq
currentInfo（信息实例）
{
  sceneUrl:'./resource/images/1.jpg',
  faceUrl:'./resource/images/1.jpg',
  personUrl:'./resource/images/1.jpg',
  deviceName:'前埔前村舒心阳光公寓',
  similarity:'97.62',
  personName:'周男神',
  personLabels:'重点|关注,刑|安全',
  idcard:'352225199509022511',
  captureTime:'2020-01-20 10:33:24'
}
-->
<template>
  <div
    v-show="visible"
    class="screen-capture-dialog-component-div"
  >
    <div
      class="has-data-div"
    >
      <!--头部-->
      <div class="title-div">
        <div>
          <i class="icon-location" />
          <span v-if="currentInfo && currentInfo.deviceName">{{ currentInfo.deviceName }}</span>
        </div>
        <i
          class="icon-close"
          @click="closeWindow()"
        />
      </div>
      <!--中间全景区域-->
      <div class="middle-div">
        <div class="pic-div">
          <pic-adaption
            :src="sceneSrc"
            :error-img="errorImg"
          />
        </div>
      </div>
      <!--底部信息区域-->
      <div class="bottom-div">
        <!--底部左边部分-->
        <div class="bottom-left-div">
          <!--底部左边上面部分-->
          <div class="bottom-left-top-div">
            <!--抓拍图-->
            <div>
              <div class="pic-style pic-div">
                <pic-adaption
                  :src="captureSrc"
                  :error-img="errorImg"
                />
              </div>
              抓拍图片
            </div>
            <!--相似度-->
            <div class="similarity-div">
              <span v-if="currentInfo && currentInfo.similarity">
                {{ Number(currentInfo.similarity).toFixed(2) }}%
              </span>
              <i
                class="icon-similarity"
              />
            </div>
            <!--抓拍图-->
            <div>
              <div class="pic-style-two pic-div">
                <pic-adaption
                  :src="personSrc"
                  :error-img="errorImg"
                />
              </div>
              比对图片
            </div>
          </div>
        </div>
        <!--文字区域-->
        <div class="text-div">
          <div v-if="currentInfo && currentInfo.personName">
            {{ currentInfo.personName }}
          </div>
          <div>
            <span
              v-if="currentInfo && currentInfo.idcard"
              class="id-card"
            >{{ currentInfo.idcard }}</span>
          </div>
          <div>
            <p-label
              v-if="currentInfo && currentInfo.personLabels"
              :labels="currentInfo.personLabels"
              :limit="2"
              :is-row="true"
            />
          </div>
          <div v-if="currentInfo && currentInfo.captureTime">
            报警时间：<span>{{ currentInfo.captureTime }}</span>
          </div>
          <div v-if="currentInfo && currentInfo.deviceName">
            抓拍地点：<span>{{ currentInfo.deviceName }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import picAdaption from '../pic-adaption.vue';//图片自适应组件
import pLabel from '../person-label.vue';//人员标签组件
import errorImg from './images/undefined.png';

let _ = require('lodash');
export default {
  name:'ScreenCaptureDialog',
  components:{
    picAdaption,
    pLabel
  },
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    //当前告警信息
    currentInfo:{
      type:Object,
      default:null
    }
  },
  data(){
    return{
      errorImg:errorImg, //错误图片
    };
  },
  computed:{
    //全景图
    sceneSrc(){
      let src = '';
      if (this.currentInfo && this.currentInfo.sceneUrl){
        src = this.currentInfo.sceneUrl;
      }
      return src;
    },
    //抓拍图
    captureSrc(){
      let src = '';
      if (this.currentInfo && this.currentInfo.faceUrl){
        src = this.currentInfo.faceUrl;
      }
      return src;
    },
    //证件照
    personSrc(){
      let src = '';
      if (this.currentInfo && this.currentInfo.personUrl){
        src = this.currentInfo.personUrl;
      }
      return src;
    },
  },
  methods:{
    /**
       * 关闭弹窗
       */
    closeWindow(){
      this.$emit('update:visible', false);
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="less">
  @import "css/capture-dialog.less";
</style>
