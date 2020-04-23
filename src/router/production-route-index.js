/**
 * 开发环境路由
 */

import { createRouter, createWebHashHistory } from 'vue-router';
import _ from 'lodash';
import { projectRoutes } from './modules/project';// 项目路由

const routes = _.cloneDeep(projectRoutes);
// 开发环境加入demo路由  order路由列表
routes.push({ path: '/', redirect: '/home' });// 开发环境"/"重定向到路由列表页
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export { router, routes };
