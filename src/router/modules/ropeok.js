/**
 * 罗普特公用页面
 * @type {{path: string, component: (function(): (Promise<*>|*)), title: string}[]}
 */
const ropeokRoutes = [
  { path: '/ropoek/login', component: () => import('../../public/login/rk-login.vue'), title: '登录页' }
]
export { ropeokRoutes }
