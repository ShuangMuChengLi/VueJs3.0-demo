<template>
  <timeline :timeline="timeLineData" />
</template>

<script>
import Timeline from './time-line';
export default {
  name: 'TimeLineTest',
  components: {Timeline},
  data(){
    return {
      timeLineData:[
        {
          title:'湖里区火炬园地铁站B端入口',
          subTitle:'微卡口     ',
          time:'2019-05-30 10:46:41'
        },
        {
          title:'湖里区火炬园地铁站B端入口',
          subTitle:'微卡口     ',
          time:'2019-05-30 10:46:41'
        },
        {
          title:'湖里区火炬园地铁站B端入口',
          subTitle:'微卡口     ',
          time:'2019-05-30 10:46:41'
        },
        {
          title:'湖里区火炬园地铁站B端入口',
          subTitle:'微卡口     ',
          time:'2019-05-30 10:46:41'
        },
        {
          title:'湖里区火炬园地铁站B端入口',
          subTitle:'微卡口     ',
          time:'2019-05-30 10:46:41'
        },
      ]
    };
  }
};
</script>

<style scoped lang="less">
  @import "car-time-line";
</style>
