<!--
  echarts echar简约环形饼图仪表盘demo
  @author wjh 2019-10-30
  官网实例：https://gallery.echartsjs.com/editor.html?c=xa9aPNIoiN
-->
<template>
  <dash-board-pie
    :param="param"
  />
</template>

<script>
import DashBoardPie from '../src/public/echarts/dash-board-pie/dash-board-pie';
export default {
  name: 'DashBoardPieDemo',
  components: {DashBoardPie},
  data(){
    return {
      param:{
        id: 'EchartsCommonLeft',
        width: '200px',
        height: '200px',
        subtext: null, //饼图展示文字
        realTimeValue: '70',
        unit: '%',
        maxvalue:'100',
        minvalue:'0',
        color1:'#06d9ff', //渐变色初始
        color2:'#06d9ff', //渐变色结束
        shadowColor:'#035886',
        textColor:'#333', // 默认：白色
        textSize: 18, // 默认：18
        unitSize: 8.4, // 默认：8.4
      }
    };
  }
};
</script>

<style scoped>

</style>
