<template>
  <div>
    <login-btn
      @click="login"
    />
  </div>
</template>

<script>
export default {
  components:{
    'login-btn':()=>import('../src/public/login-btn.vue')
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created: function () {

  },
  mounted: function () {
    this.$emit('setCode', '/demo/login-btn-test.vue');
    this.$emit('setInfo', '登录按钮');

  },
  methods: {
    login(){
      console.log('login');
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
