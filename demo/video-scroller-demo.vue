<template>
  <div style="width: 500px;">
    <video-scroller
      :time-data="timeData"
      @getResultTime="getResultTime"
    />
    <div>
      输出结果：{{ result.start }}至{{ result.end }}
    </div>
  </div>
</template>

<script>
import VideoScroller from '../src/public/video-scroller/video-scroller';
export default {
  name: 'VideoScrollerDemo',
  components: {VideoScroller},
  data(){
    return {
      timeData:{
        videoDate:'2019-12-26',
        videoStartTime:'12:00:00',
        videoEndTime:'13:00:00',
      },
      result:{
        start:'',
        end:''
      }
    };
  },
  methods:{
    getResultTime(result){
      this.result = result;
    }
  }
};
</script>

<style scoped>

</style>
