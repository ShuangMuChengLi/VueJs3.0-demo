<template>
  <ul class="timeline animation-div">
    <li
      v-for="(item,index) in timeline"
      :key="'timeline' + index"
      class="timeline-item"
      @click="itemClick(item,index)"
      @mouseenter="mouseenter(item,index)"
    >
      <i class="order">{{ item.id }}</i>
      <p class="title">
        {{ item.title }}
      </p>
      <p class="subTitle">
        {{ item.subTitle }} &nbsp; &nbsp; {{ item.time }}
      </p>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Timeline',
  props:{
    /**
       * {
          title:'湖里区火炬园地铁站B端入口',
          subTitle:'微卡口     ',
          time:'2019-05-30 10:46:41'
        }
       * */
    timeline:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  data(){
    return {
    };
  },
  methods:{
    /**
       *
       * @param item
       * {
          title:'湖里区火炬园地铁站B端入口',
          subTitle:'微卡口     2019-05-30 10:46:41',
        }
       * @param index
       */
    itemClick(item, index){
      // this.$emit('click',item, index);
    },
    mouseenter(item, index){
      // this.$emit('mouseenter',item, index);
    },

  }
};
</script>

<style scoped lang="less">
  @import "car-time-line";
</style>
