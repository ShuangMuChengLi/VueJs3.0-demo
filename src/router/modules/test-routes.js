/**
 * 测试路由
 * @type {[null]}
 */
const testRoutes = [
  { path: '/vue-test', component: () => import('../../views/test/vue-test.vue') },
  { path: '/es6-test', component: () => import('../../views/test/es6-test.vue') },
  { path: '/axios-test', component: () => import('../../views/test/axios.vue') }
];
export { testRoutes };
