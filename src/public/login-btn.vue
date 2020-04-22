<template>
  <div>
    <div
      class="ukey"
      @click="userLogin"
    >
      <canvas
        id="nodes"
        width="400"
        height="400"
      />
      <div
        class="ukeyLogin"
      >
        <img
          src="/resource/images/login/icon_user.png"
          class="icon_ukey"
        >
        <p class="ukey_text">
          登录
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Nodes } from '../js/tools/nodes';
export default {
  data () {
    return {};
  },
  computed: {},
  watch: {},
  created: function () {

  },
  mounted: function () {
    Nodes.init();// 登录动态图标
  },
  methods: {
    userLogin () {
      this.$emit('click');
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*登录图标*/
  .ukey {
    position: relative;
    animation: ukeyToShow 4s forwards;
    -webkit-animation: ukeyToShow 4s forwards;
  }
  .ukeyLogin {
    position: absolute;
    height: 125px;
    width: 125px;
    top: 140px;
    left: 137px;
    border-radius: 100%;
    border: 1px solid #24a4ff;
    background-color: #09558f;
    text-align: center;
    cursor: pointer;
  }
  .icon_ukey {
    margin-top: 20px;
  }
  .ukey_text {
    color: #FFF;
    margin-top: 5px;
    font-size: 20px;
    line-height: 22px;
  }
</style>
