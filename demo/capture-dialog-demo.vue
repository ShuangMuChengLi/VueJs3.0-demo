<template>
  <div>
    <capture-dialog
      :visible.sync="show"
      :current-info="currentInfo"
    />
  </div>
</template>

<script>
import captureDialog from '../src/public/capture-dialog/capture-dialog.vue';
export default {
  components:{
    captureDialog
  },
  data(){
    return{
      show:true,
      currentInfo:{
        sceneUrl:'./resource/images/img.jpg',
        faceUrl:'./resource/images/img.jpg',
        personUrl:'./resource/images/img.jpg',
        deviceName:'前埔前村舒心阳光公寓',
        similarity:'97.62',
        personName:'周男神',
        personLabels:'重点|关注,刑|安全',
        idcard:'352225199509022511',
        captureTime:'2020-01-20 10:33:24'
      }
    };
  },
  mounted() {
    this.$emit('setCode', '/capture-dialog-demo.vue');
    this.$emit('setInfo', '抓拍弹窗demo (demo/capture-dialog-demo.vue)');
  }
};
</script>

<style scoped>

</style>
