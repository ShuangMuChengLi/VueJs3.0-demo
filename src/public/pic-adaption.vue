<template>
  <div
    class="pic-adaption-component-div open-3D"
  >
    <el-image
      class="img"
      :src="picSrc"
      fit="contain"
      @error="error"
    />
  </div>
</template>


<script>
export default {
  props:{
    'src':{
      'type':String,
      'default': null
    },
    'errorImg':{
      'type':String,
      'default': null
    },
    'backSrc':{
      'type':String,
      'default': null
    },
  },
  data(){
    return{
      picSrc:null,
      state:'src'
    };
  },
  computed:{},
  watch:{
    'src':{
      immediate: true,
      handler() {
        this.init();
      }
    }
  },
  created(){

  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.state = 'src';
      this.picSrc = this.src;
    },
    error(e){
      if(this.state === 'src' && this.backSrc){
        this.state = 'backup';
        this.picSrc = this.backSrc;
        return;
      }

      if(this.errorImg){
        this.state = 'error';
        this.picSrc = this.errorImg;
      }
    }
  }
};
</script>

<style scoped lang="less">
  .pic-adaption-component-div{
    width: 100%;
    height: 100%;
    .img{
      width: 100%;
      height: 100%;
    }
  }
</style>
