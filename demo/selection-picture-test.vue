<template>
  <div>
    <selection-picture
      :width="500"
      :height="500"
      src="./demo/img/473143.jpg"
    />
  </div>
</template>

<script>
export default {
  components:{
    'selection-picture':()=>import('../src/public/selection-picture.vue')
  },
  data(){
    return{

    };
  },
  computed:{

  },
  watch:{

  },
  created(){

  },
  mounted(){
    this.$emit('setCode', '/demo/selection-picture-test.vue');
    this.$emit('setInfo', '框选并截取图片');
  },
  methods:{

  }
};
</script>

<style lang="less" scoped="scoped">
</style>
