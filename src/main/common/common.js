import '../../public/css/base.less';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import Vue from 'vue';
// import {util} from '../../js/tools/util';
// import { polyfill } from 'es6-promise' // 是否开启ie支持模式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {store} from '../../js/store/vuex-index';// vuex配置
import App from '../../components/App';
// https://github.com/ndelvalle/v-click-outside
// 点击区域外触发事件的指令 v-click-outside(npm包：v-click-outside）
// Vue directive to react on clicks outside an element without stopping the event propagation.
// Great for closing dialogues, menus among other things.
// import VClickOutside from 'v-click-outside';

// https://github.com/euvl/v-clipboard
// 剪切板操作的指令 v-clipboard(npm包：v-clipboard）
// import Clipboard from 'v-clipboard';

// https://github.com/rigor789/vue-scrollTo
// 滚动到指定位置的指令 v-scroll-to(npm包：vue-scrollto）
// import VueScrollTo from 'vue-scrollto';

// https://github.com/ShuangMuChengLi/vue-removable
// 用于让html能够拖动的指令，主要用于弹窗的可拖动 v-removable(npm包：vue-removable）
// import VueRemovable from 'vue-removable';

// https://github.com/ShuangMuChengLi/vue-scroll-index
// 获取列表滚动到第几项的回调指令v-scroll-index(npm包：vue-scroll-index)
// import VueScrollIndex from 'vue-scroll-index';

/**
 *
 * @param options
 * {
 *   router:vue router
 * }
 */
export default function(options){
  Vue.use(ElementUI);
  // Vue.use(VClickOutside);
  // Vue.use(Clipboard);
  // Vue.use(VueScrollTo);
  // Vue.use(VueRemovable);
  // Vue.use(VueScrollIndex);
  // polyfill();
  new Vue({
    store,
    router: options.router,
    created(){
      // util.use(this);// 使得util工具包可以使用vue实例挂载的方法，包括element-ui
    },
    render: h => h(App)
  }).$mount('#app');
}
