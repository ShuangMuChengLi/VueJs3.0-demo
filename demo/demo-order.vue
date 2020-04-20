<template>
  <div>
    <h1>测试路由列表</h1>
    <ul>
      <li
        v-for="(item , index) in routeList"
        :key="'testRoutes' + index"
      >
        <router-link
          v-if="!item.children"
          :to="item.path"
        >
          {{ item.path }}
        </router-link>
        <div v-if="item.children">
          <ul>
            <li
              v-for="subItem in item.children"
              :key="'testRoutes' + subItem.path"
            >
              <router-link
                :to="item.path + '/' + subItem.path"
              >
                {{ item.path + '/' + subItem.path }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div>
      <el-button
        type="success"
        @click="gotoDemo"
      >
        查看示例及公用组件
      </el-button>
    </div>
  </div>
</template>

<script>
import { ropeokRoutes } from '../src/router/modules/ropeok';
import _ from 'lodash';
export default {
  data() {
    return {
      routeList:ropeokRoutes
    };
  },
  created() {

  },
  mounted() {
    this.init();
  },
  methods: {
    init() {

    },
    gotoDemo(){
      this.$router.push('/demo');
    }
  }
};
</script>

<style scoped lang="less">
  @import "../src/css/index.less";
</style>
