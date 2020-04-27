<template>
  <g>
    <polygon :points="points"></polygon>
    <circle cx="100" cy="100" r="80"></circle>
    <axis-label
      v-for="(stat, index) in stats"
      :key="index"
      :stat="stat"
      :index="index"
      :total="stats.length">
    </axis-label>
  </g>
</template>

<script>
import { computed } from 'vue';
import AxisLabel from './AxisLabel';
// math helper...
function valueToPoint (value, index, total) {
  var x = 0;
  var y = -value * 0.8;
  var angle = Math.PI * 2 / total * index;
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var tx = x * cos - y * sin + 100;
  var ty = x * sin + y * cos + 100;
  return {
    x: tx,
    y: ty
  };
}
export default {
  name: 'Svg',
  props: ['stats'],
  setup (props) {
    return {
      points: computed(() => {
        const total = props.stats.length;
        return props.stats.map((stat, i) => {
          const point = valueToPoint(stat.value, i, total);
          return point.x + ',' + point.y;
        }).join(' ');
      })
    };
  },
  components: {
    AxisLabel
  }
};
</script>

<style scoped>
  polygon {
    fill: #42b983;
    opacity: .75;
  }

  circle {
    fill: transparent;
    stroke: #999;
  }

  text {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 10px;
    fill: #666;
  }

  label {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
  }

  #raw {
    position: absolute;
    top: 0;
    left: 300px;
  }
</style>
