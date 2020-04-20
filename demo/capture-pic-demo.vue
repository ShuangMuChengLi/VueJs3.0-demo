<template>
  <div>
    <el-button @click="initCapture">
      初始化
    </el-button>
    <el-button @click="capture">
      抓拍
    </el-button>
    <el-button @click="stop">
      停止
    </el-button>
    <video id="video"/>
    <img :src="img">

  </div>
</template>

<script>
import { CapturePic } from '../src/js/tools/capture-pic';

export default {
  name: 'CapturePicDemo',
  data(){
    return {
      capturePicInstance: null,
      img:null
    };
  },
  mounted() {

  },
  methods:{
    initCapture(){
      this.capturePicInstance = new CapturePic({
        // videoId : 'video', // 展示的videoId 可选  不填默认不显示
        // width: 200, // 图像宽 可选 默认摄像头像素宽
        // height: 100 // 图像高 可选 默认摄像头像素高
      });
    },
    stop(){
      this.capturePicInstance.stop();
    },
    capture(){
      if(!this.capturePicInstance.isSuportTest){
        console.error('未安装或为允许摄像头');
        return;
      }

      this.img = this.capturePicInstance.capture().getBase64();
    }
  }
};
</script>

<style scoped>

</style>
