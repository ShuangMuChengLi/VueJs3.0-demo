<template>
  <div>
    <selection-picture
      :width="500"
      :height="500"
      :src="img"
    />
  </div>
</template>

<script>
import img from './img/473143.jpg';
export default {
  components:{
    'selection-picture':()=>import('../src/public/selection-picture.vue')
  },
  data(){
    return{
      img
    };
  },
  computed:{

  },
  watch:{

  },
  created(){

  },
  mounted(){
    this.$emit('setCode', '/selection-picture-test.vue');
    this.$emit('setInfo', '框选并截取图片');
  },
  methods:{

  }
};
</script>

<style lang="less" scoped="scoped">
</style>
