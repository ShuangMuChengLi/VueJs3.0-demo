/**
 * 开发环境路由
 */

import { createRouter, createWebHashHistory } from 'vue-router';
import _ from 'lodash';
import { projectRoutes } from './modules/project';// 项目路由
import { testRoutes } from './modules/test-routes';

let routes = _.cloneDeep(projectRoutes);
// 开发环境加入demo路由  order路由列表
routes.push({ path: '/', component: () => import('../views/order.vue') });
routes.push({ path: '/order', component: () => import('../views/order.vue') });// 路由列表
routes = _.concat(routes, testRoutes);
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export { router, routes };
