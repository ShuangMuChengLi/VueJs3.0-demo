<template>
  <div class="wrap">
    <div class="left">
      <ul>
        <li
          v-for="subItem in demoRoutes"
          :key="subItem.path"
        >
          <router-link
            :to="'/demo/' + subItem.path"
          >
            {{ subItem.title }}
          </router-link>
        </li>
      </ul>
      <div>
        <el-button
          type="success"
          @click="gotoProject"
        >
          返回路由列表
        </el-button>
      </div>
    </div>
    <div class="right">
      <div class="view-wrap">
        <router-view
          @setCode="setCode"
          @setInfo="setInfo"
        />
      </div>
      <div class="info-wrapper">
        <div
          class="info"
          v-html="info"
        />

        <div class="code-wrap">
          <pre v-text="code" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {demoRoutes} from '../src/router/modules/demo';
export default {
  components:{
  },
  data() {
    return {
      code:'',
      info:'',
      demoRoutes:demoRoutes.children
    };
  },
  computed: {},
  watch: {},
  created: function () {

  },
  mounted: function () {
  },
  methods: {
    gotoProject(){
      window.location.href = '/';
    },
    setCode(url){
      axios.get(url).then((res)=>{
        this.code = res.data;
      });
    },
    setInfo(info){
      this.info = info;
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../src/css/demo/index-demo";
</style>
