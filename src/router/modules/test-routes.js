/**
 * 项目路由
 * @type {[null]}
 */
const testRoutes = [
  { path: '/vuex-test', component: () => import('../../components/test/vuex-test.vue') },
  { path: '/vue-test', component: () => import('../../components/test/vue-test.vue') },
  { path: '/es6-test', component: () => import('../../components/test/es6-test.vue') },
  { path: '/timeline', component: () => import('../../public/time-line/time-line-test.vue') },
];
export { testRoutes };
