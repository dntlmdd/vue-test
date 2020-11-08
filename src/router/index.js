import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/Users.vue'),
  },
  {
    path: '/users/:userId/',
    meta: {
      layout: 'with-header',
    },
    component: () => import('@/views/Todos.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
