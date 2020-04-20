/**
 * demo示例的路由
 * @type {{path: string, component: (function(): *), children: [null,null,null,null]}}
 */
const demoRoutes = {
  path:'/demo',
  component:() => import('../../../demo/index-demo.vue'),
  children:[
    { path: 'auto-form-test', component: () => import('../../../demo/auto-form-test.vue'), title:'自定义表单弹窗'},
    { path: 'axios', component: () => import('../../../demo/axios.vue'), title:'本地json及服务器接口请求' },
    { path: 'selection-picture-test', component: () => import('../../../demo/selection-picture-test.vue'), title:'框选并截取图片' },
    { path: 'login-btn-test', component: () => import('../../../demo/login-btn-test.vue'), title:'登录按钮' },
    { path: 'v-click-outside-demo', component: () => import('../../../demo/v-click-outside-demo.vue'), title:'指令：v-click-Outside' },
    { path: 'v-clipboard-demo', component: () => import('../../../demo/v-clipboard-demo.vue'), title:'指令：v-clipboard' },
    { path: 'vue-scrollto-demo', component: () => import('../../../demo/vue-scrollto-demo.vue'), title:'指令：v-scroll-to' },
    { path: 'map-demo', component: () => import('../../../demo/map-demo.vue'), title:'原生地图API demo' },
    { path: 'map-load-demo', component: () => import('../../../demo/map-load-demo.vue'), title:'常用地图瓦片加载' },
    { path: 'dash-board-pie-demo', component: () => import('../../../demo/dash-board-pie-demo.vue'), title:'echar简约环形饼图仪表盘' },
    { path: 'v-removable-demo', component: () => import('../../../demo/v-removable-demo.vue'), title:'用于让html能够拖动的指令' },
    { path: 'worker-demo', component: () => import('../../../demo/worker-demo.vue'), title:'worker测试' },
    { path: 'draggable', component: () => import('../../../demo/draggable.vue'), title:'列表拖动改变排序'},
    { path: 'detail-view-dialog-demo', component: () => import('../../../demo/detail-view-dialog-demo.vue'), title:'查看大图弹窗'},
    { path: 'vue-scroll-index-demo', component: () => import('../../../demo/vue-scroll-index-demo.vue'), title:'指令：v-scroll-index'},
    { path: 'video-scroller-demo', component: () => import('../../../demo/video-scroller-demo.vue'), title:'时间段选择滑块组件'},
    { path: 'view-pic-dialog-demo', component: () => import('../../../demo/view-pic-dialog-demo.vue'), title:'放大镜大图弹窗demo'},
    { path: 'pic-adaption-demo', component: () => import('../../../demo/pic-adaption-demo.vue'), title:'图片自适应'},
    { path: 'capture-dialog-demo', component: () => import('../../../demo/capture-dialog-demo.vue'), title: '抓拍弹窗封装'},
    { path: 'capture-pic-demo', component: () => import('../../../demo/capture-pic-demo.vue'), title: '实时抓拍'},
  ]
};
export { demoRoutes };
