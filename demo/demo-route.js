/**
 * 主路由
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import {demoRoutes} from '../src/router/modules/demo';// demo路由
import { ropeokRoutes} from '../src/router/modules/ropeok';

let routes = [];
// 开发环境加入demo路由  order路由列表
routes.push({ path: '/', redirect: '/order' });// 开发环境"/"重定向到路由列表页
routes.push({ path: '/order', component: () => import('./demo-order.vue') });// 路由列表
routes.push(demoRoutes);
routes = routes.concat(ropeokRoutes);
const router = new VueRouter({
  routes
});

Vue.use(VueRouter);
export { router, routes };
