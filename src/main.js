// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './common/stylus/index.styl';

Vue.config.productionTip = false;

/* eslint-disable no-new */

/* eslint-disable no-unused-vars */

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes: [
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ],
  linkActiveClass: 'active'
});

// 新建Vue实例，将路由router挂载到#app中
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

// 跳转到指定的页面
router.push('/goods');
