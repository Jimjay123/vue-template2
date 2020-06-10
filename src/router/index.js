import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let routes = [];

const requireRouter = require.context('./', true, /\.js$/);
requireRouter.keys().forEach(fileName => {
  if (fileName === './index.js') return;
  const routerModule = requireRouter(fileName);
  routes = [...routes, ...(routerModule.default || routerModule)];
});

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
