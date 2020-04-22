<!--
  echarts echar简约环形饼图仪表盘
  @author wjh 2019-10-30
  官网实例：https://gallery.echartsjs.com/editor.html?c=xa9aPNIoiN
-->
<template>
  <div
    class="echarts-pie-content"
    :style="getEchartsSize"
  >
    <div
      :id="getEchartsId"
      class="echarts"
    />
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'DashBoardPie',
  /**
    param:{
      width: 宽, Number
      height: 高, Number
      id: '',div的id ---选填
      borderSize: '8',//饼图圆环宽度，默认8 ---选填
      subtext: '温度', //饼图展示文字
      realTimeValue: '80', //实际值
      unit:'%', //单位
      maxvalue: ''//最大值
      minvalue: ''//最小值
      color1:'#06d9ff', //渐变色初始
      color2:'#06d9ff', //渐变色结束
      textColor:'#333', // 默认：白色
      textSize: 18, // 默认：18
      unitSize: 8.4, // 默认：8.4
    }
  */
  props: {
    param: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      echartsPie: null,
      timer: null,
      resizeTimer: null
    };
  },
  computed: {
    /**
         * @Description 获取图表的大小；
         */
    getEchartsSize () {
      return {
        width: this.param.width.toString(),
        height: this.param.width.toString()
      };
    },
    /**
         * @Description 获取图表的位置的id；
         */
    getEchartsId () {
      if (this.param.id) return this.param.id;

      return 'echartsPie';
    }
  },
  watch: {
    param: {
      handler (newValue, oldValue) {
        this.init();
      },
      deep: true
    }
  },
  mounted () {
    this.init();
    window.addEventListener('resize', this.resizeEvent);
  },
  beforeDestroy () {
    clearInterval(this.timer);
    window.removeEventListener('resize', this.resizeEvent);
  },
  methods: {
    init () {
      /**
           * 初始化饼图
           *
           */
      this.initMyChartPie();
    },
    resizeEvent () {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.updateChartView();
      }, 100);
    },
    initMyChartPie () {
      if (this.echartsPie) {
        this.echartsPie.clear();
      }
      /*
          * id:放置echarts的div的id;
          * shadowColor: 背景色
          * alarmColor：告警时的颜色
          * realTimeValue ：实际值
          * value：echarts计算扇形大小时用 正常：value = realTimeValue ；异常：value = 0
          * */
      let value, maxvalue, minvalue;
      if (this.param.maxvalue) {
        maxvalue = Number(this.param.maxvalue);
      } else {
        maxvalue = 100;
      }
      if (this.param.minvalue) {
        minvalue = Number(this.param.minvalue);
      } else {
        minvalue = 0;
      }
      const id = this.param.id || 'echartsPie';
      const myChart = echarts.init(document.getElementById(id));
      value = 0;
      const realTimeValue = Number(this.param.realTimeValue);
      value = realTimeValue;
      const color1 = this.param.color1 || '#1d54f7';
      const color2 = this.param.color2 || '#00cefc';
      const colorStops = [
        {
          offset: 0,
          color: color1 || color2 // 0% 处的颜色
        },
        {
          offset: 1,
          color: color2 || color1 // 100% 处的颜色
        }
      ];
      const option = {
        title: {
          text: '{number|' + realTimeValue + '}{unit|' + this.param.unit + '}',
          left: 'center',
          top: 'center', // top待调整
          textStyle: {
            rich: {
              number: {
                color: this.param.textColor || '#fff',
                fontSize: this.param.textSize || 18
              },
              unit: {
                color: this.param.textColor || '#fff',
                fontSize: this.param.unitSize || 8.4,
                padding: [-5, 0, 0, 0]
              }
            }
          },
          itemGap: 0 // 主副标题间距
        },
        color: ['#666'],
        series: [{
          name: 'Line 1',
          type: 'pie',
          clockWise: true,
          radius: ['80%', '60%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [{
            value: 80,
            name: '已使用',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: colorStops
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            name: '未使用',
            value: maxvalue - minvalue - value
          }]
        }]
      };

      myChart.setOption(option);
      myChart.on('click', (params) => {
        this.$emit('myChartClick', params);
      });
      this.echartsPie = myChart;
    },
    updateChartView () {
      this.echartsPie.resize();
    }
  }
};
</script>

<style scoped lang="less">
  /**
  * echarts 简约饼图
  * @author wjh 2019-10-30
  */
  .echarts-pie-content{
    //width: 300px;
    //height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .echarts{
      width: 100%;
      height: 100%;
    }
  }
</style>
