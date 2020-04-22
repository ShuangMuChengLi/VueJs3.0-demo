import { createApp } from 'vue';
import '../../public/css/base.less';
import App from '../../App.vue';
import store from '../../store';
export default function (options) {
  createApp(App).use(options.router).use(store).mount('#app');
}
