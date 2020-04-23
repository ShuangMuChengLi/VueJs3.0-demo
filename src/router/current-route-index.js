/**
 * 当前开发的路由
 */
import _ from 'lodash';
import { createRouter, createWebHashHistory } from 'vue-router';
import { projectRoutes } from './modules/current';// 项目路由
import { testRoutes } from './modules/test-routes';

let routes = _.cloneDeep(projectRoutes);
// 开发环境加入demo路由  order路由列表
routes.push({ path: '/', component: () => import('../views/current-order.vue') });// 开发环境"/"重定向到路由列表页
routes.push({ path: '/order', component: () => import('../views/current-order.vue') });// 路由列表
routes = _.concat(routes, testRoutes);
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export { router, routes };
