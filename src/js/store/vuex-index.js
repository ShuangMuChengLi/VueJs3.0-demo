import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import subStore from './modules/sub-store';//(demo  可删除）
Vue.use(Vuex);
export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count:0 //(demo  可删除）
  },
  mutations,
  actions,
  modules:{
    subStore //(demo  可删除）
  }
});
