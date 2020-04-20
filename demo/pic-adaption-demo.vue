<template>
  <div>
    <div
      class="nav-wrapper"
    >
      <pic-adaption
        :src="testImg"
      />
    </div>
  </div>
</template>

<script>
import testImg from './img/473143.jpg';
export default {
  name: 'PicAdaptionDemo',
  components:{
    'pic-adaption' : ()=>import('../src/public/pic-adaption.vue')
  },
  data(){
    return {
      testImg: testImg
    };
  },
  mounted() {
    this.$emit('setCode', '/demo/pic-adaption-demo.vue');
    this.$emit('setInfo', '图片自适应demo (demo/pic-adaption-demo.vue)');
  },
  methods:{

  }
};
</script>

<style scoped lang="less">
  .nav-wrapper{
    height: 200px;
    width: 200px;
  }
</style>
